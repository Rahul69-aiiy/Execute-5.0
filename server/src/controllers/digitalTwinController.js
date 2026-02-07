const digitalTwinService = require('../services/digitalTwinService');

const runSimulation = async (req, res) => {
  try {
    const { temperature, occupancy } = req.body;
    
    if (temperature === undefined || occupancy === undefined) {
        return res.status(400).json({ error: "Missing required parameters: temperature, occupancy" });
    }

    const result = await digitalTwinService.simulateScenario({
        temperature_setpoint: parseFloat(temperature),
        occupancy_percentage: parseFloat(occupancy)
    });

    res.json(result);
  } catch (error) {
    console.error('Simulation Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  runSimulation
};
