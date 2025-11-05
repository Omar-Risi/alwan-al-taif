import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/NavigationBar";

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

        <NavigationBar />
        <main className="px-8 py-4 lg:px-24 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
