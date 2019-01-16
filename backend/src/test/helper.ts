import mongoose, * as db from '@/db'


export async function asyncResult(fn: () => Promise<any>): Promise<{ resolve?: any, reject?: any }> {
  try {
    return { resolve: await fn() }
  }
  catch (error) {
    return { reject: error }
  }
}

export function clearDatabase() {
  before(async () => {
    await db.connect('mongodb://localhost/obslog-test')
    mongoose.connection.db.dropDatabase()
  })
}