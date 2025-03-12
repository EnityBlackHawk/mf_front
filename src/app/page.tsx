import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid col-1 container gap-10">
      <h1 className="font-bold text-4xl">Credenciais de acesso:</h1>

      <div className="grid col-1 w-1/3 gap-5">
        <div className="grid col-1 gap-2 w-full">
          <label>Database URL</label>
          <input />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>Username</label>
          <input />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>SGBD</label>
          <select className="p-2 border-2 border-onBackground rounded focus:border-ascent outline-none transition-colors">
            <option>Postgres</option>
          </select>
        </div>
        <Link href={"/queries"} className="btn-primary">
          Conectar
        </Link>
      </div>
      <div></div>
    </div>
  );
}
