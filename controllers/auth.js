import jwt from "jsonwebtoken";  //generar token
import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        if (!req.body.user_email || !req.body.user_password || !req.body.user_name) {
            return res.status(400).send({
                message: "todos los datos son necesarioss para iniciar"
            });
        }

        if (req.body.user_password.length < 6) {
            return res.status(400).send({
                message: "password must be at least 6 characters"
            });
        }

        if (!req.body.user_email.includes('@')) {
            return res.status(400).send({
                message: "email must contain @ character"
            });
        }

        const user = await User.create({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: bcrypt.hashSync(req.body.user_password, 8) // se encripta la contraseña
        });
        res.status(201).json({
            "message": "Usuario creado",
            "user_id": user.user_id
        });
    } catch (err) {
        console.log('body', req.body)
        console.log(err);
    }
}
export const login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({
            where: {
                user_email: req.body.user_email
            }
        })
        if (!user) {
            return res.status(404).send({
                message: `No user found with email ${req.body.user_email}`
            });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.user_password,
            user.user_password
        );
        if (!passwordIsValid) {
            return res.status(401)
                .send({
                    message: "Invalid Password"
                });
        }
        const token = jwt.sign({
            user_id: user.user_id,
            user_name: user.user_name,
        }, 'secret-key', {
            expiresIn: 86400
        });
        res.status(200)
            .send({
                user: {
                    user_id: user.user_id,
                    user_email: user.user_email,
                    user_name: user.user_name,
                },
                message: "Login successfull",
                accesToken: token,

            });
    } catch (err) {
        console.log(err);
    }

}
