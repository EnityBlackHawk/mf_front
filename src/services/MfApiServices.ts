import axios from "axios";
import * as obj from "./MfApiObjects";

export async function TryConnectRdb(rdbAccess: obj.RdbAccess) {
  return await axios.post(
    "http://localhost:8080/api/utils/tryConnectRdb",
    rdbAccess
  );
}

export async function Setup(setup: obj.Setup) {
  return await axios.post("http://localhost:8080/api/setup", setup);
}
