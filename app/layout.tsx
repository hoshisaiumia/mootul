import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { UserProvider } from "@/components/user-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mootul",
  description:
    "A simple and private messaging app. Not build by a huge company that steals your data.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-dvh flex flex-col bg-zinc-950">
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
