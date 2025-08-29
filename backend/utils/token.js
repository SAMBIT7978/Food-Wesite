import jwt from 'jsonwebtoken';

const getToken=async (userID) => {
    try{
        const token=await jwt.sign({userID},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });
        return token;

    }
    catch(error){
        console.log("Error in getToken:",error)
        throw new Error("Token generation error");
    }
}
export default getToken;