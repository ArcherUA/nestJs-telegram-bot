"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const Winston = require("winston");
exports.logger = Winston.createLogger({
    transports: [new Winston.transports.Console()],
    level: 'debug',
});
//# sourceMappingURL=logger.js.map