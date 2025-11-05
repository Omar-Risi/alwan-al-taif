import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ConditionalNav } from "@/components/ConditionalNav";
import { ConditionalMain } from "@/components/ConditionalMain";

export const metadata: Metadata = {
  title: "Rainbow School | مدرسة الوان الطيف",
  description: "مدرسة الوان الطيف الخاصة لتعليم الأطفال | المعبيلة الجنوبية",
};
const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.className} antialiased bg-background`}
      >
        <ConditionalNav />
        <ConditionalMain>
          {children}
        </ConditionalMain>
      </body>
    </html>
  );
}
