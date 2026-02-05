class DigitalTwinService {
    constructor() {
        this.zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
        // Initial State
        this.state = this.zones.map(zone => ({
            id: zone,
            waterLevel: 50, // 0-100
            electricityLoad: 40, // 0-100
            status: 'Optimal',
            lastUpdated: new Date()
        }));
        
        this.scenario = 'normal'; // normal, leak, overload
    }

    // Simulate extensive "Physics" (Simplified)
    tick() {
        const timeFactor = this._getTimeFactor();
        
        this.state = this.state.map(zone => {
            let waterChange = (Math.random() * 4 - 2); // Natural fluctuation
            let elecChange = (Math.random() * 4 - 2); 

            // Scenario Logic
            if (this.scenario === 'leak' && zone.id === 'Zone D') {
                waterChange += 15; // Massive leak
            }
            if (this.scenario === 'overload' && zone.id === 'Zone B') {
                elecChange += 20; // Grid strain
            }

            // Time Logic (High usage in morning/evening)
            if (timeFactor > 1.2) {
                waterChange += 2;
                elecChange += 3;
            }

            // Update Values with Clamping
            let newWater = Math.max(0, Math.min(100, zone.waterLevel + waterChange));
            let newElec = Math.max(0, Math.min(100, zone.electricityLoad + elecChange));

            return {
                ...zone,
                waterLevel: parseFloat(newWater.toFixed(2)),
                electricityLoad: parseFloat(newElec.toFixed(2)),
                lastUpdated: new Date()
            };
        });

        return this.state;
    }

    setScenario(type) {
        this.scenario = type;
        console.log(`[Digital Twin] Scenario set to: ${type}`);
    }

    getSnapshot() {
        return this.state;
    }

    _getTimeFactor() {
        const hour = new Date().getHours();
        // Peak hours: 8-10 AM, 6-9 PM
        if ((hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 21)) {
            return 1.5;
        }
        return 1.0;
    }
}

// Singleton
const digitalTwin = new DigitalTwinService();

module.exports = digitalTwin;
