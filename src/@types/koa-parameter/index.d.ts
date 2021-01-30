declare module "koa-parameter" {
  //import * as Koa from "koa";

  //declare function verifyParam(ctx: Koa.Context, next: Koa.Next): void;

  //declare interface IRulesObject {
  //[key: string]: any;
  //}

  //declare module "koa" {
  //interface Context {
  //verifyParams: (rules: any, params?: any) => any;
  //}
  //}
  export default function parameter(
    app: Koa,
    translate?: Function
  ): Koa.Middleware;
}
