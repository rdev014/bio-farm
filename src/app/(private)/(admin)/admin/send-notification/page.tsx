'use client';
import React, { useState } from 'react';
import { createNotification } from '@/actions/notification';
import { 
  Bell, 
  Package, 
  AlertTriangle, 
  Truck, 
  Tag, 
  Users, 
  TrendingUp, 
  Send,
  Check,
  AlertCircle,
  X
} from 'lucide-react';

// Define the plain TypeScript interface for the form data
interface NotificationFormData {
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  read: boolean;
}

const NotificationForm: React.FC = () => {
  const [formData, setFormData] = useState<NotificationFormData>({
    type: 'order',
    title: '',
    message: '',
    priority: 'low',
    actionRequired: false,
    read: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notificationTypes = [
    { value: 'order', label: 'Order', icon: Package, color: 'text-blue-500' },
    { value: 'stock', label: 'Stock Alert', icon: AlertTriangle, color: 'text-orange-500' },
    { value: 'delivery', label: 'Delivery', icon: Truck, color: 'text-green-500' },
    { value: 'promotion', label: 'Promotion', icon: Tag, color: 'text-purple-500' },
    { value: 'customer', label: 'Customer', icon: Users, color: 'text-indigo-500' },
    { value: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'text-emerald-500' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-700' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    // Use the plain form data directly
    const notificationData: NotificationFormData = {
      type: formData.type,
      title: formData.title,
      message: formData.message,
      priority: formData.priority,
      actionRequired: formData.actionRequired,
      read: formData.read,
    };

    try {
      const result = await createNotification(notificationData);
      if (result.success && result.data) {
        setSuccess('Notification created successfully!');
        setFormData({
          type: 'order',
          title: '',
          message: '',
          priority: 'low',
          actionRequired: false,
          read: false,
        });
      } else {
        setError(result.error || 'Failed to create notification');
      }
    } catch (err) {
      console.log(err);
      
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedTypeIcon = () => {
    const selected = notificationTypes.find(type => type.value === formData.type);
    if (selected) {
      const Icon = selected.icon;
      return <Icon size={20} className={selected.color} />;
    }
    return <Bell size={20} className="text-gray-500" />;
  };



  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <Bell className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create Notification</h2>
            <p className="text-green-100 mt-1">Send important updates to your team</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notification Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Notification Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {notificationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.type === type.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon size={20} className={type.color} />
                    <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    {formData.type === type.value && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <Check size={12} />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Notification Title
            </label>
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter a clear, descriptive title"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {getSelectedTypeIcon()}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message Content
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Provide detailed information about this notification..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priorityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.priority === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={formData.priority === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}>
                    {option.label}
                  </span>
                  {formData.priority === option.value && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  id="actionRequired"
                  name="actionRequired"
                  type="checkbox"
                  checked={formData.actionRequired}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Action Required</span>
                  <p className="text-xs text-gray-500">Mark this notification as requiring immediate action</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  id="read"
                  name="read"
                  type="checkbox"
                  checked={formData.read}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Mark as Read</span>
                  <p className="text-xs text-gray-500">Create this notification in read state</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Creating...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Notification
              </>
            )}
          </button>

          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
              <Check size={20} className="text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-700">{success}</p>
              <button
                onClick={() => setSuccess(null)}
                className="ml-auto text-green-500 hover:text-green-700"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;