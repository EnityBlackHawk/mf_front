import { MongoCredentials, UpdateType } from "@/services/MfApiObjects";
import { GeneratedJavaCode } from "@/services/MfApiResponses";
import { Migrate } from "@/services/MfApiServices";

export async function sendMigration(
  mongoCred: MongoCredentials,
  javaCode: GeneratedJavaCode,
  callback: (update: UpdateType) => void
) {
  await Migrate(
    { credentials: mongoCred, generatedJavaCode: javaCode },
    (msg) => {
      callback(JSON.parse(msg));
    }
  );
}
