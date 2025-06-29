// app/actions/newsletter.ts
'use server';


import connectDB from '@/lib/db';
import NewsletterSubscriber from '@/models/newsletterSubscriber';


export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email')?.toString().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return;
    }

    await connectDB();

    const exists = await NewsletterSubscriber.findOne({ email });
    if (exists) {
        return { success: false, message: 'Already Subscribed!' };
    }
    if (!exists) {
        await NewsletterSubscriber.create({ email });
    }

    return { success: true, message: 'Subscribed successfully!' };
}
export async function unsubscribeNewsletter(formData: FormData) {
  const email = formData.get('email')?.toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email address.' };
  }

  await connectDB();

  const subscriber = await NewsletterSubscriber.findOne({ email });

  if (!subscriber) {
    return { success: false, message: 'Email not found in our list.' };
  }

  if (!subscriber.isActive) {
    return { success: true, message: 'You are already unsubscribed.' };
  }

  subscriber.isActive = false;
  subscriber.unsubscribedAt = new Date();
  await subscriber.save();

  return { success: true, message: 'You have been unsubscribed successfully.' };
}