// app/(auth)/register/register-form.tsx
"use client";

import { useActionState, useState } from "react";
import { register } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { MdPerson, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggle = (
    <InputGroupAddon
      align="inline-end"
      onClick={() => setPasswordVisible((v) => !v)}
      className="cursor-pointer"
    >
      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
    </InputGroupAddon>
  );

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-sm bg-zinc-950 border border-zinc-900">
        <CardContent>
          <CardTitle className="text-white">Create your account</CardTitle>
          <CardDescription>Fill in the fields below to sign up</CardDescription>
        </CardContent>

        <CardContent>
          <form action={action} className="text-white flex flex-col gap-3">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  name="username"
                  defaultValue={state?.values?.username}
                  autoComplete="username"
                  required
                  className="rounded-lg"
                />
                <InputGroupAddon align="inline-end">
                  <MdPerson />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state?.values?.email}
                  autoComplete="email"
                  required
                  className="rounded-lg"
                />
                <InputGroupAddon align="inline-end">
                  <MdEmail />
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
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="rounded-lg"
                />
                {toggle}
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="rounded-lg"
                />
                {toggle}
              </InputGroup>
            </Field>

            {state?.error && <p className="text-red-500">{state.error}</p>}

            <Button
              className="w-full p-5 cursor-pointer"
              type="submit"
              disabled={pending}
            >
              {pending ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
