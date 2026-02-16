import "./globals.css";

export const metadata = {
  title: "Planner-IQ | Workflow Manager",
  description: "Standardized, color-coded project tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
