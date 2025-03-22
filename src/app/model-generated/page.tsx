import Loading from "@/components/Loading";

export default function ModelGenerated() {
  return (
    <div className="flex flex-col items-center content-center gap-5 ">
      <Loading text="Gerando o modelo..." />
    </div>
  );
}
