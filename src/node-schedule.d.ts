declare module 'node-schedule' {
    export function scheduleJob(
      cronExpression: string,
      callback: () => void
    ): any;
  }