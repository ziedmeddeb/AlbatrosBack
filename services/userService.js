const User=require('../models/user');
const userToken=require('../config/token');
const userService = {
    async getAllUsers() {
        try{const users= await User.find();
            if(!users)
            {
                throw new Error('No users found');
            }
            return users;}
            catch(err)
            {
                console.log(err);
            }
        
    },
    async getUserById(id) {
        try{const user = await User.findById(id).select('-password');
        if(!user)
        {
            throw new Error('No user found');
        }
        return user;}
        catch(err)
        {
            console.log(err);
        }
        
    },
    async createUser(
        firstName,
        lastName,
        email,
        password,
        ntel,
        role
    ) {
        try{
        const user = await User.findOne({ email: email });
         if (user) {
         throw new Error('User already exists');
                }
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            ntel,
            joinedDate: Date.now(),
            role

        });
        if(!newUser)
        {
            throw new Error('Error creating user');
        }
         await newUser.save();
         return {token:userToken(newUser._id)};
    }
    catch(err)
    {
        console.log(err);
    }
    },
    async updateUser(
        id,
        data
    ) {
        try{
        const user=await User.findById(id).select('-password');
        if(!user)
        {
            throw new Error('No user found');
        }
        user.firstName=data.firstName;
        user.lastName=data.lastName;
        user.email=data.email;
        user.ntel=data.ntel;
        
        return await user.save();
    }
    catch(err)
    {
        console.log(err);
    }

    },
    async deleteUser(id) {
        try{
        const user = await User.findById(id);
        if(!user)
        {
            throw new Error('No user found');
        }
        await User.findByIdAndDelete(id);
        return user;
    }catch(err)
    {
        console.log(err);
    }
    },
    async login(
        email,
        password
    )
    {
        try{
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
    }catch(err)
    {
        console.log(err);
    }

    },
    async changerMotdePasse(id,data)
    {
        try{
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
    }catch(err)
    {
        console.log(err);
    }

    }
   

    


}
module.exports= userService;