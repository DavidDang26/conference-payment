import { AxiosInstance } from "axios";
import { ZaloPayAxios } from "./axios";
import moment from "moment";
import CryptoJS from "crypto-js";
import { CreatePaymentRequest } from "../interfaces";

class ZaloPayService {
  private readonly axios: AxiosInstance = ZaloPayAxios();

  private readonly PATH = {
    CREATE_PAYMENT: "/create"
  };

  public CONFIG = {
    appId: process.env.ZALO_PAY_APP_ID,
    key1: process.env.ZALO_PAY_KEY_1,
    key2: process.env.ZALO_PAY_KEY_2
  };

  createPayment = async (createPaymentRequest: CreatePaymentRequest) => {
    const { appId, key1 } = this.CONFIG;
    const embed_data = {
      preferred_payment_method: ["zalopay_wallet"],
      redirecturl: "http://localhost:4000/conferences"
    };
    const items = [createPaymentRequest];
    const transID = Math.floor(Math.random() * 1000000);
    const order: any = {
      app_id: appId,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: createPaymentRequest.id,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 20000,
      description: `Conference payment fee #${transID}`,
      bank_code: "",
      callback_url:
        "https://d8df-27-73-107-41.ngrok-free.app/api/payment/callback"
    };
    const data =
      appId +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, key1!).toString();
    const response = await this.axios.post(this.PATH.CREATE_PAYMENT, null, {
      params: order
    });
    return response.data;
  };
}

export default ZaloPayService;
