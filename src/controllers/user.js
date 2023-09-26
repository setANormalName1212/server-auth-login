import userDAO from "../models/DAO/userDAO.js"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"

const user = {
    login: async (req, res) => {
        const { email, password } = req.body

        // cheack if all inputs are not empty
        if (!email || !password) {
            res.json("fill all inputs")
        } else {
            // find user by email
            const user = await userDAO.get(email)

            // find by email if user exist
            if (!user) {
                res.status(400).json("user dont exist")
            } else {
                // find out if password (req.body) and password (stored in the DB) are equal
                compare(password, user.password, (err, result) => {
                    console.log(result)
                    if (!result) {
                        res.status(400).json("password don't match")
                    } else {
                        // passwords are equal
                        const token = jwt.sign({
                            fullName: user.fullName,
                            email: user.email,
                            password: user.password
                        }, process.env.ACCESS_TOKEN_SECRET)

                        res.cookie('user', token)
                        res.status(200).json("you are log in")
                    }
                })
            }
        }
    },

    register: async (req, res) => {
        const { fullName, email, password } = req.body
        const errors = []

        // check if all inputs are not empty
        if (!fullName || !email || !password) {
            res.json("fill all inputs")
        } else {
            // password must be at least 8 characters
            if (password.length < 8) {
                errors.push({ error: "Password should be at least 8 characters long" })
            }

            // errors should be 0
            if (errors.length > 0) {
                res.status(400).json(errors)
            } else {
                // find if a user with the email provided as been register
                const user = await userDAO.get(email)

                if (!user) {
                    userDAO.add(req.body)
                        .then(res.status(200).json("Register succefully"))
                        .catch(e => res.status(400).json("An error ocurred"))
                } else {
                    res.status(400).json("Email already exist")
                }
            }
        }
    },

    getOne: async (req, res) => {
        const { email } = req.user

        const user = await userDAO.get(email)

        res.json(user)
    },

    getAll: async (req, res) => {
        const users = await userDAO.getAll()

        res.json(users)
    },

    delete: async (req, res) => {
        const { email } = req.user

        const user = await userDAO.get(email)

        if (!user) {
            res.status(404).json("User don't exist")
        } else {
            await userDAO.delete(email)

            res.status(200).json("User deleted succesfully")
        }
    },

    logout: async (req, res) => {
        res.clearCookie("user")
        req.user = ""

        res.json("log out successfully")
    },

    deleteAll: async (req, res) => {
        await userDAO.deleteAll()

        res.json("all users deleted")
    }
}

export default user