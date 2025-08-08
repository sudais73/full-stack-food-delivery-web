import userModel from './../models/user.js';

//add to cart//
const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.user.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;

        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.user.userId, {cartData})
        res.json({success: true, msg:"Added to cart", userData, cartData});
    } catch (error) {
        console.log(error)
        res.json({success:false, msg:error.message})
    }
}

// remove from cart//
const removeFromCart = async(req,res)=>{
    try {
         let userData = await userModel.findById(req.user.userId)
          let cartData = await userData.cartData;
       if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
       }
       await userModel.findByIdAndUpdate(req.user.userId, {cartData});

         res.json({success: true, msg:"Item Removed from cart"});


    } catch (error) {
         console.log(error)
        res.json({success:false, msg:error.message})
    }
}

//user cart data//
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.user.userId)
          const cartData = await userData.cartData;
          res.json({success: true, cartData});
    } catch (error) {
         console.log(error)
        res.json({success:false, msg:error.message})
    }
}

export {addToCart,removeFromCart, getCart}
