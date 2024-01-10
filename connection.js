const mongoose = require('mongoose');

//8JBxSTMgeu5FVo4M

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://abhinavshyjupc:8JBxSTMgeu5FVo4M@cluster0.pk5qken.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

module.exports = connectDB;
