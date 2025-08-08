// import jwt from 'jsonwebtoken'



// const authMiddleware = async(req, res, next)=>{
  
//     const {token} = req.headers;

//     if(!token){
//        return  res.json({success:false, msg:"Unauthorized please login first"})
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//         req.user.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, msg:"error"})
//     }
// }



// export default authMiddleware;


import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, msg: "Unauthorized please login first" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Initialize req.user if it doesn't exist
        req.user = req.user || {};
        req.user.userId = token_decode.id;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ 
            success: false, 
            msg: "Invalid or expired token",
            error: error.message 
        });
    }
}

export default authMiddleware;