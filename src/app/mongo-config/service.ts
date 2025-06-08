import { MongoCredentials } from "@/services/MfApiObjects";
import { GetMongoCollections } from "@/services/MfApiServices";

export async function sendGetCollections(cred: MongoCredentials) {
  const rest = await GetMongoCollections(cred);

  console.log(rest);

  return rest;
}
