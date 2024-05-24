import { update } from "../models/update.js"
export async function updateController(req,res)
{
    try{
        const orgname=req.body.orgname
        const orgpassword=req.body.orgpassword
        const id=req.body.id
        const obj={
            orgname:orgname,
            orgpassword:orgpassword,
            id:id
        }
        const result=await update(obj)
        if(result.error)
            {
                res.status(500).json({error:"some internal server error"})
            }
        if(result.success)
            {
                res.status(200).json({result:"updation done"})
            }
        if(result.fail)
            {
                res.status(500).json({error:"updation failed"})
            }
    }
    catch(ex)
    {
        res.send(500).json({error:"some internal server error"})
    }
}