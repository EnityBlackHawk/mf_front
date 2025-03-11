import Button from "@/components/Button";

export default function Queries() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] col-1 container gap-5 h-full py-10">
      <h1 className="font-bold text-4xl">
        Quais as consultas são as mais utilizadas ?
      </h1>

      <div className="flex items-end gap-4">
        <div className="grid grow">
          <label>Consulta (SQL):</label>
          <input />
        </div>
        <div className="grid">
          <label>Regularidade (%):</label>
          <input />
        </div>
        <Button className="h-11" text="Adicionar" />
      </div>
      <div className="border-2 border-onBackground rounded"></div>
    </div>
  );
}
