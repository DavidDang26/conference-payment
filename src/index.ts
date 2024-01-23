import App from './app';
import { testController } from './di-container';

const port = process.env.PORT || 5000;

export const app = new App([testController], port);

app.listen();
