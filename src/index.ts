import { app } from './app';

const start = async () => {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}
start();