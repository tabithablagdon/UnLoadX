export class ipPort {
  ip: string;
  port: string;
  application_type: string;
  constructor(ip: string, port: string, application_type: string) {
    this.ip = ip;
    this.port = port;
    this.application_type = application_type;
  }
}
