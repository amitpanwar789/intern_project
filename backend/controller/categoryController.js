import AsyncHandler from "express-async-handler";


// @desc    Register a new user
// @route   GET /api/category
// @access  Public
const getCategory = AsyncHandler((req,res)=>{
    res.json({category:["Mobiles","Electronics","Books"]});
})

export default getCategory