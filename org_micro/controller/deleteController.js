import { del } from "../models/delete.js";

export async function deleteController(req,res)
{
    try{
        const orgname=req.params.orgname
        const data=await del(orgname)
        if(data.noexist)
            {
                res.status(404).json({error:"no such organization exits"})
            }
        if(data.result)
            {
                res.status(200).json({result:"deleted successfully"})

            }
        if(data.error)
            {
                res.status(500).json({error:"some internal server error"})
            }
    }
    catch(ex)
    {
        res.status(500).json({error:"some internal server error"})
    }
}