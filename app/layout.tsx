import "./globals.css";
import { Montserrat, Parisienne } from "@next/font/google";
import SessionProvider from "./session-provider";

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

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${montserrat.className} ${parisienne.variable} flex flex-col`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
