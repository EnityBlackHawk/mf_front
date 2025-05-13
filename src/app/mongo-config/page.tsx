"use client";
import Link from "next/link";
import { useState } from "react";

export default function MongoConfig() {
  const [existent, setExistent] = useState(false);

  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Qual o destino dos seus dados ?</h1>

      <div className="grid col-1 w-1/3 gap-5">
        <div className="grid col-1 gap-2 w-full">
          <label>MongoDB Host</label>
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

        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={existent}
            onChange={() => setExistent(!existent)}
          />
          <p>Utilizar uma coleção já existente</p>
        </div>

        <div
          className={`grid col-1 gap-2 w-full ${
            !existent ? "opacity-50" : ""
          } `}
        >
          <label>Coleção</label>
          <select
            className="p-2 border-2 border-onBackground rounded focus:border-ascent outline-none transition-colors"
            disabled={!existent}
          ></select>
        </div>
      </div>

      <div className="grow"></div>

      <Link href={"/migration"} className="btn-primary w-1/12">
        Conectar
      </Link>
    </div>
  );
}
