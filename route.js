import RunwayML, { TaskFailedError } from "@runwayml/sdk";

const client = new RunwayML();

export async function POST(request) {
  try {
    const body = await request.json();

    const story = body.story || body.prompt || "";

    if (!story.trim()) {
      return Response.json(
        {
          error: "Please enter a story.",
          received: body,
        },
        { status: 400 }
      );
    }

    const prompt = `
Create a colorful 3D cartoon children's video scene based on this story:

${story}

Style: cute children's cartoon, colorful, friendly characters,
cinematic animation, bright lighting, family friendly.
`;

    const task = await client.imageToVideo
      .create({
        model: "gen4.5",
        promptText: prompt,
        ratio: "1280:720",
        duration: 5,
      })
      .waitForTaskOutput();

    return Response.json({
      success: true,
      videoUrl: task.output?.[0] || "",
    });
  } catch (error) {
    console.error("VIDEO GENERATION ERROR:", error);

    if (error instanceof TaskFailedError) {
      return Response.json(
        {
          error: "Runway video generation failed.",
          details: error.taskDetails,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        error: error.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}