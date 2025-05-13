import Link from "next/link";

export default function CodeGenerated() {
  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Código gerado:</h1>

      <textarea className="main-input grow" />

      <Link
        href={"/mongo-config"}
        className="btn-primary w-1/12 flex content-center justify-center"
      >
        <p>Migrar!</p>
      </Link>
    </div>
  );
}
