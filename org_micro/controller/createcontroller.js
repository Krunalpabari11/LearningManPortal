import express from 'express';
import dotenv from 'dotenv';
import { createOrg, insertOrg } from '../models/create.js';  // Ensure the path and extension are correct

dotenv.config();

export async function create(req, res) {
    try {
        const val = await createOrg();
       
        if (val === 500) {
            return res.status(500).json({ error: "Some internal server error" });
        }

        const orgname=req.body.orgname
        const orgpassword=req.body.orgpassword
        const obj={
            orgname:orgname,
            orgpassword:orgpassword
        }
        const result = await insertOrg(obj);
      

        if (result.success) {
            return res.status(200).json({ success: "Inserted successfully" });
        }
        if(result.error)
            {
                res.status(500).json({ error: "Some internal server error" });
            }
    } catch (ex) {
        res.status(500).json({ error: "Some internal server error" });
    }
}
