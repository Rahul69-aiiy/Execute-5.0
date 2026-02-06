import React, { useState } from 'react';
import { User, Lock, Bell, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    critical: true,
    reports: false
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Here you would normally make an API call
  };

  const handleSavePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
          <p className="text-slate-600">Manage your profile and preferences</p>
        </motion.div>
      </div>

      {/* Success Message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 text-green-700"
        >
          <Check className="w-5 h-5" />
          <span className="font-semibold">Changes saved successfully!</span>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-slate-200 p-8"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Profile Details</h2>
              <p className="text-sm text-slate-500">Your personal information</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                placeholder="your@email.com"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-slate-200 p-8"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
              <p className="text-sm text-slate-500">Keep your account secure</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                placeholder="Enter current password"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                  placeholder="New password"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all text-slate-900"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSavePassword}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Save size={18} />
                Update Password
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border-2 border-slate-200 p-8"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
              <p className="text-sm text-slate-500">Manage how you receive updates</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'email',
                label: 'Email Notifications',
                description: 'Get updates about your account via email'
              },
              {
                key: 'critical',
                label: 'Critical Alerts',
                description: 'Important system alerts and warnings'
              },
              {
                key: 'reports',
                label: 'Weekly Reports',
                description: 'Receive weekly performance summaries'
              }
            ].map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{setting.label}</h3>
                  <p className="text-sm text-slate-600">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[setting.key]}
                    onChange={() => setNotifications(prev => ({
                      ...prev,
                      [setting.key]: !prev[setting.key]
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-red-900 mb-2">Delete Account</h2>
          <p className="text-sm text-red-700 mb-6">
            This action cannot be undone. All your data, settings, and history will be permanently removed from our servers.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
            Delete My Account
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
