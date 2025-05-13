import Loading from "@/components/Loading";

export default function Migration() {
  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Estamos migrando seus dados:</h1>

      <div className="flex align-middle gap-4">
        <input className="drop-shadow-glow" type="checkbox" checked disabled />
        <h2>Compilando classes</h2>
      </div>

      <div className="flex align-middle gap-4">
        <Loading className="w-6 h-6" />
        <h2>Compilando classes</h2>
      </div>

      <div className="flex align-middle gap-4">
        <Loading className="w-6 h-6" waiting />
        <h2>Verificando</h2>
      </div>
    </div>
  );
}
