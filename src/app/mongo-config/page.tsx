"use client";
import Submit from "@/components/Submit";
import { useActionState, useEffect, useState } from "react";
import { sendGetCollections } from "./service";
import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import ErrorCard from "@/components/ErrorCard";
import { useGlobalState } from "@/components/GlobalState";
import { useTransitionRouter } from "next-view-transitions";
import pageAnimation from "@/services/NavAnimationDef";

type State = {
  isError: boolean;
  error: string;
  isValid: boolean;
  collections: string[];
};

const initialState: State = {
  error: "",
  isError: false,
  isValid: false,
  collections: [],
};

export default function MongoConfig() {
  const { mongoCred, setMongoCred } = useGlobalState();
  const router = useTransitionRouter();

  async function makeAction(state: State, formData: FormData): Promise<State> {
    if (formData.get("disconnect")) {
      return initialState;
    }

    if (state.isValid) {
      router.push("/migration", {
        onTransitionReady: pageAnimation,
      });
      return initialState;
    }

    const cred = {
      host: formData.get("host") as string,
      port: parseInt(formData.get("port") as string),
      username:
        (formData.get("username") as string).length > 0
          ? (formData.get("username") as string)
          : undefined,
      password:
        (formData.get("password") as string).length > 0
          ? (formData.get("password") as string)
          : undefined,
      database: formData.get("database") as string,
    };

    const resp = await sendGetCollections(cred);

    if (resp.status !== 200) {
      return {
        error: resp.message!!,
        isValid: false,
        collections: [],
        isError: true,
      };
    }

    setMongoCred(cred);

    return {
      error: "",
      isValid: true,
      collections: resp.data!!,
      isError: false,
    };
  }

  const [existent, setExistent] = useState(false);
  const [state, formAction] = useActionState(makeAction, initialState);

  // State for input values
  const [host, setHost] = useState(mongoCred.host);
  const [port, setPort] = useState(mongoCred.port.toString());
  const [username, setUsername] = useState(mongoCred.username);
  const [password, setPassword] = useState(mongoCred.password);
  const [database, setDatabase] = useState(mongoCred.database);

  return (
    <form
      action={formAction}
      className="flex flex-col col-1 container gap-7 h-full py-10"
    >
      <h1 className="font-bold text-4xl">Qual o destino dos seus dados ?</h1>

      <div className="grid col-1 w-1/3 gap-5">
        <div className="flex w-full gap-3">
          <div className="grid col-1 gap-2 grow">
            <label>MongoDB Host</label>
            <input
              name="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              disabled={state.isValid}
            />
          </div>
          <div className="grid col-1 gap-2">
            <label>Port</label>
            <input
              name="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              disabled={state.isValid}
            />
          </div>
        </div>

        <div className="grid col-1 gap-2 w-full">
          <label>Username</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={state.isValid}
          />
        </div>
        <div className="grid col-1 gap-2 w-full">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={state.isValid}
          />
        </div>

        <div className="grid col-1 gap-2 w-full">
          <label>Database</label>
          <input
            name="database"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            disabled={state.isValid}
          />
        </div>
      </div>

      <div className="grow"></div>
      <AnimatePresence>
        {(state.isValid || state.isError) && (
          <motion.div
            className="w-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorCard
              message={state.isError ? state.error : "Conectado com sucesso!"}
              isError={state.isError}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <Submit
          className="w-fit"
          message={state.isValid ? "Migrar!" : "Conectar"}
        />

        <AnimatePresence>
          {state.isValid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                className="btn-secondary"
                text="Desconectar"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("disconnect", "ok");
                  formAction(formData);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
