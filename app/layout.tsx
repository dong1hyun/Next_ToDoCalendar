import type { Metadata } from "next";
import { Inter, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ToDo Calendar",
    default: "ToDo Calendar"
  },
  description: "Generated by create next app",
};

const myeongjo = Nanum_Myeongjo({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--mj"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myeongjo.variable} font-mj`}>
        {children}
      </body>
    </html>
  );
}
