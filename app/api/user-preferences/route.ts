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
      data: {},
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
