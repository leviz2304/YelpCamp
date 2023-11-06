const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Import mongoose here
const CampGround=require("./models/campground")
mongoose.connect('mongodb://0.0.0.0:27017/CampGround', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection err: "));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
app.get("/home",(req,res)=>{
    res.render("home");
})
app.get('/Campground',async(req,res)=>{
    const camp=await CampGround.find({});
    res.render('campgrounds/index',{camp});
})
app.get('/campground/:id',async(req,res)=>{
    const find=await CampGround.findById(req.params.id);
    res.render('campgrounds/Show',{find});
})
// app.get("/",async(req, res) => {
//     const camp = new CampGround({
//         title: 'Căn hộ biển Đà Nẵng',
//         description: 'Căn hộ phòng ốc thoải mái với tầm nhìn biển tuyệt đẹp.',
//         price: 1200,
//         location: 'Đà Nẵng, Việt Nam',
//     });
//     await camp.save()
//     res.send(camp);
// });
