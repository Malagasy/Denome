import { Api } from "./Api";

export const services = {
  Api: new Api(),
};

export type Services = typeof services;
