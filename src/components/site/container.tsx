import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: "prose" | "page" | "wide";
};

export function Container({ className, size = "page", ...props }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-8",
        size === "prose" && "max-w-3xl",
        size === "page" && "max-w-7xl",
        size === "wide" && "max-w-[88rem]",
        className,
      )}
      {...props}
    />
  );
}
