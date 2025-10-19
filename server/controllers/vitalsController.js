import Vitals from '../models/vitalsModel.js'; 


export const addVitals = async (req, res) => {
  const { date, bloodPressure, bloodSugar, weight, notes } = req.body;

  const vitals = new Vitals({
    user: req.user._id,
    date,
    bloodPressure,
    bloodSugar,
    weight,
    notes,
  });

  try {
    const createdVitals = await vitals.save();
    res.status(201).json(createdVitals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find({ user: req.user._id }).sort({ date: -1 });
    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};