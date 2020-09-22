import * as Joi from 'joi';
import { logger } from './logger';

export const getEnv = (envSchema: Joi.ObjectSchema) => {
  const { error, value } = Joi.validate(process.env, envSchema, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    error.details.map((e) => logger.error(e.message));
    process.exit(1);
  }

  return value;
};
