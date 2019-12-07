import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {
  logJson(message: string, json?: any) {
    super.log(`${message}: ${JSON.stringify(json, null, 2)}`);
  }
}
