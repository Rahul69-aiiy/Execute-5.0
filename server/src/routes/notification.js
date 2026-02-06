const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticateToken } = require('./auth');

// Get all notifications for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { isRead, limit = 20, type, severity } = req.query;

    const where = {
      [require('sequelize').Op.or]: [
        { userId: req.user.id },
        { userId: null } // Global notifications
      ]
    };

    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    if (type) {
      where.type = type;
    }

    if (severity) {
      where.severity = severity;
    }

    const notifications = await Notification.findAll({
      where,
      limit: parseInt(limit),
      order: [
        ['severity', 'DESC'], // Critical first
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
});

// Get unread count
router.get('/unread-count', authenticateToken, async (req, res) => {
  try {
    const count = await Notification.count({
      where: {
        isRead: false,
        [require('sequelize').Op.or]: [
          { userId: req.user.id },
          { userId: null }
        ]
      }
    });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Mark all notifications as read
router.post('/mark-all-read', authenticateToken, async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      {
        where: {
          isRead: false,
          [require('sequelize').Op.or]: [
            { userId: req.user.id },
            { userId: null }
          ]
        }
      }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create notification (protected - for system use)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      type,
      category,
      title,
      message,
      severity,
      userId,
      metadata,
      actionUrl,
      expiresAt
    } = req.body;

    // Validate required fields
    if (!type || !title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Type, title, and message are required'
      });
    }

    const notification = await Notification.create({
      type,
      category: category || 'general',
      title,
      message,
      severity: severity || 'low',
      userId,
      metadata,
      actionUrl,
      expiresAt
    });

    res.status(201).json({
      success: true,
      notification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating notification'
    });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.destroy();

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
