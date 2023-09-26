import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    jwt.verify(req.cookies.user, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) {
            res.status(400).json("You are not logged")
        } else {
            req.user = decode
            next()
        }
    })
    
} 

export default auth