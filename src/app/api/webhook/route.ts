import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser } from "@/src/lib/actions/user.actions";

export async function POST(request: Request) {
  const svix_id = request.headers.get("svix-id") ?? "";
  const svix_timestamp = request.headers.get("svix-timestamp") ?? "";
  const svix_signature = request.headers.get("svix-signature") ?? "";

  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("Webhook secret is not set");
  }

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let message: WebhookEvent;

  try {
    message = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const eventType = message.type;

  if (eventType === "user.created") {
    // created user to database
    const { email_addresses, id, image_url, username } = message.data;
    const user = await createUser({
      clerkId: id,
      username: username!, // dấu "!" này là chắc chắn có username
      name: username!,
      email: email_addresses[0].email_address,
      avatar: image_url,
    });

    return NextResponse.json({
      message: "OK",
      user,
    });
  }
  // Rest

  return new Response("OK", { status: 200 });
}
