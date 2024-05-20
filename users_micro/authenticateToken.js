import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
import cookieParse from 'cookie-parser'

export default function authenticate(req,res,next){
    const token=res.cookie.token;
    console.log(token)
    if(!token)
        {
            res.status(403).send('access denied')
        }
    jwt.verify(token,process.env.secret_key,(err,res)=>{
        if(err)
            {
                res.status(403).send('invalid token')
            }
            return res.status(200).send('access granted')
    })

    next()

}
