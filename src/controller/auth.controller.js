const bcrypt = require('bcrypt');
//import a User with a curly brases, dont use it as a varibale
const { User} = require('../model/user.schema');

const { AppDatasource } = require('../database/config.database'); // Your DataSource setup



const signup =  async (req,res) => {
    const {email, password} = req.body;
if (!email && !password) {
    return res.status(400).json({ 
        valid : false,
        message: 'email and password are required'

    });

} else if (!email) {
    return res.status(400).json({ 
        valid : false,
        message: 'email is required'

    });
} else if(!password) {
    return res.status(400).json({ 
        valid : false,
        message: 'password is required'

    });

}

try {
    // Get the repository for the User entity
    const userRepository = AppDatasource.getRepository(User);

    // Check if the user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({
            message: 'A user with this email already exists',
        });
    }

// try{
//     // Check if the user already exists
//     const existingUser = await User.findOne ({ email });
//     if (existingUser) {
//         return res
//         .status(409)
//         .json({ message: 'A user with this email already exists'});

//     } 
    
    // Hash the password (assuming `hashedPassword` is created somewhere in your code)
    const hashedPassword = await bcrypt.hash(password, 10); // Example: use bcrypt to hash password
     
     // Create a new user
     const newUser = userRepository.create({
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    await userRepository.save(newUser);
    
    // const newUser = new User({
    //     email,
    //     password: hashedPassword,
    // });

    // // Save the user to the database

    // await newUser.save();

    // // Respond with success
    // res.status(201).json({
    //     success: true,
    //     message: 'User signed up successfully',
    //     userId: newUser._id, // Only returning the user's ID
    // });

    // Respond with success
    res.status(201).json({
        success: true,
        message: 'User signed up successfully',
        // userId: newUser._id, //Only returning the user's ID
        userId: newUser, //Only returning the user's ID
    });
    
}
catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({
        success: false,
        message: 'An error occurred during signup. Please try again later.',
    });
}
// res.status(200).json({
//     valid: true,
//     message: 'Valid',
// });
//     res.status(200).json({
//         message: "User signed up sucessfully"
//     })

// }

// const login = (req,res) => {
//     res.status(200).json({
//         message: "User logged in sucessfully"
//     })

// }

// const validation = (req,res) => {
//     res.status(200).json({
//         message: "Ok"
//     })

};



module.exports = {signup}

