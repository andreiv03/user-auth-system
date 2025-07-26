const DEFAULTS = {
  NODE_ENV: "development",
};

export const ENV = {
  JWT_SECRET: process.env["JWT_SECRET"] as string,
  MONGODB_DB: process.env["MONGODB_DB"] as string,
  MONGODB_URI: process.env["MONGODB_URI"] as string,
  NODE_ENV: process.env["NODE_ENV"] || DEFAULTS.NODE_ENV,
} as const;

if (typeof window === "undefined") {
  Object.entries(ENV).forEach(([key, value]) => {
    if (!key || !value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}

export const AXIOS_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
} as const;

export const COOKIE_OPTIONS = (maxAge: number) =>
  ({
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  } as const);
