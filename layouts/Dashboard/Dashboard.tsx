"use client";

import clsx from "clsx";
import { ComponentProps, useCallback, useState } from "react";
import { DashboardHeader, DashboardSidebar } from "@/components/Dashboard";
import { Group, User } from "@/types";
import styles from "./Dashboard.module.css";

interface Props extends ComponentProps<"div"> {
  groups: Group[];
  currentUser: User;
}

export function DashboardLayout({
  children,
  groups,
  currentUser,
  className,
  ...props
}: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <div className={clsx(className, styles.container)} {...props}>
      <header className={styles.header}>
        <DashboardHeader isOpen={isMenuOpen} onMenuClick={handleMenuClick} />
      </header>
      <aside className={styles.aside} data-open={isMenuOpen || undefined}>
        <DashboardSidebar groups={groups} currentUser={currentUser} />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
