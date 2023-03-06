export type RouteHandler = (
  req: NextRequest,
  ctx: RouteHandlerCtx
) => NextResponse | Promise<NextResponse>;

export interface RouteHandlerCtx {
  params: string;
}
