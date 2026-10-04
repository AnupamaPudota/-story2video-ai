export const metadata = {
  title: "Story to Video AI",
  description: "Create cartoon videos from children's stories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
