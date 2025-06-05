import { motion } from "framer-motion";

export default function ErrorCard({ message }: { message: string }) {
  return (
    <motion.div
      className="bg-error rounded w-full flex justify-between gap-10 py-5 px-10 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1></h1>
      <h2>{message}</h2>
    </motion.div>
  );
}
