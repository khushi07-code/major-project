const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {  // updated key name to correct the spelling
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  listingtype: {
    type: String,
    default: "job"
  },
  openings: {
    type: Number,
    default: 1
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  salaryRange: {
    min: { type: Number },
    max: { type: Number }
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract"],
    default: "Full-time"
  },
  applicationDeadline: {
    type: Date
  },
  owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
  },
});

const Job= mongoose.model('job', jobSchema);

module.exports =Job;


