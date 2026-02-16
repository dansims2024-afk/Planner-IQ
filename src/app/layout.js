import "./globals.css";

export const metadata = {
  title: "Planner-IQ",
  description: "The intelligent workflow manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
