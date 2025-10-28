import React, { useState } from 'react';
import { User, Theme } from '../types';
import Card from '../components/Card';
import { LogoutIcon, SunIcon, MoonIcon, PencilIcon } from '../components/icons/Icons';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  theme: Omit<Theme, 'colorful'>;
  onToggleTheme: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, theme, onToggleTheme }) => {
  const [upiId, setUpiId] = useState(user.upiId || '');
  const [notifications, setNotifications] = useState({
    examAlerts: true,
    classReminders: true,
    rewardUpdates: false,
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveName = () => {
    // In a real app, you'd call an API to update the user's name.
    // For this demo, we just update the local state and exit edit mode.
    setIsEditingName(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
        <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <Card className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full shadow-lg" />
        <div className="flex-grow">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-2xl font-bold bg-background dark:bg-background-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition flex-shrink-0"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{editedName}</h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition"
                aria-label="Edit name"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          <p className="text-text-secondary dark:text-text-secondary-dark mt-1">Student ID: STU12345</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">UPI Management</h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
          This UPI ID will be used for reward withdrawals.
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="your-upi-id@bank"
            className="flex-grow bg-background dark:bg-background-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition">
            Save
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="examAlerts">Exam Alerts</label>
              <button onClick={() => handleNotificationChange('examAlerts')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.examAlerts ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.examAlerts ? 'translate-x-6' : 'translate-x-1'}`}/>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="classReminders">Class Reminders</label>
              <button onClick={() => handleNotificationChange('classReminders')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.classReminders ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.classReminders ? 'translate-x-6' : 'translate-x-1'}`}/>
              </button>
            </div>
             <div className="flex items-center justify-between">
              <label htmlFor="rewardUpdates">Reward Updates</label>
              <button onClick={() => handleNotificationChange('rewardUpdates')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.rewardUpdates ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.rewardUpdates ? 'translate-x-6' : 'translate-x-1'}`}/>
              </button>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold mb-4">Theme Selection</h3>
          <div className="flex items-center justify-center space-x-4 p-4 rounded-lg bg-background dark:bg-background-dark">
             <span className="font-medium">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
             <button onClick={onToggleTheme} className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                <span className="sr-only">Toggle Theme</span>
                <span className={`inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`}>
                  {theme === 'light' ? <SunIcon className="w-4 h-4 text-yellow-500" /> : <MoonIcon className="w-4 h-4 text-blue-500" />}
                </span>
             </button>
          </div>
        </Card>
      </div>

       <div className="flex justify-center">
            <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
            >
                <LogoutIcon className="w-5 h-5"/>
                <span>Logout</span>
            </button>
        </div>
    </div>
  );
};

export default Profile;