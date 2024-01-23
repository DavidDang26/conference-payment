import { CreatePaymentRequest, IController } from "../interfaces";
import { Request, Response, Router } from "express";
import ZaloPayService from "../services/ZaloPayService";
import CryptoJS from "crypto-js";
import { boardService } from "../data/board";

class PaymentController implements IController {
  readonly path = "/api/payment";
  readonly router = Router();

  constructor(private zaloPayService: ZaloPayService) {
    this.initializeRouters();
  }

  initializeRouters(): void {
    this.router.post(`${this.path}/create`, this.createPayment);
    this.router.post(`${this.path}/callback`, this.paymentCallBack);
  }

  createPayment = async (req: Request, res: Response) => {
    try {
      const response = await this.zaloPayService.createPayment({
        title: req.body.title,
        id: req.body.id,
        description: req.body.description,
        paperLink: req.body.paperLink,
        conferenceId: req.body.conferenceId
      });
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  paymentCallBack = async (req: Request, res: Response) => {
    console.log("🚀 ~ PaymentController ~ paymentCallBack= ~ req:", req.body);
    const { key2 } = this.zaloPayService.CONFIG;
    let result: {
      return_code?: number;
      return_message?: string;
    } = {};

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, key2!).toString();
      console.log("mac =", mac);

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson["app_trans_id"]
        );
        const item = JSON.parse(dataJson.item)[0] as CreatePaymentRequest;
        console.log("🚀 ~ PaymentController ~ paymentCallBack= ~ item:", item);
        const board = (await boardService.getBoard(item.conferenceId)) as any;
        console.log(
          "🚀 ~ PaymentController ~ paymentCallBack= ~ board:",
          board
        );
        const lanes = board.lanes;
        const paperLane = lanes[0];
        const cards = paperLane.cards.map((card: any) => {
          if (card.id !== item.id) return card;
          return {
            ...card,
            paymentStatus: "Paid"
          };
        });
        paperLane.cards = cards;
        lanes[0] = paperLane;
        await boardService.updateBoard(item.conferenceId, { lanes });

        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
  };
}

export default PaymentController;
