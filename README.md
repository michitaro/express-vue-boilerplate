# Boilerplate for Express + TypeScript Backend and vue-cli(TypeScript) Frontend with Shared API Schema.

## Introduction
This boilerplate has the following features.
* backend
  * Express
  * TypeScript
  * VSCode debugger support
* frontend
  * vue-cli
  * TypeScript
* Shared API
  * backend and frontend can use common shared API interfaces. Backend can also validate types of request body according to the shared schema.

## Install
```sh
git clone git@github.com:michitaro/express-vue-boilerplate.git
cd express-vue-boilerplate
sh ./scripts/build.sh
```

## Start Server
```sh
sh ./scripts/start.sh
```

## Shared API Schema
Shared API Schema is a system for type validation on backend. You can define API schema in ```sahred/api-schema/*.ts``` and validate types of request body in Express middleware as ```backend/src/routes.ts``` does. The system uses [quicktype](https://quicktype.io) and [Ajv](https://ajv.js.org) for type checking under the hood.