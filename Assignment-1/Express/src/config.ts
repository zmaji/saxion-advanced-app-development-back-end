const config = {
  DB_HOST: process.env.DB_HOST || 'mongo',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'fear-of-flight-db',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './public/uploads',
};

export default config;
