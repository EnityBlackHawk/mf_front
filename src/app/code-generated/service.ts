import { GeneratedJavaCode, ModelDto } from "@/services/MfApiResponses";
import { GenerateJavaCode } from "@/services/MfApiServices";

export async function sendGenerateJavaCode(modelDto: ModelDto) {
  const resp = await GenerateJavaCode(modelDto);

  console.log(resp);

  return resp;
}

export function parseResponse(data: GeneratedJavaCode) {
  let allCode = "";

  for (const key in data.code) {
    allCode = allCode.concat("==============================\n");
    allCode = allCode.concat(data.code[key]);
  }

  return allCode;
}
