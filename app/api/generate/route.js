export async function POST(request) {
  try {
    const { story } = await request.json();

    if (!story) {
      return Response.json(
        { error: "Please enter a story." },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Story received successfully!",
      story: story,
    });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
