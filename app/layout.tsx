import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Nunito } from "next/font/google";
import "./globals.css";

const sans = Nunito({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });
const serif = Lora({ subsets: ["latin", "vietnamese"], variable: "--font-serif" });
const script = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], variable: "--font-script", style: ["normal", "italic"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Gửi Diễm — Từ Chiến, với tất cả yêu thương",
  description: "Một lời tỏ tình thật lòng Chiến dành riêng cho Diễm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body className={`${sans.className} ${sans.variable} ${serif.variable} ${script.variable}`}>{children}</body></html>;
}
