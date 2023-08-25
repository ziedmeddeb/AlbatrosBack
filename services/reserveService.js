const reserve=require('../models/reserve');
const notificationService=require('../services/notificationService');


const reserveService={

    async createReserve(appartement,user,date,cin,region,ntel,firstName,lastName,remarque,status,nom,code){
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
            nom,
            code
        });
        if(!resrv)
        {
            throw new Error('Error creating reserve');
        }
       
        const currentDate = new Date(date);
        const numberOfDaysToAdd = 7;
        
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
        
        // Options for formatting the date
        const options = {  month: 'long', day: 'numeric' };
        
        // Display the dates in French
        const currentFrenchDate = currentDate.toLocaleDateString('fr-FR', options);
        const futureFrenchDate = futureDate.toLocaleDateString('fr-FR', options);
        
        console.log("Date actuelle:", currentFrenchDate);
        console.log("Date future:", futureFrenchDate);

        notificationService.sendNotificationAdmin("Reservation pour "+code+" pour la date "+currentFrenchDate+" - "+futureFrenchDate);
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



