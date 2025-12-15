"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button } from "@/primitives/Button";
import { Input } from "@/primitives/Input";
import styles from "./signin.module.css";

export function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result && result.error) {
      setError("Invalid email or password");
    } else {
      // Redirect to dashboard on successful login
      window.location.href = "/dashboard";
    }
  };

  return (
    <form className={styles.actions} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
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
