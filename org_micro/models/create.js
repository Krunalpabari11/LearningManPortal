import db from "../DBconnection.js";
import dotenv from 'dotenv'
dotenv.config()

export async function createOrg(){
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS organization (
          id INT AUTO_INCREMENT PRIMARY KEY,
          orgname VARCHAR(50) NOT NULL UNIQUE,
          orgpassword VARCHAR(255) NOT NULL
          
        )`;
        const [result]=await db.query(query);
        if(result)
            {
                return 200;
            }

    }
    catch(ex){
        return 500;
    }
}
export async function insertOrg(data){
    try{
        const query=`INSERT INTO organization SET ?`

        const [result] =await db.query(query,data)

        if(result)
            {   const obj={success:"inserted succesfull"}
                return obj;
            }
            else{
                const obj={error:"some internal server error"}
                return obj;
            }
    }
    catch(ex)
    {   
        const obj={error:"some internal server error"}
        return obj;
    }
}