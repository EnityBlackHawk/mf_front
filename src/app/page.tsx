"use client";

import Loading from "@/components/Loading";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { TryConnectRdb } from "@/services/MfApiServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorCard from "@/components/ErrorCard";
import { useTransitionRouter } from "next-view-transitions";
import pageAnimation from "@/services/NavAnimationDef";
import { useGlobalState } from "@/components/GlobalState";

const initialState = {
  message: "",
};

async function send(prevState: { message: boolean }, formData: FormData) {
  const result = await TryConnectRdb({
    host: formData.get("url") as string,
    user: formData.get("username") as string,
    password: formData.get("password") as string,
    sgbd: "",
  });
  return { message: result.data };
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary flex" disabled={pending}>
      {pending ? <Loading className="w-6 h-6" /> : "Conectar"}
    </button>
  );
}

export default function Home() {
  const router = useTransitionRouter();

  const navAfterSend = async (
    prevState: { message: boolean },
    formData: FormData
  ) => {
    const res = await send(prevState, formData);
    if (res.message) {
      router.push("/queries", {
        onTransitionReady: pageAnimation,
      });
    } else {
      setHasError(true);
      return res;
    }

    setRdb({
      host: formData.get("url") as string,
      user: formData.get("username") as string,
      password: formData.get("password") as string,
      sgbd: "",
    });

    return res;
  };

  const [state, formAction] = useFormState(navAfterSend, initialState);
  const [hasError, setHasError] = useState(false);
  const { rdb, setRdb } = useGlobalState();

  return (
    <form action={formAction} className="grid col-1 container gap-10">
      <h1 className="font-bold text-4xl">Credenciais de acesso:</h1>

      <div className="grid col-1 w-1/3 gap-5">
        <div className="grid col-1 gap-2 w-full">
          <label>Database URL</label>
          <input name="url" />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>Username</label>
          <input name="username" />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>SGBD</label>
          <select className="p-2 border-2 border-onBackground rounded focus:border-ascent outline-none transition-colors">
            <option value="Postgres">Postgres</option>
          </select>
        </div>
        <Submit />
        {hasError && (
          <ErrorCard message="Erro ao conectar com o banco de dados!" />
        )}
      </div>
      <div></div>
    </form>
  );
}
