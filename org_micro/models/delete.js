import db from "../DBconnection.js";

export async function del(data)
{
    try{
        const query="delete from organization where orgname=?"
        const [result]=await db.query(query,data)

        if(result.affectedRows==0)
            {
                const obj={noexist:"no such user exists"};
                return obj
            }
        if(result)
            {
                const obj={result:result}
                return obj;
            }
    }
    catch(ex)
    {   const obj={error:"some internal server error"}
        return obj;
    }
}