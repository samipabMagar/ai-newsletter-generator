import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/server";
import { inngest } from "@/lib/inngest/client";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "you must be logged in to save preferences." },
      { status: 401 },
    );
  }

  const body = await request.json();
  const { frequency, categories, email } = body;

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return NextResponse.json(
      { error: "Please select at least one category." },
      { status: 400 },
    );
  }

  if (!frequency || !["daily", "weekly", "biweekly"].includes(frequency)) {
    return NextResponse.json(
      { error: "Please select a valid frequency." },
      { status: 400 },
    );
  }

  const { error: upserError } = await supabase.from("user_preferences").upsert(
    { user_id: user.id, categories, frequency, email, is_active: true },
    {
      onConflict: "user_id",
    },
  );

  if (upserError) {
    console.error("Error saving preferences:", upserError);
    return NextResponse.json(
      { error: "An error occurred while saving preferences." },
      { status: 500 },
    );
  }

  try {
    await inngest.send({
      name: "newsletter.schedule",
      data: {
        categories,
        email,
        frequency,
        user_id: user.id,
      },
    });
  } catch (inngestError) {
    // Log the error but don't fail the request — preferences were already saved.
    // This usually means the Inngest dev server is not running.
    console.error("[Inngest] Failed to send event:", inngestError);
  }
  return NextResponse.json({
    success: true,
    message: "Preferences saved successfully.",
  });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "you must be logged in to view preferences." },
      { status: 401 },
    );
  }

  try {
    const { data: preferences, error: fetchError } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (fetchError) {
      console.error("Error fetching preferences:", fetchError);
      return NextResponse.json(
        { error: "An error occurred while fetching preferences." },
        { status: 500 },
      );
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Unexpected error fetching preferences:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching preferences." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "you must be logged in to update preferences." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { is_active } = body;

    const { error: updateError } = await supabase
      .from("user_preferences")
      .update({ is_active })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Error updating preferences:", updateError);
      return NextResponse.json(
        { error: "An error occurred while updating preferences." },
        { status: 500 },
      );
    }

    if (!is_active) {
      await inngest.send({
        name: "newsletter.schedule.deleted",
        data: {
          user_id: user.id,
        },
      });
    } else {
      // If re-activating, we need to fetch the existing preferences to reschedule.
      const { data: existingPreferences, error: fetchError } = await supabase
        .from("user_preferences")
        .select("categories, frequency, email")
        .eq("user_id", user.id)
        .single();
      if (fetchError) {
        console.error(
          "Error fetching existing preferences for re-activation:",
          fetchError,
        );
        return NextResponse.json(
          { error: "An error occurred while re-activating preferences." },
          { status: 500 },
        );
      }

      const now = new Date();
      let nextScheduleTime: Date;

      switch (existingPreferences.frequency) {
        case "daily":
          nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "weekly":
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "biweekly":
          nextScheduleTime = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
          break;
        default:
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // default to weekly if somehow frequency is invalid
      }

      nextScheduleTime.setHours(9, 0, 0, 0); // Set to 9:00 AM hour, 0 minutes, 0 seconds, 0 milliseconds

      await inngest.send({
        name: "newsletter.schedule",
        data: {
          categories: existingPreferences.categories,
          email: existingPreferences.email,
          frequency: existingPreferences.frequency,
          user_id: user.id,
        },
        ts: nextScheduleTime.getTime(),
      });
    }

    return NextResponse.json({ success: true, is_active });
  } catch (error) {
    console.error("Unexpected error updating preferences:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while updating preferences." },
      { status: 500 },
    );
  }
}
