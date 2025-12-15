import clsx from "clsx";
import { ComponentProps } from "react";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className)} {...props}>
      <span>Sparrow Partners</span>
    </div>
  );
}
