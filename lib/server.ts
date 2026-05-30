import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // Get the cookie store for the current request

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { 
        getAll() { // Retrieve all cookies from the cookie store
          return cookieStore.getAll(); 
        },
        setAll(cookiesToSet) { 
          try {
            cookiesToSet.forEach(({ name, value, options }) => { // Set each cookie in the cookie store
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },
      },
    },
  );
}
