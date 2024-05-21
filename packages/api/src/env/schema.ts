import joi from "joi";

export interface EnvVars {
  PORT?: number;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  TOKEN_STRING: string;
}

const envVarsSchema: joi.ObjectSchema<EnvVars> = joi
  .object({
    PORT: joi.number().default(3500).optional(),
    NODE_ENV: joi
      .string()
      .allow("development", "production")
      .default("development")
      .optional(),
    DATABASE_URL: joi.string().required(),
    TOKEN_STRING: joi.string().required(),
  })
  .unknown();

export default envVarsSchema;
