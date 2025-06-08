import { useFormStatus } from "react-dom";
import Loading from "../Loading";
import { motion } from "framer-motion";

export default function Submit({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={"btn-primary flex " + className}
      disabled={pending}
    >
      {pending ? (
        <Loading className="w-6 h-6" />
      ) : (
        <motion.span
          key={message}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {message ?? "Continuar"}
        </motion.span>
      )}
    </button>
  );
}
