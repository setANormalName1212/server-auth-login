import { userDB } from "../user.js"
import UserDTO from "../DTO/userDTO.js"
import { genSalt, hash } from 'bcrypt'

class UserDAO {

    // Find user by email
    async get(email) {
        // If doesn´t provide a email, return all users
        if(!email) {
            const users = await userDB.find()

            return users
        } 
        // If does provide a email, find the email
        else {
            const user = await userDB.findOne({ email: email})

            // If user don't exist, return nothing
            if(!user) {
                return;
            } else {
                // If user exist, return user
                return user
            }
        }
    }

    async getAll() {
        return await userDB.find()
    }

    // Add new user
    async add(user) {
        // hashing the password
        genSalt(10, (err, salt) => {
            hash(user.password, salt, (err, hash) => {

                // save the hashing password in a DTO
                const userDTO = new UserDTO(user.fullName, user.email, hash)
                // Create a new instance of User
                const newUser = new userDB(userDTO)

                // Save the new instance in the DB
                newUser.save()
                    .then(() => { return;})
                    .catch(e => { return e})
            })
        })
    }

    // Delete user by EMAIL
    async delete(email) {
        await userDB.deleteOne({ email: email})

        return;
    }

    async deleteAll() {
        await userDB.deleteMany()

        return;
    }
}

const userDAO = new UserDAO

export default userDAO