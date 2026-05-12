const requiredEnv = ["VITE_APP_ENV", "VITE_APP_NAME", "VITE_API_URL"];

requiredEnv.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  APP_ENV: import.meta.env.VITE_APP_ENV,

  APP_NAME: import.meta.env.VITE_APP_NAME,

  API_URL: import.meta.env.VITE_API_URL,
};
