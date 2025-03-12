"use client";
import { MouseEventHandler } from "react";
import close_icon from "@/../public/close-outline.svg";
import Image from "next/image";

export default function QueryItem({
  className,
  query,
  regularity,
  onDelete,
}: {
  className?: string;
  query: string;
  regularity: number;
  onDelete?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div className="flex w-full items-center h-fit border-2 border-onBackground rounded-2xl px-5 py-5 gap-5">
      <h3 className="grow text-2xl">{query}</h3>
      <h3 className="text-2xl">{regularity}%</h3>
      <Image
        className="invert"
        width={30}
        alt="close icon"
        src={close_icon}
        onClick={onDelete}
      />
    </div>
  );
}
