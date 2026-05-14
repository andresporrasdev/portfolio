import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant on Andres Porras's portfolio website. You help visitors learn about Andres.

Key facts about Andres:
- Full Stack Developer based in Ontario, Canada
- 6+ years of experience in web development
- Skills: React, Next.js, TypeScript, Node.js, Express, Java, Python, Django, MongoDB, MySQL, WordPress
- Design skills: Figma, Illustrator, Photoshop
- Education: Algonquin College (Computer Programming, Honours, Dean's Honours List Fall 2023, 3.66 GPA)
- Previously: IT Senior Tech & Web Developer at Cervantes School (Colombia, 2013-2019)
- Freelance developer (2019-2022): tuwatch.co (60K CAD yearly sales), seguridadlaboralnasbec.com, acrilicol.com, ybpublicidad.com
- Digital advertising: Facebook Ads, Google Ads, TikTok Ads (125K+ views)
- Projects: Charity Portal (MERN stack), Traffic Volumes (Django), Landseed.ca (volunteer)
- Trilingual: English, French, Spanish
- Currently open to full-time software developer positions
- Email: andresporrasdev@gmail.com
- GitHub: github.com/andresporrasdev (26+ repos, codes daily)

Rules:
- Only answer questions about Andres, his skills, experience, and projects
- Keep responses concise (2-4 sentences max)
- Be professional and enthusiastic about Andres's abilities
- If asked something unrelated to Andres, politely redirect to his profile
- Never make up information not listed above`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI not configured" },
        { status: 503 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        max_tokens: 150,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`OpenRouter ${res.status}: ${errorBody}`);
    }

    const data = await res.json();
    const response =
      data.choices?.[0]?.message?.content || "Sorry, I couldn't process that request.";

    return NextResponse.json({ response });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { response: `DEBUG: ${message}` },
      { status: 200 }
    );
  }
}
