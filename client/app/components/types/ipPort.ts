export class ipPort {
  ip: string;
  port: string;
  application_type: string;
  endpoint: string;
  constructor(ip: string, port: string, application_type: string, endpoint: string) {
    this.ip = ip;
    this.port = port;
    this.application_type = application_type;
    this.endpoint = endpoint;
  }
}
