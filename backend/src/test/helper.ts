import mongoose, * as db from '@/db'


export async function asyncResult(fn: () => Promise<any>): Promise<{ resolve?: any, reject?: any }> {
  try {
    return { resolve: await fn() }
  }
  catch (error) {
    return { reject: error }
  }
}


export async function setupDatabase() {
  await db.connect('mongodb://localhost/obslog-test')
}

export function cleanupDatabase() {
  mongoose.connection.close()
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase()
}


export async function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}