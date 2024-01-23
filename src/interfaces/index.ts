import * as express from "express";

export interface IController {
  readonly router: express.Router;
  readonly path: string;

  initializeRouters(): void;
}

export interface CreatePaymentRequest {
  title: string;
  id: string;
  description: string;
  paperLink: string;
  conferenceId: string;
}
