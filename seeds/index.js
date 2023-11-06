const mongoose = require('mongoose'); // Import mongoose here
const CampGround=require("../models/campground")
const cities=require("./cities");
const {places,descriptors}=require("./seedHelpers")
mongoose.connect('mongodb://0.0.0.0:27017/CampGround', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection err: "));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});
const sample=array =>array[Math.floor(array.length*Math.random())];
const seedDB=async()=>{
    await CampGround.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const camp =new CampGround({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)},${sample(places)}`
        })
        await camp.save();
    } 
}
seedDB()
.then(()=>{
    mongoose.connection.close();
})