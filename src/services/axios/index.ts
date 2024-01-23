import axios from "axios";
import { throwStandardError } from "../../errors";
import { ErrorCode } from "../../errors/error-defs";
import { errorLog, infoLog } from "../../logs";

export const ZaloPayAxios = () => {
  const instance = axios.create({
    baseURL: process.env.ZALO_PAY_BASE_URL
  });

  instance.interceptors.response.use(
    (response) => {
      infoLog(response.data, "Call to ZaloPay result");
      return response;
    },
    (error) => {
      errorLog(error, undefined, "Call to ZaloPay failed");
      return throwStandardError(ErrorCode.ZALO_PAY_CALL_FAIL);
    }
  );

  return instance;
};
