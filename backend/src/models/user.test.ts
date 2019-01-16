import { asyncResult, clearDatabase } from "@/test/helper";
import * as fs from 'fs';
import * as stars from './stars';
import { UserModel } from "./user";

const assert = require('assert') as typeof import('power-assert')

const password = fs.existsSync(`${__dirname}/password`) && fs.readFileSync(`${__dirname}/password`).toString().trim()


describe('UserModel', () => {
  describe('.fromStars', () => {

    it('should throw error with incorrect credentials', async () => {
      const { reject } = await asyncResult(async () =>
        await UserModel.fromStars('koikem@stars', 'invalid-password')
      )
      assert(!!reject)
    })

    password && describe('with correct credentials', () => {
      before(async () => {
        await clearDatabase()
      })

      it('should make a db entry', async () => {
        const user = await UserModel.fromStars('koikem', password)
        const { attributes, groups } = await stars.profile('koikem')
        assert(user.account_name == 'koikem')
        assert(user.email == attributes['mail'])
        assert.deepEqual(Array.from(user.propIds), groups)
        const dbuser = await UserModel.findOne({ account_name: 'koikem' })
        assert.deepEqual(dbuser!._id.id, user._id.id)
      })

      it('should not make a new db entry if there is existing corresponding one', async () => {
        await UserModel.fromStars('koikem', password)
        const dbuser1 = await UserModel.findOne({ account_name: 'koikem' })
        await UserModel.fromStars('koikem', password)
        const dbuser2 = await UserModel.findOne({ account_name: 'koikem' })
        assert.deepEqual(dbuser1!._id.id, dbuser2!._id.id)
        assert.deepEqual(dbuser1!.propIds, dbuser2!.propIds)
      })
    })
  })
})