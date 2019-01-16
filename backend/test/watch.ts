import * as fs from 'fs'
import { spawnSync } from 'child_process'
import 'colors'

const root = `${__dirname}/..`
const target = `${root}/src`


fs.watch(target, { recursive: true }, (type, file) => {
  if (file.match(/.ts$/)) {
    if (!file.match(/\.test\.ts$/)) {
      file = file.replace(/\.ts$/, '.test.ts')
    }
    if (fs.existsSync(`${target}/${file}`)) {
      console.log(`running test ${file}...`.blue)
      spawnSync('npx', ['mocha', `${target}/${file}`], { stdio: 'inherit' })
      console.log(`done`.blue)
      console.log()
    }
  }
})