import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // In development, just log it
      console.log("Contact form submission:", { name, email, message });
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "andresporrasdev@gmail.com",
        subject: `Portfolio Contact: ${name}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
