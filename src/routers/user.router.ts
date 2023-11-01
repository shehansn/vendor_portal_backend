import bcrypt from 'bcryptjs';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { sample_users } from '../data';
import { User, UserModel } from '../models/user.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        console.log('usersCount', usersCount);
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        //const users = await UserModel.find().select('-password');
        res.send('users initial route');
    }
))

router.get("/all", asyncHandler(
    async (req, res) => {
        const users = await UserModel.find().select('-password');
        res.send(users);
    }
))


router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenReponse(user));
        }
        else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }

    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST)
                .send('User is already exist, please login!');
            return;
        }
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenReponse(dbUser));
    }
))

const generateTokenReponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: token
    };
}

// function generateTokenReponse(userInfo:User) {
//     const User = {
//         id: userInfo.id,
//         name: userInfo.name,
//         email: userInfo.email,
//         isAdmin: userInfo.isAdmin,
//     };
//     const PAYLOAD = { sub: User };

//     return jwt.sign(PAYLOAD, process.env.JWT_SECRET!, { expiresIn: '1d' });

// }

export default router;
