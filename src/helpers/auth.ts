import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken=(req: Request) =>{
    const TOKEN = req.headers.authorization?.split(' ')[1];

        try {
            const decoded = jwt.verify(TOKEN!, process.env.JWT_SECRET!);
            console.log('decoded token',decoded);
            return decoded;
        } catch (error) {
            // Handle the error here (e.g., token is invalid or has expired)
            return null;
        }

    // return new Promise<void>((resolve, reject) => {
    //     if (!TOKEN) {
    //         reject();
    //     } else {
    //         jwt.verify(TOKEN, process.env.JWT_SECRET!, (err, decoded) => {
    //             if (err) {
    //                 reject();
    //             }
    //             console.log(decoded);
    //             //req.user = (decoded as { sub: string }).sub;
    //             resolve();
    //         });
    //     }
    // });
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'You need to be logged in to access this!',
        });
    }

};

// import jwt from 'jsonwebtoken';


// function verifyToken(req) {
//     const TOKEN = req.headers.authorization.split(' ')[1];

//     return new Promise((resolve, reject) => {
//         jwt.verify(TOKEN, process.env.JWT_SECRET!, (err, decoded) => {
//             if (err) {
//                 reject();
//             }

//             req.user = decoded.sub;
//             resolve();
//         });
//     });
// }

// module.exports = {
//     isAuth: (req, res, next) => {
//         if (!req.headers.authorization) {
//             return res.status(401).json({
//                 message: 'You need to be logged in to access this!'
//             });
//         }
//     }
// }