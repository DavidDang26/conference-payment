import { errorLog } from "../logs";
import { ERROR_CONFIG, ErrorCode } from "./error-defs";

export const throwStandardError = (
  errorCode: ErrorCode,
  metadata?: Record<string, any>
) => {
  errorLog(ERROR_CONFIG[errorCode], metadata, ERROR_CONFIG[errorCode]!.message);
  throw new Error(`[${errorCode}] ${ERROR_CONFIG[errorCode]!.message}`);
};

export const returnStandardError = (
  errorCode: ErrorCode,
  metadata?: Record<string, any>
) => {
  return { ...ERROR_CONFIG[errorCode], stack: metadata };
};
