const express = require('express');
const router = express.Router();
const ResourceData = require('../models/ResourceData');
const { isDbConnected } = require('../config/db');
const digitalTwin = require('../services/DigitalTwin');
const { Op } = require('sequelize');

// Trigger Simulation Tick on Request (for demo purposes)
// In a real app, this would run on a cron/interval
router.get('/data', async (req, res) => {
  // Advanced Digital Twin Logic
  digitalTwin.tick();
  const rawState = digitalTwin.getSnapshot();
  
  // Transform to frontend format
  const formattedData = rawState.map((zone, idx) => ({
    id: idx + 1,
    zone: zone.id,
    value: Math.max(zone.waterLevel, zone.electricityLoad), // Just a visual aggregate for main chart
    waterVal: zone.waterLevel,
    elecVal: zone.electricityLoad,
    timestamp: zone.lastUpdated
  }));

  if (!isDbConnected()) {
    // Return Digital Twin Data
    return res.json(formattedData);
  }
  
  // If DB connected, we could mix real data, but for now fallback to Twin if empty
  try {
    const data = await ResourceData.findAll({ limit: 5 });
    if (data.length === 0) return res.json(formattedData);
    res.json(data);
  } catch (error) {
    res.json(formattedData);
  }
});

// Scenario Trigger (For "What-If" Analysis)
router.post('/simulate', (req, res) => {
  const { scenario } = req.body; // 'normal', 'leak', 'overload'
  digitalTwin.setScenario(scenario);
  res.json({ message: `Simulation switched to ${scenario}` });
});

// Get Aggregated Stats
router.get('/stats', async (req, res) => {
    // Get live state
    const state = digitalTwin.getSnapshot();
    const totalWater = state.reduce((acc, curr) => acc + curr.waterLevel, 0) * 10; // Scale up
    const totalElec = state.reduce((acc, curr) => acc + curr.electricityLoad, 0) * 5;

  if (!isDbConnected()) {
    return res.json({ water: Math.round(totalWater), electricity: Math.round(totalElec) }); 
  }
  try {
    // DB Logic...
    const dbWater = await ResourceData.sum('value', { where: { type: 'water' } });
    if (!dbWater) return res.json({ water: Math.round(totalWater), electricity: Math.round(totalElec) });
    res.json({ water: dbWater, electricity: 0 });
  } catch (error) {
    res.json({ water: Math.round(totalWater), electricity: Math.round(totalElec) });
  }
});

module.exports = router;
