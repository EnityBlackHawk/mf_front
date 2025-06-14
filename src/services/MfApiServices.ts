import axios from "axios";
import * as obj from "./MfApiObjects";
import {
  AsyncResponse,
  GeneratedJavaCode,
  MetadataInfo,
  ModelDto,
} from "./MfApiResponses";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export async function TryConnectRdb(rdbAccess: obj.RdbAccess) {
  return await axios.post(
    "http://localhost:8080/api/utils/tryConnectRdb",
    rdbAccess
  );
}

export async function Setup(setup: obj.Setup): AsyncResponse<MetadataInfo> {
  const rest = await axios.post("http://localhost:8080/api/setup", setup, {
    validateStatus: () => true,
  });

  if (rest.status == 200) {
    return { status: rest.status, data: rest.data as MetadataInfo };
  }

  return { status: rest.status, message: rest.data.message };
}

export async function GenerateModel(
  metadataInfo: MetadataInfo
): AsyncResponse<ModelDto> {
  const rest = await axios.post(
    "http://localhost:8080/api/generateModel",
    metadataInfo,
    { validateStatus: () => true }
  );

  if (rest.status == 200) {
    return { status: rest.status, data: rest.data as ModelDto };
  }

  return { status: rest.status, message: rest.data.message };
}

export async function GenerateJavaCode(
  modelDto: ModelDto
): AsyncResponse<GeneratedJavaCode> {
  const rest = await axios.post(
    "http://localhost:8080/api/generateCode",
    modelDto,
    { validateStatus: () => true }
  );

  if (rest.status == 200) {
    return { status: rest.status, data: rest.data as GeneratedJavaCode };
  }

  return { status: rest.status, message: rest.data.message };
}

export async function GetMongoCollections(
  cred: obj.MongoCredentials
): AsyncResponse<string[]> {
  const rest = await axios.post(
    "http://localhost:8080/api/utils/getMongoCollections",
    cred,
    { validateStatus: () => true }
  );

  if (rest.status == 200) {
    return { status: rest.status, data: rest.data as string[] };
  }

  return { status: rest.status, message: rest.data.message };
}

export async function Migrate(
  migrateDto: obj.MigrateDto,
  callback: (message: string) => void
) {
  const setup = await axios.post(
    "http://localhost:8080/api/migrate",
    migrateDto,
    { validateStatus: () => true }
  );

  if (setup.status !== 200) {
    console.error("ERROR");
    return;
  }

  const eventSource = new EventSource(
    "http://localhost:8080/api/migrate-events"
  );

  eventSource.onmessage = (event) => {
    callback(event.data);
  };

  eventSource.onerror = (err) => {
    console.error("Error on SSE:", err);
    eventSource.close();
  };
}
