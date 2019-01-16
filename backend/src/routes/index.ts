import { Router } from "express";
import * as session from './session'

export function setup(app: Router) {
  session.setup(app)
}