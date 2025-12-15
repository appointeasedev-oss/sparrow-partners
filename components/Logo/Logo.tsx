import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <Image src="/logo.png" alt="Sparrow Partners" width={24} height={24} />
    </div>
  );
}
