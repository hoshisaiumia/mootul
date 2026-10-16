"use client";

import { Card, CardContent, CardTitle } from "./ui/card";
import { UserAvatar } from "./user-avatar";
import { UserEditorPopover } from "./user-editor";
import { CurrentUser, useUser } from "./user-provider";

export default function UserResume() {
  const user: CurrentUser = useUser();

  return (
    <div className="w-full">
      <UserEditorPopover>
        <Card className="flex bg-zinc-950 border border-zinc-900 text-white w-full flex-row">
          <CardContent className="flex gap-3 items-center">
            <UserAvatar user={user} />
            <div className="flex flex-col items-start">
              <CardTitle className="">{user.username}</CardTitle>
              <CardTitle className="text-xs text-zinc-600">
                Created at {user.createdAt.toLocaleDateString("pt-br")}
              </CardTitle>
            </div>
          </CardContent>
        </Card>
      </UserEditorPopover>
    </div>
  );
}
