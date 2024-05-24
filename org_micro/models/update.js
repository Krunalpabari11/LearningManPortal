import db from "../DBconnection.js";
export async function update(data)
{
    try{
        const query=`update organization set orgname= ?, orgpassword=? where id=? `
        const orgname=data.orgname
        const orgpassword=data.orgpassword
        const id=data.id
        console.log(orgname)
        const [result]=await db.query(query,[orgname,orgpassword,id])
        if(result.affectedRows==0)
            {
                const obj={fail:"update failed"}
                return obj
            }
        if(result.affectedRows>0)
            {
                const obj={success:"updation successfull"}
                return obj;
            }
    }
    catch(ex)
    {
        const obj={error:"some internal server error"}
        return obj;
    }
}