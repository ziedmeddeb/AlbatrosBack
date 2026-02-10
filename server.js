
const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const app=express();

// CORS must be configured before routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}`));
//db config
const db=require('./config/mongoDB').MongoURI;

//connect to mongoDB
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('MongoDB connected...'))
.catch(err=>console.log(err));

//controllers
const userController=require('./controllers/userController');
app.use("/api/users",userController);

const appartementController=require('./controllers/appartementController');
app.use("/api/appartements",appartementController);

const adminController=require('./controllers/adminController');
app.use("/api/admin",adminController);

const imageController=require('./controllers/imageController');
app.use("/api/images",imageController);

const calendrierController=require('./controllers/calendrierController');
app.use("/api/calendrier",calendrierController);

const reservationController=require('./controllers/reserveController');
app.use("/api/reservations",reservationController);

const colabController=require('./controllers/colabController');
app.use("/api/colabs",colabController);

const notificationController=require('./controllers/notificationController');
app.use("/api/notifications",notificationController);