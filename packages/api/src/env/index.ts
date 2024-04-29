import config from "./config";
config();

import envVarsSchema, { EnvVars } from "./schema";

export const env: EnvVars = envVarsSchema.validate(process.env).value;
export default env;
