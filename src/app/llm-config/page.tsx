import Link from "next/link";

export default function ModelCustomization() {
  return (
    <div className="flex flex-col col-1 container gap-7 w-full h-full py-10">
      <h1 className="font-bold text-4xl">Quais suas configurações de LLM ?</h1>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Qual LLM você utiliza ?</h2>
        <select defaultValue={"GPT"}>
          <option>GPT</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Selecione o modelo:</h2>
        <select defaultValue={"gpt-4o"}>
          <option>gpt-4o</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Qual a key da LLM ?</h2>
        <input type="password" />
      </div>

      <Link href={"#"} className="btn-primary w-1/12">
        Continuar
      </Link>
    </div>
  );
}
