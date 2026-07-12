const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const getCoordinates = require("../utils/geocoder");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() =>{
    console.log("Connected to DB");
  })
  .catch((err) =>{
    console.log(err);
  });
  
async function main(){
    await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({
//       ...obj,
//       owner: "6a4c9aa4f848f432b8308201",
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

const initDB = async () => {
    await Listing.deleteMany({});

    const listings = [];

    for (let obj of initData.data) {

        const address = `${obj.location}, ${obj.country}`;
      try{
        const coords = await getCoordinates(address);

        obj.owner = "6a4c9aa4f848f432b8308201";

        obj.geometry = {
            type: "Point",
            coordinates: [
                coords.lon,
                coords.lat
            ]
        };
      }catch (err) {

        console.log(`Skipping ${address}`);

        obj.geometry = {
          type: "Point",
          coordinates: []
        };
     }

      listings.push(obj);
    }

    await Listing.insertMany(listings);

    console.log("Data was initialized");
};

initDB();
