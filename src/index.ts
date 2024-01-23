import App from "./app";
import { paymentController, testController } from "./di-container";

const port = process.env.PORT || 5000;

export const app = new App([testController, paymentController], port);

app.listen();
