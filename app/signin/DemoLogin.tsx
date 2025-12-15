"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/primitives/Button";
import { Input } from "@/primitives/Input";
import styles from "./signin.module.css";
import { FormEvent, useState } from "react";

export function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", { email, password });
  };

  return (
    <form className={styles.actions} onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
