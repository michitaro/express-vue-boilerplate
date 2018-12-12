import * as Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';


const ajv = new Ajv()


export function validate(schema: any) {
  forbidAdditionalProperties(schema)
  const validate = ajv.compile(schema)
  return (req: Request, res: Response, next: NextFunction) => {
    if (validate(req.body)) {
      next()
    }
    else {
      console.error(`schema validation error:`)
      console.error(validate.errors)
      res.sendStatus(BAD_REQUEST)
    }
  }
}


function forbidAdditionalProperties(schema: any) {
  if (schema.type == 'object') {
    schema.additionalProperties = false
    for (const prop in schema.properties) {
      forbidAdditionalProperties(schema.properties[prop])
    }
  }
}