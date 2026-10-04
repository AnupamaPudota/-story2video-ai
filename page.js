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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story: prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setStatus("Story received successfully!");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          🎬 Story to Video AI
        </h1>

        <p style={{ color: "#666", marginBottom: "25px" }}>
          Turn your children's moral story into a cartoon video.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your story here..."
          rows={10}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={generateVideo}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            background: "#111827",
            color: "white",
          }}
        >
          🎥 Generate Cartoon Video
        </button>

        {status && (
          <p
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#f0f4ff",
              borderRadius: "10px",
            }}
          >
            {status}
          </p>
        )}

        {videoUrl && (
          <video
            controls
            src={videoUrl}
            style={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "12px",
            }}
          />
        )}
      </div>
    </main>
  );
}
