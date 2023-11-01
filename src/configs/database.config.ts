import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.CONNECTION_STRING!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "vendor_portal_DB"
    } as ConnectOptions).then(
        () => console.log("MongoDb Database connect successfully"),
        (error) => console.log('Database connection error', error)
    )
}