import mongoose from 'mongoose';

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reportName: {
      type: String,
      required: true,
    },
    reportDate: {
      type: Date,
      required: true,
    },
    filePath: {
      type: String, // Path to the file stored by Multer
      required: true,
    },
    fileMimeType: {
      type: String,
      required: true,
    },
    // AI Insights
    aiSummary: {
      type: String,
      default: '',
    },
    aiRomanUrduSummary: {
      type: String,
      default: '',
    },
    aiAbnormalValues: [
      {
        parameter: String,
        value: String,
        remark: String,
      },
    ],
    aiDoctorQuestions: {
      type: [String],
      default: [],
    },
    aiFoodSuggestions: {
      type: String,
      default: '',
    },
    aiHomeRemedies: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;