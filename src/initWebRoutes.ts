import authRouter from "./auth/authRoutes";
import userRouter from "./user/userRoutes";
import mailRouter from "./mail/mailRoutes";

const initWebRoute = (app: any) => {
    // route home
    app.get('/', (req: any, res: any) => {
        res.send('Flappy bird server is running!')
    })

    // port used to listen, client will call api to this port
    app.listen(8080, () => {
        console.log(`App listening on port 8080`)
    })

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/mail", mailRouter);
};

export default initWebRoute;