import { logout } from "./actions";

export function LogoutButton() {
  return (
    <form action={logout} className="bg-red-500 p-4 m-5">
      <button type="submit">Sair</button>
    </form>
  );
}
