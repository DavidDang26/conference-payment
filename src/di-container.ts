import PaymentController from "./controllers/PaymentController";
import TestController from "./controllers/TestController";
import ZaloPayService from "./services/ZaloPayService";

export const testController = new TestController();

export const zaloPayService = new ZaloPayService();

export const paymentController = new PaymentController(zaloPayService);
