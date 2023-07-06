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
                dateDeb:new Date(2023,5,18),
                dateFin:new Date(2023,5,25),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,5,25),
                dateFin:new Date(2023,6,2),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,6,2),
                dateFin:new Date(2023,6,9),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,6,9),
                dateFin:new Date(2023,6,16),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,6,16),
                dateFin:new Date(2023,6,23),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,6,23),
                dateFin:new Date(2023,6,30),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,7,30),
                dateFin:new Date(2023,7,6),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,7,6),
                dateFin:new Date(2023,7,13),
                price:0,
                available:true,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,7,13),
                dateFin:new Date(2023,7,20),
                price:0,
                available:true,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,7,20),
                dateFin:new Date(2023,7,27),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,7,27),
                dateFin:new Date(2023,8,3),
                available:true,
                price:0,
                status:"disponible"
            });
            availabilit.push({
                dateDeb:new Date(2023,8,3),
                dateFin:new Date(2023,8,10),
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
