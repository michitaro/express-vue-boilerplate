import * as mongoose from 'mongoose'


export function connect(mongoUrl: string): Promise<mongoose.Connection> {
  return new Promise(resolve => {
    mongoose.connect(mongoUrl)
    const db = mongoose.connection
    db.once('open', () => {
      resolve(db)
    })
    db.on('error', (error) => {
      console.error(`mongoose error: ${error}`)
      process.exit(1)
    })
  })
}


export default mongoose