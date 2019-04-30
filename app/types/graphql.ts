export type Resolver = (
  parent: any,
  args: any,
  context: {
    models: any
  },
  info: any,
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: {
    models: any
  },
  info: any,
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
