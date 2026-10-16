"use client";

import { useUser } from "@/components/user-provider";
import UserResume from "@/components/user-resume";

export default function Home() {
  const user = useUser();
  return (
    <div className="flex w-full h-full">
      <main className="text-white text-4xl font-bold grid grid-cols-[8em_1fr] w-full">
        <div className="border-r border-zinc-900 p-2 max-w-[8em]">
          <UserResume />
        </div>

        <div className="flex w-full items-center justify-center">
          <p className="text-[4dvw]">Welcome, {user.username}!</p>
        </div>
      </main>
    </div>
  );
}
