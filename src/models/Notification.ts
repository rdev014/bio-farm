import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  user?: mongoose.Types.ObjectId; // Made optional
}

const NotificationSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['order', 'stock', 'delivery', 'promotion', 'customer', 'analytics'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
    read: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    actionRequired: { type: Boolean, default: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Not required now
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
