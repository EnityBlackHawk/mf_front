import { motion } from "framer-motion";

export default function ErrorCard({
  message,
  className,
  isError = true,
}: {
  message: string;
  className?: string;
  isError?: boolean;
}) {
  return (
    <motion.div
      className={
        "rounded w-full flex gap-10 py-5 px-10 items-center " +
        (isError
          ? "bg-error "
          : "bg-onBackground ") + className
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1></h1>
      <h2>{message}</h2>
    </motion.div>
  );
}
