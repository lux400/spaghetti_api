const { NODE_ENV = 'development', HOST = '0.0.0.0', PORT = 1337 } = process.env;

const common = {
  env: NODE_ENV,
  host: HOST,
  port: PORT,
};

const development = {
  ...common,
};

const production = {
  ...common,
};

const config = {
  development,
  production,
};
export default config[NODE_ENV];
