import pino from 'pino';

const logger = pino({
  transport: {
    pipeline: [
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname'
        }
      },
      {
        target: 'pino/file',
        options: {
          destination: './logfile.log',
          append: true,
          prettyPrint: true
        }
      }
    ]
  }
});

export default logger;
