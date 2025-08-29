
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import getToken from "../utils/token.js";

export const signUp=async(req,res)=>{
    try{
        const {fullname,email,password,mobile,role}=req.body;
        let user=await User.findOne({email});
        if(user)
        {
            res.status(400).json({message:"user already exit"})
        }
        if(!password || password.length<6)
        {
            res.status(400).json({message:"password must be atleast 6 character"})
        }
        if(!mobile || mobile.length !==10)
        {
            res.status(400).json({message:"mobile number must be 10 digit"})
        }

        const hashpassword=await bcrypt.hash(password,10);
         user=await User.create({
            fullname,
            email,
            password:hashpassword,
            mobile,
            role
        });

        const token=await getToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        console.log(req.body)

       return res.status(201).json(user);
    }catch(error){
        console.log("Error in signUp:",error)
        return res.status(500).json({message:"signUp error"});
    }
    
}
export const signIn=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            res.status(400).json({message:"user cannot be exit"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            res.status(400).json({message:"password is invalid"})
        }
        


        

        const token=await getToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

       return res.status(200).json(user);
    }catch(error){
        console.log("Error in signIn:",error)
        return res.status(500).json({message:"signIn error"});
    }
}


export const signOut=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"signOut successfully created"})


    }
    catch(error)
    {
        console.log("signOut error",error)
        res.status(500).json({message:"signOut is problem"})
    }
}