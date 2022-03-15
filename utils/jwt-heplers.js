import jwt from 'jsonwebtoken'

function jwtTokens({user_id,user_name,user_email}){
    const user = {user_id,user_name,user_email};
    const accessToken  = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2m'});
  
    return ({accessToken});


}

export {jwtTokens};