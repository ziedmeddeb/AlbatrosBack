const Admin=require('../models/admin');
const adminToken=require('../config/token');
const adminService = {
    async login(
        identifiant,
        password
    )
    {
        const admin= await Admin.findOne({identifiant:identifiant});
        if(!admin)
        {
            throw new Error('No admin found');
        }
        if(admin.password!=password)
        {
            throw new Error('Wrong password');
        }
        return {token:adminToken(admin._id)};
    }
}
module.exports=adminService;