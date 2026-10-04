"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      setStatus("Please enter a story or video prompt.");
      return;
    }
    setStatus("Preparing your video request...");
    setVideoUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setStatus("Video ready!");
      } else {
        setStatus(data.message || "Your request was accepted. Connect a video-generation provider to create the video.");
      }
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", padding: "30px 16px" }}>
      <div style={{ width: "100%", maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginTop: 35 }}>
          <div style={{ fontSize: 48 }}>🎬</div>
          <h1 style={{ fontSize: 42, margin: "10px 0" }}>Story2Video AI</h1>
          <p style={{ color: "#aaa", fontSize: 17 }}>
            Enter a prompt and turn your idea into a video.
          </p>
        </div>

        <section style={{ marginTop: 35, background: "#111", border: "1px solid #2b2b2b", borderRadius: 22, padding: 20 }}>
          <label style={{ display: "block", marginBottom: 10, fontWeight: 700 }}>Your prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A cute cartoon rabbit helps a lost little fox find its family in a magical forest. Bright 3D animation, warm colors, cinematic camera movement."
            rows={8}
            style={{
              width: "100%", boxSizing: "border-box", resize: "vertical",
              background: "#080808", color: "#fff", border: "1px solid #333",
              borderRadius: 15, padding: 16, fontSize: 16, outline: "none"
            }}
          />
          <button
            onClick={generateVideo}
            style={{
              width: "100%", marginTop: 15, padding: 17, border: 0,
              borderRadius: 15, background: "#fff", color: "#000",
              fontSize: 17, fontWeight: 700
            }}
          >
            ✨ Generate Video
          </button>

          {status && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 12, background: "#1a1a1a", color: "#ddd" }}>
              {status}
            </div>
          )}

          {videoUrl && (
            <video
              src={videoUrl}
              controls
              playsInline
              style={{ width: "100%", marginTop: 20, borderRadius: 15 }}
            />
          )}
        </section>

        <p style={{ textAlign: "center", color: "#777", fontSize: 13, marginTop: 22 }}>
          Mobile-friendly • Works in Safari and Chrome
        </p>
      </div>
    </main>
  );
}
