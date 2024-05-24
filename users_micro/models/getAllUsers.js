import dotenv 
from 'dotenv'

dotenv.config()
import db from '../DBconnection.js'

export  async function getUsers(){
    try{
    const query=`select username from users`
    const [value]=await db.query(query)
    const result={
        result:value   
    }
    return result
    }
    catch(ex){
       const obj={
        error:"some internal error"
       }
       return obj
    }
    
}


export async function getParticularUser(username)
{   try{
    const user=username.username
    const query=`select * from users where username=?`
   const [value]=await db.query(query,user)
   if(value.length==0)
    {
        const obj={
            nouser:"no user exits"
        }
        return obj
    }
   const result={
    result:value
   }
   return result
    }
    catch(ex){
        const obj={
            error:"some internal server error"
        }
    }
}

