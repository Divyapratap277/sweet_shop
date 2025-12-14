const Sweet = require("../models/Sweet")
const jwt = require("jsonwebtoken")

//Adding sweet
exports.addSweet = async (req,res) =>{
    try {
        const sweet = await Sweet.create(req.body);
        res.status(200).json(sweet)
    } catch (error) {
         res.status(500).json({error:message})
    }
};


//Get all sweets
//GET :/api/sweets

exports.getSweet = async(req,res)=>{
    try {
        const sweet = await Sweet.find();
        res.json(sweets);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Searching the sweet 

exports.searchSweets = async (req,res)=>{
    try {
        const { name, category, minPrice,maxPrice} = req.query

        let filter = {};
       if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;

    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const sweets = await Sweet.find(filter);
    res.json(sweets);
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

//Update the sweet by Admin
//
 
exports.updateSweets = async (req,res)=>{
    try {
        const sweet = await Sweet.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(sweet);
    } catch (error) {
         res.status(500).json({error: error.message})
    }
}


//Delteting the sweet


exports.deleteSweet = async(req,res)=>{
    try {
        const sweet = await Sweet.findByIdAndDelete(req.params.id);

        if(!sweet)
        {
            return res.status(404).json({message: "Sweet not founnd"})
        }

        res.json({message:"Sweet has been deleted"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}





