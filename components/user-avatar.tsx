import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/initials";
import type { CurrentUser } from "./user-provider";

export function UserAvatar({
  user,
  className,
}: {
  user: Pick<CurrentUser, "username" | "avatarUrl">;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      {user.avatarUrl && (
        <AvatarImage src={user.avatarUrl} alt={user.username}></AvatarImage>
      )}
      <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
    </Avatar>
  );
}
