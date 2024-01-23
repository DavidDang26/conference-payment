import { IController } from "../interfaces";
import { Request, Response, Router } from "express";
import ZaloPayService from "../services/ZaloPayService";

class PaymentController implements IController {
  readonly path = "/api/payment";
  readonly router = Router();

  constructor(private zaloPayService: ZaloPayService) {
    this.initializeRouters();
  }

  initializeRouters(): void {
    this.router.post(`${this.path}/create`, this.createPayment);
  }

  createPayment = async (req: Request, res: Response) => {
    try {
      const response = await this.zaloPayService.createPayment({
        userId: req.body.userId,
        paperName: req.body.paperName
      });
      return res.status(200).json({
        data: response
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default PaymentController;
