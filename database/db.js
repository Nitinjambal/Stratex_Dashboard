import mongoose from "mongoose";

const dataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      dbName: "usersDetail",
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("error:", error);
  }
};
export default dataBase;
