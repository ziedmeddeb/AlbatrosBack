const reserve=require('../models/reserve');

const reserveService={

    async createReserve(appartement,user,date,cin,region,ntel,firstName,lastName,remarque,status){
        const resrv=await reserve.create({
            appartement,
            user,
            firstName,
            lastName,
            date,
            cin,
            region,
            ntel,
            remarque,
            status
        });
        if(!resrv)
        {
            throw new Error('Error creating reserve');
        }
        
        await resrv.save();
        return resrv;
    },
    async getReserveByApartId(id){
        const resrv=await reserve.find({appartement:id});
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        return resrv;
    },
    async getReserveByApartIdAndDate(id,date){
        const resrv=await reserve.find({appartement:id,date:date});
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        return resrv;
    },
    async updateReservStatus(id,status){
        const resrv=await reserve.findById(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        resrv.status=status;
        await resrv.save();
        return resrv;
    },
    async annulerReserv(id){
        const resrv=await reserve.findById(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        resrv.status="annulé";
        await resrv.save();
        return resrv;
    },
    async getReserveByDate(date){
        const reservs=await reserve.find({date:date,status:"confirmé"});
        if(!reservs)
        {
            throw new Error('No reserve found');
        }
        return reservs;
    },

};
module.exports = reserveService;



