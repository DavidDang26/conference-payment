export enum ErrorCode {
  ZALO_PAY_CALL_FAIL = "CON0000"
}

export const ERROR_CONFIG: Record<
  ErrorCode,
  | {
      statusCode: number;
      errorCode: string;
      message: string;
    }
  | undefined
> = {
  [ErrorCode.ZALO_PAY_CALL_FAIL]: {
    statusCode: 500,
    errorCode: ErrorCode.ZALO_PAY_CALL_FAIL,
    message: "Something wrong happened with ZaloPay API"
  }
};
