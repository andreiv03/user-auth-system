interface Constants {
  JWT_SECRET: string;
  MONGODB: {
    DATABASE_NAME: string;
    URI: string;
  };
  CLOUDINARY: {
    API_KEY: string;
    API_SECRET: string;
    CLOUD_NAME: string;
  };
};

const constants: Constants = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  MONGODB: {
    DATABASE_NAME: process.env.MONGODB_DATABASE_NAME as string,
    URI: process.env.MONGODB_URI as string
  },
  CLOUDINARY: {
    API_KEY: process.env.CLOUDINARY_API_KEY as string,
    API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string
  }
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined")
    throw new Error(`${key} not found!`);
});

export default constants;