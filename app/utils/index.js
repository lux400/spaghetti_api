import express from 'express';

export const route = (router, method, pattern, controller, action) => {
  const { middleware = {} } = controller;
  const middlewares = middleware[action] || [];

  router[method](pattern, ...middlewares, controller[action]);
};

export const resources = (controller, { only } = {}) => {
  const resourceRouter = express.Router({ mergeParams: true });
  const routes = [
    ['/', 'get', 'index'],
    ['/', 'post', 'create'],
    ['/:id', 'get', 'show'],
    ['/:id', 'put', 'update'],
    ['/:id', 'delete', 'del'],
  ];

  routes
    .filter(([, , action]) => controller[action])
    .filter(([, , action]) => (only ? only.includes(action) : true))
    .forEach(([pattern, method, action]) => {
      route(resourceRouter, method, pattern, controller, action);
    });
  return resourceRouter;
};

export const nest = (routerExtendFunc) => {
  const router = express.Router({ mergeParams: true });
  routerExtendFunc(router);
  return router;
};

export const notRequired = (validators) =>
  validators.map((validator) => (data) => (data ? validator(data) : true));
