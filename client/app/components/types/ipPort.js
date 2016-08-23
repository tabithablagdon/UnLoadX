"use strict";
var ipPort = (function () {
    function ipPort(ip, port, application_type, endpoint) {
        this.ip = ip;
        this.port = port;
        this.application_type = application_type;
        this.endpoint = endpoint;
    }
    return ipPort;
}());
exports.ipPort = ipPort;
//# sourceMappingURL=ipPort.js.map