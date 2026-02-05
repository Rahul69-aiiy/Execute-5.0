const { sequelize } = require('./config/db');
const ResourceData = require('./models/ResourceData');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database Synced');

    const waterData = [];
    const electricData = [];

    // Generate last 30 days of data
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Mock Water Data (Liters)
        waterData.push({
            type: 'water',
            value: Math.floor(Math.random() * 500) + 100, // 100-600 Liters
            unit: 'liters',
            zone_id: 'Zone-A',
            timestamp: date
        });

        // Mock Electricity Data (kWh)
        electricData.push({
            type: 'electricity',
            value: Math.floor(Math.random() * 50) + 10, // 10-60 kWh
            unit: 'kWh',
            zone_id: 'Zone-A',
            timestamp: date
        });
    }

    await ResourceData.bulkCreate([...waterData, ...electricData]);
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
