const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

class DigitalTwinService {
  /**
   * Get optimization prediction from ML model
   * @param {Object} data - The simulation data
   * @returns {Promise<Object>} - Prediction result
   */
  async getPrediction(data) {
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/predict`, data);
      return response.data;
    } catch (error) {






        
      console.error('Error connecting to ML Service:', error.message);
      // Fallback or rethrow depending on requirements. 
      // For now, rethrowing with a clear message.
      if (error.code === 'ECONNREFUSED') {
          throw new Error('ML Service is not reachable. Is it running?');
      }
      throw error;
    }
  }

  /**
   * Simulate a "what-if" scenario based on simplified logic + ML prediction
   * This combines physics-based heuristics with the ML model
   */
  async simulateScenario(params) {
    const { 
        temperature_setpoint, 
        occupancy_percentage, 
        area_id = "A101",
        time_slot = "Afternoon" 
    } = params;

    // 1. Calculate Base Loads (Heuristic)
    // Assume base load at 24C is 100%
    // each degree increase reduces cooling load by ~5%
    const base_energy_kwh = 180; 
    const temp_diff = temperature_setpoint - 24; 
    const energy_factor = 1 - (temp_diff * 0.06); // Heuristic
    
    // Occupancy affects water usage more linearly
    const base_water_liters = 1200;
    const occupancy_factor = occupancy_percentage / 75; // normalized to baseline of 75%

    const simulated_energy = base_energy_kwh * energy_factor * (0.8 + 0.2 * (occupancy_percentage/100));
    const simulated_water = base_water_liters * occupancy_factor;

    // 2. Prepare data for ML Model
    const ml_input = {
        "Area_ID": area_id,
        "Electricity_kWh": simulated_energy,
        "Water_Liters": simulated_water,
        "Temp": 30.0, // External temp
        "Population": 4200,
        "DayOfWeek": 3, // Wednesday
        "Month": 6,
        "Weekend": 0,
        "TimeSlot": time_slot
    };

    // 3. Get ML Prediction of "Optimization Status"
    let ml_result = { is_optimized: false, probability: 0.5 };
    try {
        ml_result = await this.getPrediction(ml_input);
    } catch (e) {
        console.warn("ML Service unavailable, proceeding with heuristics only.");
    }

    return {
        inputs: params,
        simulated_metrics: {
            energy_kwh: Math.round(simulated_energy * 100) / 100,
            water_liters: Math.round(simulated_water * 100) / 100,
            cost_estimate: Math.round((simulated_energy * 0.12 + simulated_water * 0.005) * 100) / 100
        },
        optimization_analysis: ml_result
    };
  }
}

module.exports = new DigitalTwinService();
