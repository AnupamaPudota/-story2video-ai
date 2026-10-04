export const metadata = {
  title: "Story2Video AI",
  description: "Turn a text prompt into an AI video.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#070707", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
