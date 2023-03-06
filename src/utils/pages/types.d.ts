export type PageHandler = (
  ctx: ServerComponentProps
) => Promise<JSX.Element> | JSX.Element;
