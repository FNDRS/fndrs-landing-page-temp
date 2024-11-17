import * as process from "node:process";

export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(process.env['RESEND_API_KEY']);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email") as string;

  if (!email) {
    return new Response(JSON.stringify({ message: "Fill out all fields." }), {
      status: 400,
      statusText: "Bad Request",
    });
  }

  if (!process.env['RESEND_GENERAL_AUDIENCE']) {
    throw new Error("RESEND_GENERAL_AUDIENCE is not set.");
  }

  try {
    const sendResend = await resend.contacts.create({
      email,
      audienceId: process.env['RESEND_GENERAL_AUDIENCE'].toString(),
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
