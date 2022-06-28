import jwt from 'jsonwebtoken'

function authenticateToken(req,res,next){
    try {
        const authHeader   = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if(token==null)
            return res.status(401).json({error:"Null token"});
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,   (error,user)=>{
            if(error){
                return res.status(403).json({error:error.message});
            }
            req.user = user;
            next();
        })
    }
    catch (e) {
        return res.status(404).json({
            statusCode: 404,
            message : "Unauthorized"
        })
    }
}

export {authenticateToken};