import Report from '../models/reportModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper: Download file from Cloudinary URL and convert to Gemini format
async function urlToGenerativePart(url, mimeType) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
}


export const uploadReport = async (req, res) => {
  try {
    const { reportName, reportDate } = req.body;
    const file = req.file; // Cloudinary middleware se aayega

    if (!file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // 1) Prepare Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const imagePart = await urlToGenerativePart(file.path, file.mimetype);

    // 2 Strong structured prompt for JSON output
    const prompt = `
You are an expert medical report analyst. Analyze the uploaded report image (lab report or medical document).

Return your analysis **strictly as valid JSON only**, with no markdown, explanations, or extra text.

The JSON must follow this exact structure:
{
  "summary": "A simple and clear English summary (2-3 lines).",
  "romanUrduSummary": "Same summary translated in Roman Urdu.",
  "abnormalValues": [
    { "parameter": "WBC", "value": "15.0", "remark": "High" }
  ],
  "doctorQuestions": [
    "What is causing this abnormal result?",
    "Do I need further testing?",
    "Should I change my diet or medication?"
  ],
  "foodSuggestions": "List healthy food recommendations or avoid list.",
  "homeRemedies": "List of simple safe home remedies, if any."
}

Important instructions:
- Output must be valid JSON parsable by JSON.parse().
- Do not include any markdown (** or \`\`\`) or text before/after JSON.
`;

    // 3 Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // 4 Parse response safely
    let aiData;
    try {
      const cleanText = text.replace(/```json|```/g, '').trim();
      aiData = JSON.parse(cleanText);
    } catch (err) {
      console.error(' Gemini response was not valid JSON:\n', text);
      return res.status(500).json({ message: 'Error parsing AI response' });
    }

    // 5 Save to MongoDB
    const report = new Report({
      user: req.user._id,
      reportName,
      reportDate,
      filePath: file.path, // Cloudinary URL
      fileMimeType: file.mimetype,
      aiSummary: aiData.summary,
      aiRomanUrduSummary: aiData.romanUrduSummary,
      aiAbnormalValues: aiData.abnormalValues,
      aiDoctorQuestions: aiData.doctorQuestions,
      aiFoodSuggestions: aiData.foodSuggestions,
      aiHomeRemedies: aiData.homeRemedies,
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);

  } catch (error) {
    console.error('🚨 Error in uploadReport:', error);
    res.status(500).json({ message: 'Server error during report analysis' });
  }
};

// Get all reports for timeline
export const getTimeline = async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ reportDate: -1 });
  res.json(reports);
};

//     Get single report by ID
export const getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (report && report.user.toString() === req.user._id.toString()) {
    res.json(report);
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
};
