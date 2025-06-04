import { MouseEventHandler } from "react";

export default function Button({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {text}
    </button>
  );
}
