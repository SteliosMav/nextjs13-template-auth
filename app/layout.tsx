import "./globals.css";
import { Montserrat, Parisienne } from "@next/font/google";
import Header from "./header";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const parisienne = Parisienne({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-parisienne",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${montserrat.className} ${parisienne.variable} flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
