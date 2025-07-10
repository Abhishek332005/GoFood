const mongoose = require('mongoose');

const db_url = `mongodb+srv://Manishcluster:manishsharma54@manishcluster.ie7ge.mongodb.net/goFoodMern`;

const mongoDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("✅ MongoDB connected successfully!");

    console.log("Connected to DB:", mongoose.connection.name);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Available collections:", collections.map(c => c.name));

    // Fetch from 'foodItems'
    const foodCollection = await mongoose.connection.db.collection("foodItems");
    const foodItems = await foodCollection.find({}).toArray();

    // ✅ Fetch from 'foodCategory'
    const categoryCollection = await mongoose.connection.db.collection("foodCategory");
    const foodCategory = await categoryCollection.find({}).toArray();

    if (foodItems.length === 0) {
      console.log("⚠️ No data found in 'foodItems' collection.");
    } else {
      global.foodItems = foodItems;
     // console.log("🍽️ Sample food item:", global.foodItems);
    }

    if (foodCategory.length === 0) {
      console.log("⚠️ No data found in 'foodCategory' collection.");
    } else {
      global.foodCategory = foodCategory;
     // console.log("📚 Sample food category:", global.foodCategory);
    }

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

module.exports = mongoDB;
