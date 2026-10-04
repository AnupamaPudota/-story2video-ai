"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      setStatus("Please enter your story first.");
      return;
    }

    setStatus("Creating your video...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      setStatus(data.message || "Your video is being prepared.");
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 18px",
        background: "#f7f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "8px" }}>
          🎬 Story2Video AI
        </h1>

        <p style={{ color: "#666", marginBottom: "24px" }}>
          Turn your story idea into an AI video.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your story here...

Example:
A little rabbit learns why sharing with friends makes everyone happy."
          style={{
            width: "100%",
            minHeight: "220px",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid #ddd",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={generateVideo}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "17px",
            border: "none",
            borderRadius: "16px",
            background: "#111",
            color: "white",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          ✨ Generate Video
        </button>

        {status && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "white",
              borderRadius: "14px",
              color: "#333",
            }}
          >
            {status}
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            background: "white",
            borderRadius: "16px",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>🎥 Video Preview</h2>
          <p style={{ color: "#777" }}>
            Your generated video will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}
