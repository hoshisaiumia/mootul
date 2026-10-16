import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
} from "@/components/ui/popover";
import React from "react";
import { FaUserGear } from "react-icons/fa6";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

type ButtonAction = {
  label: string;
  execute: () => void;
};

export function UserEditorPopover({ children }: { children: React.ReactNode }) {
  const actions: ButtonAction[] = [
    {
      label: "Editar usuário",
      execute: () => {
        redirect("/chat");
      },
    },
  ];
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer w-full">
        {children}
      </PopoverTrigger>
      <PopoverContent className="bg-zinc-950 border border-zinc-900 text-white">
        {actions.map((button) => (
          <Button
            variant="ghost"
            className="justify-start cursor-pointer"
            onClick={() => button.execute()}
          >
            {button.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
