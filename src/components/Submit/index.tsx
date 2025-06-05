import { useFormStatus } from "react-dom";
import Loading from "../Loading";

export default function Submit({ className }: { className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={"btn-primary flex " + className}
      disabled={pending}
    >
      {pending ? <Loading className="w-6 h-6" /> : "Continuar"}
    </button>
  );
}
