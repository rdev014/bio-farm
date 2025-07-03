'use server';
import { revalidatePath } from 'next/cache';
import connectDb from '@/lib/db';
import Notification from '@/models/Notification';

// Define a plain TypeScript interface for notification input
interface NotificationInput {
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  read: boolean;
}

// Interface for plain notification output
export interface NotificationOutput {
  _id: string;
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  read: boolean;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export async function getNotifications(): Promise<{ success: boolean; data?: NotificationOutput[]; error?: string }> {
  try {
    await connectDb();
    const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
    const mappedNotifications: NotificationOutput[] = notifications.map((n: unknown) => {
      const notif = n as {
        _id: { toString: () => string };
        type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
        title: string;
        message: string;
        priority: 'low' | 'medium' | 'high';
        actionRequired?: boolean;
        read?: boolean;
        time: string;
        createdAt: Date | string;
        updatedAt: Date | string;
      };
      return {
        _id: notif._id.toString(),
        type: notif.type,
        title: notif.title,
        message: notif.message,
        priority: notif.priority,
        actionRequired: notif.actionRequired ?? false,
        read: notif.read ?? false,
        time: notif.time,
        createdAt: notif.createdAt instanceof Date ? notif.createdAt.toISOString() : notif.createdAt,
        updatedAt: notif.updatedAt instanceof Date ? notif.updatedAt.toISOString() : notif.updatedAt,
      };
    });
    return { success: true, data: mappedNotifications };
  } catch (error) {
    console.error("Notification error:", error);
    return { success: false, error: 'Failed to fetch notifications' };
  }
}

export async function createNotification(data: NotificationInput): Promise<{ success: boolean; data?: NotificationOutput; error?: string }> {
  try {
    await connectDb();
    const notification = new Notification({
      ...data,
      time: new Date().toISOString(),
    });
    await notification.save();
    const plainNotification = notification.toObject();
    const notificationOutput: NotificationOutput = {
      _id: plainNotification._id.toString(),
      type: plainNotification.type as 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics',
      title: plainNotification.title,
      message: plainNotification.message,
      priority: plainNotification.priority as 'low' | 'medium' | 'high',
      actionRequired: plainNotification.actionRequired ?? false,
      read: plainNotification.read ?? false,
      time: plainNotification.time,
      createdAt: plainNotification.createdAt instanceof Date ? plainNotification.createdAt.toISOString() : plainNotification.createdAt,
      updatedAt: plainNotification.updatedAt instanceof Date ? plainNotification.updatedAt.toISOString() : plainNotification.updatedAt,
    };
    revalidatePath('/notifications');
    return { success: true, data: notificationOutput };
  } catch (error) {
    console.error("Notification error:", error);
    return { success: false, error: 'Failed to create notification' };
  }
}

export async function toggleNotificationRead(id: string): Promise<{ success: boolean; data?: NotificationOutput; error?: string }> {
  try {
    await connectDb();
    const notification = await Notification.findById(id);
    if (!notification) {
      return { success: false, error: 'Notification not found' };
    }
    notification.read = !notification.read;
    await notification.save();
    const plainNotification = notification.toObject();
    const notificationOutput: NotificationOutput = {
      _id: plainNotification._id.toString(),
      type: plainNotification.type as 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics',
      title: plainNotification.title,
      message: plainNotification.message,
      priority: plainNotification.priority as 'low' | 'medium' | 'high',
      actionRequired: plainNotification.actionRequired ?? false,
      read: plainNotification.read ?? false,
      time: plainNotification.time,
      createdAt: plainNotification.createdAt instanceof Date ? plainNotification.createdAt.toISOString() : plainNotification.createdAt,
      updatedAt: plainNotification.updatedAt instanceof Date ? plainNotification.updatedAt.toISOString() : plainNotification.updatedAt,
    };
    revalidatePath('/notifications');
    return { success: true, data: notificationOutput };
  } catch (error) {
    console.error("Notification error:", error);
    return { success: false, error: 'Failed to toggle read status' };
  }
}

export async function dismissNotification(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDb();
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return { success: false, error: 'Notification not found' };
    }
    revalidatePath('/notifications');
    return { success: true };
  } catch (error) {
    console.error("Notification error:", error);
    return { success: false, error: 'Failed to dismiss notification' };
  }
}

export async function markAllAsRead(): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDb();
    await Notification.updateMany({}, { read: true });
    revalidatePath('/notifications');
    return { success: true };
  } catch (error) {
    console.error("Notification error:", error);
    return { success: false, error: 'Failed to mark all as read' };
  }
}