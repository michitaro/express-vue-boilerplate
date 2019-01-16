import { Express } from "express";
import { Server } from "http";
import * as config from "~/shared/config";

export function start(app: Express): Promise<Server> {
  return new Promise(resolve => {
    const server = app.listen(config.servicePort, () => {
      resolve(server)
    })
  })
}