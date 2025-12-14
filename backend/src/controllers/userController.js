const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.register = async(req,res)=>{
       try {
        const {name, email, password,role}= req.body;

        const userExits= await User.findOne({email});
        if(userExists) return res.status(400).json({msg: "User already exists"})

            const user = await User.create({name, email,password, role});

            res.status(201).json({
                msg: "User registered successfully",
              user: { id: user._id, name: user.name, email: user.email, role: user.role }
            })
       } catch (error) {
            res.status(500).json({ error: error.message });
       }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "jwtsecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: { name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};