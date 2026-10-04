import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  if (!prompt || !prompt.trim()) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  /*
    This starter is intentionally provider-neutral.
    To make real AI videos, connect a video-generation provider here
    and store its API key in Vercel Environment Variables.

    Example environment variable:
      VIDEO_API_KEY=your_key_here

    Never put an API key directly in this file or in the browser.
  */

  if (!process.env.VIDEO_API_KEY) {
    return NextResponse.json({
      message:
        "The app is working, but a video-generation API key has not been connected yet. Add VIDEO_API_KEY in Vercel Environment Variables and connect your chosen video provider in this route.",
      receivedPrompt: prompt
    });
  }

  return NextResponse.json({
    message: "API key detected. Connect your provider's video-generation request in app/api/generate/route.js.",
    receivedPrompt: prompt
  });
}