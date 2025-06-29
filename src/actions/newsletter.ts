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
