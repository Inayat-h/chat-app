
const User=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const createAndsaveToken=require("../jwt/creatTokenSave.js");


 module.exports.Signup= async(req,res)=>{

 try{    
     const { Fullname, email, password, confirmPassword }=req.body;
    
    console.log(req.body);
    if(password !== confirmPassword){
        return res.status(400).json({error:"password does not match"});
     }
     const user= await User.findOne({email});
     if(user){
        return res.status(400).json({error:"user is already created"});

     }
     const hashPassword= await bcrypt.hash(password,10);
     const newuser=  await new User({
         Fullname,
         email,
         password:hashPassword
     }
     );
      await  newuser.save();
    if(newuser){
        createAndsaveToken(newuser._id,res);
        return res.status(201).json({message:"user is created succesfully",user:{
            id:newuser._id,
            Fullname:newuser.Fullname,
            email:newuser.email
        }});
    }

 }
catch(error){
     console.log(error)
     res.status(500).json({error:"internal server error"});


 }
};
module.exports.login=async(req,res)=>{
    try{
        const { email,password}=req.body;
        const user=await User.findOne({email});
        const ismatch=await bcrypt.compare(password,user.password);
        if( !user || !ismatch){
             return res.status(400).json({error:"invalid credencials"});
        }
        createAndsaveToken(user._id,res);
        res.status(201).json({message:"login succesfully",user:{
            id:user._id,
            Fullname:user.Fullname,
            email:user.email
        }});
        

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"internal server error"});
   
   
    }
}

module.exports.getuser=async(req,res)=>{

    try{
    const loggedInUser=req.user._id    
    const filterUser=await User.find({ _id: { $ne:loggedInUser } }).select("-password");
    res.status(201).json(filterUser);


    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"internal server error"});
   
   
    }
};
module.exports.logout=async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(201).json({message:"logout succesfully"});
    }catch(error){
        console.log(error)
        res.status(500).json({error:"internal server error"});

    }
}



