const calender=require('../models/calendrier');
const calenderService = {
    async getCalenderByApartId(id) {
        const cals= await calender.findOne({appartement:id});
        if(!cals)
        {
            throw new Error('No calenders found');
        }
        return cals;
    },
    async getCalenderById(id) {
        const cal=await calender.findById(id);
        if(!cal)
        {
            throw new Error('No calender found');
        }
        return cal;
    },
    async createCalender(
        appartement
        
    ) {
        let availabilit=[];
        
            availabilit.push({
                dateDeb:new Date(2024,5,16),
                dateFin:new Date(2024,5,23),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,5,23),
                dateFin:new Date(2024,5,30),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,5,30),
                dateFin:new Date(2024,6,7),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,6,7),
                dateFin:new Date(2024,6,14),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,6,14),
                dateFin:new Date(2024,6,21),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,6,21),
                dateFin:new Date(2024,6,28),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,6,28),
                dateFin:new Date(2024,7,4),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,7,4),
                dateFin:new Date(2024,7,11),
                price:0,
                available:true,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,7,11),
                dateFin:new Date(2024,7,18),
                price:0,
                available:true,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,7,18),
                dateFin:new Date(2024,7,25),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,7,25),
                dateFin:new Date(2024,8,1),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2024,8,1),
                dateFin:new Date(2024,8,8),
                available:true,
                price:0,
                status:"disponible"
            });
            const cal=await calender.create({
                appartement,
                availabilities:availabilit});
            if(!cal)
            {
                throw new Error('Error creating calender');
            }
            await cal.save();
            return cal;
        },
        async updateCalender(
            id,
            data
        ) {
            const cal=await calender.findById(id);
            if(!cal)
            {
                throw new Error('No calender found');
            }
            
            cal.availabilities=data.availabilities;
            await cal.save();
            return cal;
        },
        async updateCalenderBydate(idApart,idDate,status,persId,role,nom)
        {
            const cal=await calender.findOne({appartement:idApart});
            
            if(!cal)
            {
                throw new Error('No calender found');
            }
            
            cal.availabilities.forEach(element => {
                if(element._id==idDate)
                {
                    element.available=false;
                    element.status=status;
                    element.persId=persId;
                    element.role=role;
                    element.nom=nom;
                    
                }
            }
            );
            await cal.save();
           
            return cal;
        },
        async updateCalenderBydate2(idApart,idDate,status)
        {
            const cal=await calender.findOne({appartement:idApart});
            
            if(!cal)
            {
                throw new Error('No calender found');
            }
            cal.availabilities.forEach(element => {
                if(element._id==idDate)
                {
                    element.available=true;
                    element.status=status;
                    element.persId="";
                    element.role="";
                    element.nom="";
                    
                }
            }
            );
            await cal.save();
           
            return cal;


        }
    }
module.exports = calenderService;
