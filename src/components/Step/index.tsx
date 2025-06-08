import Loading from "../Loading";

export default function Step({
  text,
  state,
}: {
  text: string;
  state: "waiting" | "completed" | "running";
}) {
  return (
    <div className="flex align-middle gap-4">
      {state !== "completed" && (
        <Loading className="w-6 h-6" waiting={state === "waiting"} />
      )}
      {state === "completed" && <p className="text-xl text-ascent"></p>}
      <h2>{text}</h2>
    </div>
  );
}
