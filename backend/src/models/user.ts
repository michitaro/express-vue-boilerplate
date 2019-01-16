import { arrayProp, prop, staticMethod, Typegoose } from "typegoose";
import * as stars from './stars';


class User extends Typegoose {
  @prop()
  account_name!: string

  @prop()
  email?: string

  @arrayProp({ items: String })
  propIds!: string[]

  @staticMethod
  static async fromStars(account_name: string, password: string) {
    await stars.checkPassword(account_name, password)
    const { attributes, groups } = await stars.profile(account_name)
    let user = await UserModel.findOne({ account_name })
    if (user == null) {
      user = new UserModel({ account_name, email: attributes['mail'], propIds: groups })
      await user.save()
    }
    else {
      await user.update({ propIds: groups })
    }
    return user
  }
}

export const UserModel = new User().getModelForClass(User)