const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/trackingDB")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  name: String,
  department: String,
});
const User = mongoose.model("User", userSchema);

async function seedDatabase() {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create sample users
    const sampleUsers = [
      {
        username: "student1",
        password: "pass123",
        role: "user",
        name: "Juan Dela Cruz",
        department: "Computer Science",
      },
      {
        username: "admin1",
        password: "admin123",
        role: "admin",
        name: "Admin User",
        department: "Administration",
      },
      {
        username: "semiadmin1",
        password: "semi123",
        role: "semi-admin",
        name: "Semi Admin",
        department: "Computer Science",
      },
    ];

    await User.insertMany(sampleUsers);
    console.log("✓ Database seeded with sample users!");
    console.log("\nTest Credentials:");
    console.log("Student: username=student1, password=pass123");
    console.log("Admin: username=admin1, password=admin123");
    console.log("Semi-Admin: username=semiadmin1, password=semi123");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
