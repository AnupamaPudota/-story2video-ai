# Story2Video AI

A mobile-friendly Next.js starter for a prompt-to-video app.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Framework: Next.js.
3. Deploy.
4. Add your video-generation provider API key as a Vercel Environment Variable named `VIDEO_API_KEY`.
5. Connect the provider's generation endpoint inside `app/api/generate/route.js`.

The browser never receives the secret API key.

## Important

This starter provides the complete phone-friendly interface and secure server-side API route. A real video provider must be connected before it can render AI videos.
