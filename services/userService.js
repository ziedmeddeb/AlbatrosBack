const User=require('../models/user');
const userToken=require('../config/token');
const userService = {
    async getAllUsers() {
        const users= await User.find();
        if(!users)
        {
            throw new Error('No users found');
        }
        return users;
    },
    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if(!user)
        {
            throw new Error('No user found');
        }
        return user;
    },
    async createUser(
        firstName,
        lastName,
        email,
        password
    ) {
        const user = await User.findOne({ email: email });
         if (user) {
         throw new Error('User already exists');
                }
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            joinedDate: Date.now()

        });
        if(!newUser)
        {
            throw new Error('Error creating user');
        }
         await newUser.save();
         return {token:userToken(newUser._id)};
    },
    async updateUser(
        id,
        data
    ) {
        const user=await User.findById(id).select('-password');
        if(!user)
        {
            throw new Error('No user found');
        }
        user.firstName=data.firstName;
        user.lastName=data.lastName;
        user.email=data.email;
        
        return await user.save();

    },
    async deleteUser(id) {
        const user = await User.findById(id);
        if(!user)
        {
            throw new Error('No user found');
        }
        await User.findByIdAndDelete(id);
        return user;
    },
    async login(
        email,
        password
    )
    {
        
        const user= await User.findOne({email:email});
        if (!user)
        {
            throw new Error('No user found');
        }
        if(user.password!=password)
        {
            throw new Error('Wrong password');
        }
        else{return {user,token: userToken(user._id)};}
        

    },
    async changerMotdePasse(id,data)
    {
        const user= await User.findById(id);
        if (!user)
        {
            throw new Error('No user found');
        }
        if(user.password!=data.oldPassword)
        {
            throw new Error('Wrong password');
        }
        user.password=data.newPassword;
        
        await user.save();
        return user;

    }
   

    


}
module.exports= userService;