class DigitalTwinService {
    constructor() {
        this.zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
        // Initial State (fallback)
        this.state = this.zones.map(zone => ({
            id: zone,
            waterLevel: 50, // 0-100
            electricityLoad: 40, // 0-100
            status: 'Optimal',
            lastUpdated: new Date()
        }));
        
        this.scenario = 'normal'; // normal, leak, overload
        this.pythonApiUrl = 'http://localhost:8000';
        
        // Import axios dynamically if needed or assume it's available global/require
        try {
            this.axios = require('axios');
        } catch (e) {
            console.error("Axios not found, simulation will fail silently");
        }
    }

    // Call Python RL Agent
    async tick() {
        try {
            // We'll just update one global state for now as the Python model is simple
            // In a full version, we'd send per-zone data
            const response = await this.axios.post(`${this.pythonApiUrl}/step`, {
                action: null // Let agent decide
            });

            const { state, action_taken, reward } = response.data;

            // Update all zones with some noise to make them look distinct
            this.state = this.state.map(zone => {
                // Add some random variation per zone so they aren't identical
                const noise = () => Math.random() * 5 - 2.5;
                
                return {
                    ...zone,
                    waterLevel: Math.max(0, Math.min(100, state.water_level + noise())),
                    electricityLoad: Math.max(0, Math.min(100, state.electricity_load + noise())),
                    lastUpdated: new Date(),
                    // Store RL info for frontend if needed
                    rl_action: action_taken,
                    rl_reward: reward
                };
            });

        } catch (error) {
            console.error("Failed to fetch from ML Service:", error.message);
            // Fallback to simple logic if Python is down
            this._fallbackTick();
        }

        return this.state;
    }

    _fallbackTick() {
         this.state = this.state.map(zone => {
            let waterChange = (Math.random() * 4 - 2); 
            let elecChange = (Math.random() * 4 - 2); 
            return {
                ...zone,
                waterLevel: Math.max(0, Math.min(100, zone.waterLevel + waterChange)),
                electricityLoad: Math.max(0, Math.min(100, zone.electricityLoad + elecChange)),
                lastUpdated: new Date()
            };
        });
    }

    setScenario(type) {
        this.scenario = type;
        console.log(`[Digital Twin] Scenario set to: ${type}`);
        // Ideally tell Python API about this too
    }

    getSnapshot() {
        return this.state;
    }
}

// Singleton
const digitalTwin = new DigitalTwinService();

module.exports = digitalTwin;
