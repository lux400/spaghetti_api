interface Common {
  env: string;
  host: string;
  port: number;
  secret: string;
}

interface Config {
  [key: string]: Common;
}

const { NODE_ENV = 'development', HOST = '0.0.0.0', PORT = 1337 } = process.env ;


const common: Common = {
  env: NODE_ENV,
  host: HOST,
  port: Number(PORT),
  secret: 'spaghetti',
};

const development = {
  ...common,
};

const production = {
  ...common,
};

const config: Config = {
  development,
  production,
};
export default config[NODE_ENV];
