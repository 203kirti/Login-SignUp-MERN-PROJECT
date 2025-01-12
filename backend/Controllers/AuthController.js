const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

const login =  async (req, res) =>{
    try{
        const { email , password } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(403)
                .json({
                    message: 'Authentication failed,   email or password is wrong', 
                    success: false
                });
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual){
            return res.status(403)
              .json({
                 message: 'password Incorrect',
                 success:false
              })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(202)
            .json({
                message: "loggedIn Successfully" , success:true,
                jwtToken,
                email,
                name:user.name
            })
    } catch(err) {
        res.status(500)
            .json({
                message: "Internal Server Error", success:true
            })
    }
}


const signup =  async (req, res) =>{
    try{
        const {name , email , password } = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            return res.status(409)
                .json({message: 'user already exist', success: false});
        }
        const userModel = new UserModel({name, email , password});
        userModel.password = await bcrypt.hash(password ,10 );
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Successfully" , success:true
            })
    }catch(err){
        res.status(500)
            .json({
                message: "Internal Server Error", success:true
            })
    }
}



module.exports ={
    signup, 
    login
}