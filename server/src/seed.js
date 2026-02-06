const { sequelize, connectDB } = require('./config/db');
const User = require('./models/User');
const Notification = require('./models/Notification');
const ResourceData = require('./models/ResourceData');
const Inquiry = require('./models/Inquiry');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ force: true }); // WARNING: This will drop existing tables
    console.log('✅ Database synced');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@greengrid.ai',
      password: 'admin123', // Will be hashed automatically
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true
    });
    console.log('✅ Admin user created (email: admin@greengrid.ai, password: admin123)');

    // Create facility manager
    const manager = await User.create({
      username: 'manager',
      email: 'manager@greengrid.ai',
      password: 'manager123',
      role: 'facility_manager',
      firstName: 'Facility',
      lastName: 'Manager',
      isActive: true
    });
    console.log('✅ Facility manager created (email: manager@greengrid.ai, password: manager123)');

    // Create operator
    const operator = await User.create({
      username: 'operator',
      email: 'operator@greengrid.ai',
      password: 'operator123',
      role: 'operator',
      firstName: 'System',
      lastName: 'Operator',
      isActive: true
    });
    console.log('✅ Operator created (email: operator@greengrid.ai, password: operator123)');

    // Create sample notifications
    const notifications = [
      {
        type: 'anomaly',
        category: 'electricity',
        title: 'HVAC Consumption Spike',
        message: 'Unusual spike detected in Block B HVAC system. 23% above baseline. Possible cooling inefficiency.',
        severity: 'critical',
        userId: null, // Global notification
        metadata: { zone: 'Block B', increase: '23%', baseline: '450 kWh' }
      },
      {
        type: 'insight',
        category: 'electricity',
        title: 'Solar Optimization Available',
        message: 'Peak solar generation predicted at 2:30 PM. Recommend deferring 3 heavy loads to maximize green energy usage.',
        severity: 'medium',
        userId: null,
        metadata: { solarPeak: '2:30 PM', loads: 3 }
      },
      {
        type: 'log',
        category: 'system',
        title: 'Daily Report Ready',
        message: 'Energy & Water analytics report for Jan 6 is ready for review.',
        severity: 'low',
        userId: admin.id
      },
      {
        type: 'urgent',
        category: 'water',
        title: 'Leak Detected - Zone C',
        message: 'High probability (89%) leak detected in Zone C water pipeline. Immediate inspection recommended.',
        severity: 'critical',
        userId: null,
        metadata: { zone: 'Zone C', probability: '89%' }
      },
      {
        type: 'emergency',
        category: 'electricity',
        title: 'Grid Overload Warning',
        message: 'Campus electricity load approaching 95% capacity. Consider load shedding or backup generator activation.',
        severity: 'critical',
        userId: null,
        metadata: { loadPercentage: '95%' }
      },
      {
        type: 'insight',
        category: 'water',
        title: 'Rainwater Harvesting Opportunity',
        message: 'Heavy rainfall predicted tomorrow. Expected collection: 1,200L. Ensure tanks have capacity.',
        severity: 'medium',
        userId: null,
        metadata: { expectedCollection: '1200L' }
      },
      {
        type: 'log',
        category: 'waste',
        title: 'Waste Collection Scheduled',
        message: 'Scheduled waste collection for Mess Hall A at 6:00 AM tomorrow. Bin capacity: 85%.',
        severity: 'low',
        userId: null,
        metadata: { location: 'Mess Hall A', capacity: '85%', time: '6:00 AM' }
      }
    ];

    for (const notif of notifications) {
      await Notification.create(notif);
    }
    console.log(`✅ ${notifications.length} notifications created`);

    // Create sample resource data (last 7 days)
    const now = new Date();
    const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const date = new Date(now);
      date.setDate(date.getDate() - dayOffset);

      for (const zone of zones) {
        // Water data
        const waterValue = 800 + Math.random() * 400; // 800-1200 liters
        await ResourceData.create({
          type: 'water',
          value: waterValue,
          unit: 'liters',
          zone_id: zone,
          timestamp: date
        });

        // Electricity data
        const elecValue = 80 + Math.random() * 60; // 80-140 kWh
        await ResourceData.create({
          type: 'electricity',
          value: elecValue,
          unit: 'kWh',
          zone_id: zone,
          timestamp: date
        });
      }
    }
    console.log('✅ Resource data created for last 7 days across 5 zones');

    // Create sample inquiries
    const inquiries = [
      {
        name: 'John Smith',
        email: 'john.smith@university.edu',
        phone: '+1-555-0123',
        organizationName: 'State University',
        facilityType: 'Educational Campus',
        message: 'Interested in implementing GreenGrid AI for our 50-acre campus with 15 buildings.',
        status: 'pending'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@techcorp.com',
        phone: '+1-555-0456',
        organizationName: 'TechCorp Industries',
        facilityType: 'Corporate Office',
        message: 'Looking for sustainability solutions for our manufacturing facility.',
        status: 'contacted'
      },
      {
        name: 'Michael Chen',
        email: 'mchen@hospital.org',
        phone: '+1-555-0789',
        organizationName: 'City General Hospital',
        facilityType: 'Healthcare',
        message: 'Need urgent help with energy management and cost reduction.',
        status: 'meeting_scheduled',
        meetingScheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      }
    ];

    for (const inquiry of inquiries) {
      await Inquiry.create(inquiry);
    }
    console.log(`✅ ${inquiries.length} sample inquiries created`);

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log('   - Users: 3 (admin, manager, operator)');
    console.log('   - Notifications: 7');
    console.log('   - Resource Data: 70 records (7 days × 5 zones × 2 types)');
    console.log('   - Inquiries: 3');
    console.log('\n🔐 Login Credentials:');
    console.log('   Admin: admin@greengrid.ai / admin123');
    console.log('   Manager: manager@greengrid.ai / manager123');
    console.log('   Operator: operator@greengrid.ai / operator123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
