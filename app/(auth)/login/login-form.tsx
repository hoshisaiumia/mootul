"use client";

import { useActionState, useState } from "react";
import { login } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { MdPerson } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="bg-zinc-950 border border-zinc-900">
        <CardContent>
          <CardTitle className="text-white">Welcome back!</CardTitle>
          <CardDescription>Insert your credentials to sign in</CardDescription>
        </CardContent>

        <CardContent className="flex flex-col gap-3">
          <form action={action} className="text-white flex flex-col gap-3">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  name="username"
                  className="rounded-lg"
                />
                <InputGroupAddon align="inline-end">
                  <MdPerson />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="rounded-lg"
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="cursor-pointer"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </InputGroupAddon>
              </InputGroup>
            </Field>

            {state?.error && <p className="text-red-500">{state.error}</p>}

            <Button
              className="w-full p-5 cursor-pointer"
              type="submit"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
