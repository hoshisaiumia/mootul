import { getCurrentUser } from "@/lib/user";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="flex w-full h-full items-center justify-center">
      <main className="text-white text-4xl font-bold">
        <h1>
          Hello, <span className="text-emerald-500">{user?.username}</span>!
        </h1>
      </main>
    </div>
  );
}
