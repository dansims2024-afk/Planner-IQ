import "./globals.css";

export const metadata = {
  title: "Planner-IQ | Workflow Manager",
  description: "Customizable project tracking and task management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
