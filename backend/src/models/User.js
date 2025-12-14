const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name:{type:String, require:true},
        email:{
            type:String, 
            require:[true, "Please enter email"],
            unique:true,
            match:[
                /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter valid email"
            ]
        },
        password:{
            type:String,
            required:[true, "Please enter the password"],
            minLength:6,
            maxlength:12  
        },
        role: { type: String, enum: ["admin", "customer"], default: "customer" }
    },
     {timestamps:true}
)

//Encrypting the password before saving into database

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    
})

//compare password for login
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema);