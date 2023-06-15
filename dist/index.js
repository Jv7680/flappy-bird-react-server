import express from 'express';
import cors from 'cors';
import initWebRoute from './src/initWebRoutes';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
// using cors
app.use(cors());
// using body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// init web routes
initWebRoute(app);
//# sourceMappingURL=index.js.map