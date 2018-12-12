import { app } from "./app";
import * as config from "~/shared/config";

const server = app.listen(config.servicePort, () => {
    console.log('server start')
})

export { server }