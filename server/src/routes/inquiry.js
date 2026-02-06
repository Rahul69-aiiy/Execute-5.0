const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { authenticateToken } = require('./auth');

// Create new inquiry (public endpoint)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      organizationName,
      facilityType,
      message,
      preferredMeetingDate
    } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required'
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      organizationName,
      facilityType,
      message,
      preferredMeetingDate,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you soon!',
      inquiry: {
        id: inquiry.id,
        name: inquiry.name,
        status: inquiry.status
      }
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting inquiry'
    });
  }
});

// Get all inquiries (protected - admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    const where = {};
    if (status) {
      where.status = status;
    }

    const inquiries = await Inquiry.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      total: inquiries.count,
      inquiries: inquiries.rows
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching inquiries'
    });
  }
});

// Get single inquiry by ID (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      inquiry
    });
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching inquiry'
    });
  }
});

// Update inquiry status (protected)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, meetingScheduledAt, notes } = req.body;

    const inquiry = await Inquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Update fields
    if (status) inquiry.status = status;
    if (meetingScheduledAt) inquiry.meetingScheduledAt = meetingScheduledAt;
    if (notes) inquiry.notes = notes;

    await inquiry.save();

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating inquiry'
    });
  }
});

// Delete inquiry (protected - admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    await inquiry.destroy();

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting inquiry'
    });
  }
});

module.exports = router;
