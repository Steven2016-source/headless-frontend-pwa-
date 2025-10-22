import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a productivity assistant." },
        {
          role: "user",
          content: `Generate 3 short to-do tasks based on this: ${prompt}`,
        },
      ],
    });

    const tasksText = completion.choices[0].message?.content || "";
    const tasks = tasksText.split(/\n+/).filter(Boolean);

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json({ tasks: ["Error generating tasks."] });
  }
}
