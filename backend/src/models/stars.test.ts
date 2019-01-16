const assert = require('assert') as typeof import('power-assert')
import { asyncResult } from "@/test/helper";
import * as stars from './stars';
import * as fs from 'fs'

const password = fs.existsSync(`${__dirname}/password`) && fs.readFileSync(`${__dirname}/password`).toString().trim()

describe('stars.checkPassword', () => {
  it('should throw an error with incorrect credentials', async () => {
    const { reject } = await asyncResult(async () => {
      return await stars.checkPassword('koikem', 'invalid-password')
    })
    assert(!!reject)
  })

  password && it('should does not throw with correct credentials', async () => {
    const { resolve, reject } = await asyncResult(async () => {
      return await stars.checkPassword('koikem', password)
    })
    assert(reject == undefined)
  })
})

password && describe('stars.profile', () => {
  it('should retrieve user profile from STARS', async () => {
    const { attributes, groups } = await stars.profile('koikem')
    assert(attributes['mail'] == 'michitaro.koike@nao.ac.jp')
    assert(groups.includes('starsweb'))
    assert(groups.includes('hscadm'))
  })
})