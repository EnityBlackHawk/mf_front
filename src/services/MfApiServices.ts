import axios from "axios";
import * as obj from "./MfApiObjects";
import { MetadataInfo, Relation, Response } from "./MfApiResponses";

export async function TryConnectRdb(rdbAccess: obj.RdbAccess) {
  return await axios.post(
    "http://localhost:8080/api/utils/tryConnectRdb",
    rdbAccess
  );
}

export async function Setup(setup: obj.Setup): Promise<Response<MetadataInfo>> {
  const rest = await axios.post("http://localhost:8080/api/setup", setup, {
    validateStatus: () => true,
  });

  if (rest.status == 200) {
    return { status: rest.status, data: rest.data as MetadataInfo };
  }

  return { status: rest.status, message: rest.data.message };
}
