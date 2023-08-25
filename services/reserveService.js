const reserve=require('../models/reserve');
const notificationService=require('../services/notificationService');
const appartementService=require('../services/appartementService');

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
        const appart=await appartementService.getApartById(appartement);
        const currentDate = date;
        const numberOfDaysToAdd = 7;
        
        // Calculate milliseconds for the given number of days
        const millisecondsInADay = 24 * 60 * 60 * 1000; // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        const futureDateMilliseconds = currentDate.getTime() + (numberOfDaysToAdd * millisecondsInADay);
        
        // Create a new Date object with the calculated milliseconds
        const futureDate = new Date(futureDateMilliseconds);
        
        console.log("Current Date:", currentDate.toDateString());
        console.log("Future Date:", futureDate.toDateString());

        notificationService.sendNotificationAdmin("Reservation pour "+appart.code+" pour la date "+currentDate+" - "+futureDate);
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



