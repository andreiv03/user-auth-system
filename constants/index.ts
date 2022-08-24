interface Constants {
  JWT_SECRET: string;
  MONGODB: {
    DATABASE_NAME: string;
    URI: string;
  };
};

const constants: Constants = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  MONGODB: {
    DATABASE_NAME: process.env.MONGODB_DATABASE_NAME as string,
    URI: process.env.MONGODB_URI as string
  }
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined")
    throw new Error(`${key} not found!`);
});

export default constants;