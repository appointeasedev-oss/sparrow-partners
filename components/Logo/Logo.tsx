import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <img src="/logo.png" alt="Sparrow Partners" height={24} />
    </div>
  );
}
