const reserve=require('../models/reserve');
const notificationService=require('../services/notificationService');

const reserveService={

    async createReserve(appartement,user,date,cin,region,ntel,firstName,lastName,remarque,status,nom){
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
            status,
            nom
        });
        if(!resrv)
        {
            throw new Error('Error creating reserve');
        }

        notificationService.sendNotificationAdmin("Reservation pour "+appartement);
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
    async updateReserv(id,resv){
        const resrv=await reserve.findById(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        resrv.firstName = resv.firstName;
  resrv.lastName = resv.lastName;
  resrv.cin = resv.cin;
  resrv.ntel = resv.ntel;
  resrv.region = resv.region;
  resrv.status = resv.status;
  resrv.remarque = resv.remarque;
        await resrv.save();
        return resrv;
    },
    async annulerReserv(id){
        const resrv=await reserve.findByIdAndDelete(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        
        return resrv;
    },
    async getReserveByDate(date){
        const reservs=await reserve.find({date:date,status: { $in: ["En cours", "Amicale","Payé","Avance"] }});
        if(!reservs)
        {
            throw new Error('No reserve found');
        }
        return reservs;
    },

};
module.exports = reserveService;



