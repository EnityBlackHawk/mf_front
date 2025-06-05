import { Setup } from "@/services/MfApiObjects";
import * as MfService from "@/services/MfApiServices";

export async function sendSetup(setup: Setup) {
  const result = await MfService.Setup(setup);

  console.log(result.data);
}
