"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
const mailRoutes_1 = __importDefault(require("./mail/mailRoutes"));
const initWebRoute = (app) => {
    // route home
    app.get('/', (req, res) => {
        res.send('Flappy bird server is running!');
    });
    // port used to listen, client will call api to this port
    app.listen(8080, () => {
        console.log(`App listening on port 8080`);
    });
    app.use("/api/v1/auth", authRoutes_1.default);
    app.use("/api/v1/user", userRoutes_1.default);
    app.use("/api/v1/mail", mailRoutes_1.default);
};
exports.default = initWebRoute;
//# sourceMappingURL=initWebRoutes.js.map