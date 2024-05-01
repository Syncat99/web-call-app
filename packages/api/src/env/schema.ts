import joi from "joi";

export interface EnvVars {
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
}

const envVarsSchema: joi.ObjectSchema<EnvVars> = joi.object({
  NODE_ENV: joi
    .string()
    .allow("development", "production")
    .default("development")
    .optional(),
  DATABASE_URL: joi.string().required(),
});

export default envVarsSchema;
