export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email") as string;

  if (!email) {
    return new Response(JSON.stringify({ message: "Fill out all fields." }), {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const sendResend = await resend.contacts.create({
      email,
      audienceId: import.meta.env.RESEND_GENERAL_AUDIENCE,
    });

    if (sendResend.data) {
      return new Response(
        JSON.stringify({ message: "Message successfully sent!" }),
        { status: 200, statusText: "OK" }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Message failed to send: ${sendResend.error}`,
      }),
      { status: 500, statusText: "Internal Server Error" }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error connecting to the server." }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
