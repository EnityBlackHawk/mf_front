import Image from "next/image";
import Arrow from "@/../public/right-arrow-svgrepo-com.svg";

export default function RelationshipItem({
  table_a,
  table_b,
  relationship,
  min,
  max,
  avg,
}: {
  table_a: String;
  table_b: String;
  relationship: "Many-to-One" | "One-to-One";
  min: number;
  max: number;
  avg: number;
}) {
  return (
    <div className="flex flex-row items-center gap-10 w-full h-fit p-5 border-2 border-onBackground rounded-2xl">
      <h2>{table_a}</h2>
      <Image className="invert" width={20} alt="arrow" src={Arrow} />
      <h2>{table_b}</h2>
      <div className="flex flex-col">
        <p>Relacionamento:</p>
        <h3>{relationship}</h3>
      </div>
      <div className="flex flex-col">
        <p>Nº minimo:</p>
        <h3>{min}</h3>
      </div>
      <div className="flex flex-col">
        <p>Nº maximo</p>
        <h3>{max}</h3>
      </div>
      <div className="flex flex-col">
        <p>Média</p>
        <h3>{avg}</h3>
      </div>
    </div>
  );
}
