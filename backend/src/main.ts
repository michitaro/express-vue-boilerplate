import * as server from './server'
import * as db from './db'
import { app } from './app';
import * as config from '~/shared/config'


async function main() {
    await db.connect(config.mongoUrl)
    await server.start(app)
}


process.addListener('unhandledRejection', error => {
    console.error(error)
    process.exit(1)
})


main()