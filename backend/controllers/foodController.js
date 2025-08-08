import foodModel from "../models/food.js";
import {v2 as cloudinary} from 'cloudinary'

const addFood = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new food item with Cloudinary URL
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url //  secure_url from Cloudinary
    });

    // Save to database
    await food.save();

    // Respond with success
    res.status(201).json({ 
      success: true,
      message: "Food item added successfully",
      data: food 
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to add food item",
      error: error.message 
    });
  }
};

const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true, foods})
    } catch (error) {
        console.error("Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to add food item",
      error: error.message 
    });
    }
}
const removeFood = async (req,res)=>{
    try {
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, msg:'Food Removed'})
    } catch (error) {
         console.error("Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to add food item",
      error: error.message 
    });
    }
}
export {addFood, listFood, removeFood}