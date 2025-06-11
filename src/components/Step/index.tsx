import Loading from "../Loading";
import { animate, motion } from "framer-motion";

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
      {state === "completed" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-xl text-ascent"
        >
          
        </motion.p>
      )}
      <h2>{text}</h2>
    </div>
  );
}
