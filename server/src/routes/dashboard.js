const express = require('express');
const router = express.Router();
const ResourceData = require('../models/ResourceData');
const { isDbConnected } = require('../config/db');
const digitalTwin = require('../services/DigitalTwin');
const { Op } = require('sequelize');
const { sequelize } = require('../config/db');

// Get real-time dashboard data
router.get('/data', async (req, res) => {
  // Advanced Digital Twin Logic
  digitalTwin.tick();
  const rawState = digitalTwin.getSnapshot();

  // Transform to frontend format
  const formattedData = rawState.map((zone, idx) => ({
    id: idx + 1,
    zone: zone.id,
    value: Math.max(zone.waterLevel, zone.electricityLoad),
    waterVal: zone.waterLevel,
    elecVal: zone.electricityLoad,
    timestamp: zone.lastUpdated
  }));

  if (!isDbConnected()) {
    return res.json(formattedData);
  }

  try {
    const data = await ResourceData.findAll({
      limit: 10,
      order: [['timestamp', 'DESC']]
    });
    if (data.length === 0) return res.json(formattedData);
    res.json(data);
  } catch (error) {
    res.json(formattedData);
  }
});

// Get weekly energy data (for charts)
router.get('/weekly-energy', async (req, res) => {
  try {
    if (!isDbConnected()) {
      // Return mock data
      return res.json({
        success: true,
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          actual: [450, 520, 480, 550, 600, 580, 620],
          forecast: [460, 530, 490, 540, 590, 570, 610]
        }
      });
    }

    // Get last 7 days of electricity data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const data = await ResourceData.findAll({
      where: {
        type: 'electricity',
        timestamp: {
          [Op.gte]: sevenDaysAgo
        }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('timestamp')), 'date'],
        [sequelize.fn('SUM', sequelize.col('value')), 'total']
      ],
      group: [sequelize.fn('DATE', sequelize.col('timestamp'))],
      order: [[sequelize.fn('DATE', sequelize.col('timestamp')), 'ASC']]
    });

    // Format for frontend
    const labels = data.map(d => {
      const date = new Date(d.dataValues.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    const actual = data.map(d => Math.round(d.dataValues.total));

    // Generate forecast (simple: +2% of actual)
    const forecast = actual.map(val => Math.round(val * 1.02));

    res.json({
      success: true,
      data: { labels, actual, forecast }
    });
  } catch (error) {
    console.error('Weekly energy error:', error);
    res.status(500).json({ success: false, message: 'Error fetching weekly energy data' });
  }
});

// Get weekly water data
router.get('/weekly-water', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          actual: [5000, 5200, 4900, 5100, 5300, 6000, 5800],
          forecast: [5050, 5100, 4850, 5000, 5200, 5900, 5700]
        }
      });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const data = await ResourceData.findAll({
      where: {
        type: 'water',
        timestamp: {
          [Op.gte]: sevenDaysAgo
        }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('timestamp')), 'date'],
        [sequelize.fn('SUM', sequelize.col('value')), 'total']
      ],
      group: [sequelize.fn('DATE', sequelize.col('timestamp'))],
      order: [[sequelize.fn('DATE', sequelize.col('timestamp')), 'ASC']]
    });

    const labels = data.map(d => {
      const date = new Date(d.dataValues.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    const actual = data.map(d => Math.round(d.dataValues.total));
    const forecast = actual.map(val => Math.round(val * 0.98));

    res.json({
      success: true,
      data: { labels, actual, forecast }
    });
  } catch (error) {
    console.error('Weekly water error:', error);
    res.status(500).json({ success: false, message: 'Error fetching weekly water data' });
  }
});

// Scenario Trigger (For "What-If" Analysis)
router.post('/simulate', (req, res) => {
  const { scenario } = req.body;
  digitalTwin.setScenario(scenario);
  res.json({ message: `Simulation switched to ${scenario}` });
});

// Get Aggregated Stats
router.get('/stats', async (req, res) => {
  const state = digitalTwin.getSnapshot();
  const totalWater = state.reduce((acc, curr) => acc + curr.waterLevel, 0) * 10;
  const totalElec = state.reduce((acc, curr) => acc + curr.electricityLoad, 0) * 5;

  if (!isDbConnected()) {
    return res.json({
      water: Math.round(totalWater),
      electricity: Math.round(totalElec),
      sustainabilityScore: 87,
      alerts: 2
    });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [waterSum, elecSum] = await Promise.all([
      ResourceData.sum('value', {
        where: {
          type: 'water',
          timestamp: { [Op.gte]: today }
        }
      }),
      ResourceData.sum('value', {
        where: {
          type: 'electricity',
          timestamp: { [Op.gte]: today }
        }
      })
    ]);

    res.json({
      water: Math.round(waterSum || totalWater),
      electricity: Math.round(elecSum || totalElec),
      sustainabilityScore: 87,
      alerts: 2
    });
  } catch (error) {
    res.json({
      water: Math.round(totalWater),
      electricity: Math.round(totalElec),
      sustainabilityScore: 87,
      alerts: 2
    });
  }
});

// Get dashboard alerts/notifications
router.get('/alerts', async (req, res) => {
  try {
    const alerts = [
      {
        id: 1,
        type: 'critical',
        title: 'Anomaly Detected',
        message: 'Unusual spike in HVAC consumption in Block B.',
        timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        timeAgo: '14 MINS AGO',
        color: 'rose',
        icon: 'alert'
      },
      {
        id: 2,
        type: 'suggestion',
        title: 'Solar Optimization',
        message: 'High generation period. Suggest shifting pump operations.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        timeAgo: '45 MINS AGO',
        color: 'amber',
        icon: 'sun',
        actionable: true
      },
      {
        id: 3,
        type: 'info',
        title: 'Daily Report Ready',
        message: 'Yesterday\'s carbon footprint report is available.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        timeAgo: '2 HOURS AGO',
        color: 'slate',
        icon: 'leaf'
      }
    ];

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching alerts' });
  }
});

// Get water analytics data
router.get('/water-analytics', async (req, res) => {
  try {
    const data = {
      pumpSchedule: [
        { name: 'Main Tank Pump', time: '03:00 AM', status: 'scheduled' },
        { name: 'Hostel B Pump', time: '05:30 AM', status: 'scheduled' }
      ],
      rainwater: {
        predicted: 1200,
        currentLevel: 60,
        unit: 'L'
      },
      leakDetection: {
        probability: 89,
        zone: 'Zone C',
        description: 'Abnormal night-time flow detected'
      },
      reuseStats: {
        recycled: 15000,
        recycledChange: 12,
        gardeningUsage: 80,
        monthlySavings: 450
      }
    };

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching water analytics' });
  }
});

// Get electricity analytics data
router.get('/electricity-analytics', async (req, res) => {
  try {
    const data = {
      hvac: {
        temperature: 24,
        status: 'Optimized',
        savingsPercent: 15,
        progress: 67
      },
      loadShifting: [
        { equipment: 'Heavy Machinery', scheduledTime: '22:00 PM' },
        { equipment: 'Water Pumps', scheduledTime: '03:00 AM' }
      ],
      renewable: {
        solarPercentage: 45,
        description: 'of load on Solar',
        detail: 'Reducing grid dependency 12PM - 4PM'
      },
      anomaly: {
        location: 'Hostel Block B',
        severity: 'high',
        description: 'Sudden spike of 200kW detected at 14:30. Possible HVAC malfunction.',
        timestamp: '14:30'
      },
      hourlyData: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        actual: [120, 100, 250, 480, 500, 350, 200],
        forecast: [120, 100, 250, 480, 450, 320, 180]
      }
    };

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching electricity analytics' });
  }
});

// Get waste operations data
router.get('/waste-operations', async (req, res) => {
  try {
    const data = {
      weeklyGeneration: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        actual: [120, 110, 130, 115, 140, 180, 160],
        forecast: [118, 112, 128, 120, 145, 175, 155]
      },
      binStatus: [
        {
          location: 'Mess Hall A',
          level: 85,
          status: 'high',
          urgency: 'HIGH VOL'
        },
        {
          location: 'Hostel Block C',
          level: 30,
          status: 'normal',
          urgency: 'NORMAL'
        }
      ],
      recommendation: 'Route Truck #2 to Mess Hall A immediately. Delay Hostel C collection.',
      aiRecommendations: [
        {
          id: 1,
          priority: 'high',
          title: 'Grid Stress Predicted Tomorrow',
          description: 'High probability of peak load exceeding threshold at 2 PM.',
          action: 'Auto-Schedule Load Shedding',
          actionType: 'auto',
          status: 'active'
        },
        {
          id: 2,
          priority: 'medium',
          title: 'Water Conservation Mode',
          description: 'Rainwater tanks are full. Switch landscape irrigation source?',
          action: 'Approve',
          actionType: 'manual',
          status: 'pending'
        }
      ],
      communityScore: {
        grade: 'A+',
        topBuilding: 'Library Block',
        rankings: [60, 100, 80]
      }
    };

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching waste operations data' });
  }
});

module.exports = router;
