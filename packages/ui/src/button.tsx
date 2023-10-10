import React, { ComponentProps } from "react";
import clsx from "clsx";

type buttonProps = ComponentProps<"button">;

export interface Props extends buttonProps {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx("ui-px-4 ui-py-2 ui-rounded-md ui-text-white", {
        "ui-bg-[#2196f3] ": variant === "primary",
        "ui-bg-[#607d8b]": variant === "secondary",
      })}
    >
      Button
    </button>
  );
}
