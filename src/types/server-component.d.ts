export interface ServerComponentCtx {
  params: { [key: string]: any };
  searchParams: { [key: string]: any };
}
export type ServerComponent = (
  ctx: ServerComponentCtx
) => Promise<JSX.Element> | JSX.Element;
