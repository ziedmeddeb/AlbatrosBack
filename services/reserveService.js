const reserve=require('../models/reserve');
const notificationService=require('../services/notificationService');


const reserveService={

    async createReserve(appartement,user,date,dateRes,ntel,firstName,lastName,remarque,status,nom,code){
        try{
        const resrv=await reserve.create({
            appartement,
            user,
            firstName,
            lastName,
            date,
            dateRes,
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

        await notificationService.sendNotificationAdmin("Reservation pour "+code+" pour la date "+currentFrenchDate+" - "+futureFrenchDate);
        await resrv.save();

        return resrv;
    }catch(err)
    {
        console.log(err);
    }
    },
    async getReserveByApartId(id){
        try{
        const resrv=await reserve.find({appartement:id});
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        return resrv;}
        catch(err)
        {
            console.log(err);
        }
    },
    async getReserveByApartIdAndDate(id,date){
        try{
        const resrv=await reserve.find({appartement:id,date:date});
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        return resrv;
    }catch(err)
    {
        console.log(err);
    }
    },
    async updateReserv(id,resv){
        try{
        const resrv=await reserve.findById(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        resrv.firstName = resv.firstName;
  resrv.lastName = resv.lastName;
  resrv.ntel = resv.ntel;
  resrv.dateRes = resrv.dateRes;
  resrv.status = resv.status;
  resrv.remarque = resv.remarque;
        await resrv.save();
        return resrv;
    }catch(err)
    {
        console.log(err);
    }
    },
    async annulerReserv(id){
        try{
        const resrv=await reserve.findByIdAndDelete(id);
        if(!resrv)
        {
            throw new Error('No reserve found');
        }
        
        return resrv;
    }catch(err)
    {
        console.log(err);
    }
    },
    async getReserveByDate(date){
        try{
        const reservs=await reserve.find({date:date,status: { $in: ["En cours", "Amicale","Payé","Avance"] }});
        if(!reservs)
        {
            throw new Error('No reserve found');
        }
        return reservs;
    }catch(err)
    {
        console.log(err);
    }
    },

};
module.exports = reserveService;



