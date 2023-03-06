import "./globals.css";
import { Montserrat, Parisienne } from "@next/font/google";
import Providers from "./providers";

const parisienne = Parisienne({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-parisienne",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${parisienne.variable} ${montserrat.className} font-normal flex flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
