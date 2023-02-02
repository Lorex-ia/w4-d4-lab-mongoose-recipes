// const mongoose = require("mongoose");

// //ADD THIS to avoid issues => Strict query
// mongoose.set("strictQuery", true);

// // Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require("./models/Recipe.model");

// // Import of the data from './data.json'
// const data = require("./data");

// const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// // Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then((x) => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     const recipe = {
//       title: "Omelette",
//       level: "UltraPro Chef",
//       ingredients: ["eggs", "salt", "pepper", "milk", "onions"],
//       cuisine: "french",
//       dishType: "breakfast",
//       duration: 20,
//       creator: "Fabrizio",
//     };
//     Recipe.create(recipe)
//       .then((rec) => {
//         console.log("Here's your recipe", rec);
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });

//     //Iteration3 - inserting recipes
    
//     Recipe.insertMany(data)
//       .then((arr) => {
//         console.log("Here's your array", arr);
//       })
//       .then(() => {
//         //Iteration 4 - update recipe
//         Recipe.findOneAndUpdate(
//           { title: "Rigatoni alla Genovese" },
//           { duration: 100 },
//           { new: true }
//         )
//           .then((upd) => {
//             console.log("Here's your update", upd);
//           })
//           .catch((err) => {
//             console.log("Error", err);
//           });
//       })

//       // Carrot cake deletion
//       .then(() => {
//         Recipe.deleteOne({ title: "Carrot Cake" })
//           .then((del) => {
//             console.log("You've deleted", del);

//             return mongoose.connection.close()
//           })
//           .then(()=>{
//             console.log('Connection closed')
//           })
//           .catch((err) => {
//             console.log("Error", err);
//           });
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   })

//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   })


  //closing the database
  // .finally(() => {

  // });

  const mongoose = require("mongoose");

  //ADD THIS to avoid issues => Strict query
  mongoose.set("strictQuery", true);
  
  // Import of the model Recipe from './models/Recipe.model.js'
  const Recipe = require("./models/Recipe.model");
  
  // Import of the data from './data.json'
  const data = require("./data");
  
  const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";
  
  // Defining my recipe
  const omelette = {
    title: "Omelette",
    level: "UltraPro Chef",
    ingredients: ["eggs", "salt", "pepper", "milk", "onions"],
    cuisine: "french",
    dishType: "breakfast",
    duration: 20,
    creator: "Fabrizio",
  };
  
  // Connection to the database "recipe-app"
  mongoose
    .connect(MONGODB_URI)
    .then((x) => {
      console.log(`-- Connected to the database: "${
  x.connection.name
  }"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany();
    })
    .then(() => {
      // Iteration 2 - Create a recipe
      console.log("-- Creating my custom recipe");
      return Recipe.create(omelette);
    })
    // Iteration 3 - Insert multiple recipes
    .then(() => {
      console.log("-- Inserting recipes from JSON");
      return Recipe.insertMany(data);
    })
    // Iteration 4 - Update recipe
    .then(() => {
      console.log("-- Updating Rigatoni");
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
    })
    // Iteration 5 - Remove a recipe
    .then(() => {
      return Recipe.deleteOne({ title: "Carrot Cake" });
    })
    .catch((error) => {
      console.error("Error connecting to the database", error);
    })
    .finally(() => {
      // Iteration 6 - Close the Database
      console.log("-- Disconnecting from DB");
      return mongoose.disconnect();
    }); 