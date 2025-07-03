// app/actions/newsletter.ts
"use server";

import connectDB from "@/lib/db";
import NewsletterSubscriber from "@/models/newsletterSubscriber";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email")?.toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    await connectDB();

    const existing = await NewsletterSubscriber.findOne({ email });

    if (existing && existing.isActive) {
      return { success: false, message: "You're already subscribed to our newsletter!" };
    }

    if (existing) {
      // Reactivate existing subscription
      existing.isActive = true;
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = null;
      await existing.save();
    } else {
      // Create new subscription
      await NewsletterSubscriber.create({ 
        email,
        isActive: true,
        subscribedAt: new Date()
      });
    }

    return { success: true, message: "Successfully subscribed to our newsletter!" };
  } catch (error) {
    console.error("Subscribe error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

export async function unsubscribeNewsletter(formData: FormData) {
  const email = formData.get("email")?.toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    await connectDB();

    const subscriber = await NewsletterSubscriber.findOne({ email });

    if (!subscriber) {
      return { success: false, message: "This email is not in our newsletter list." };
    }

    if (!subscriber.isActive) {
      return { success: true, message: "You're already unsubscribed from our newsletter." };
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return { success: true, message: "Successfully unsubscribed from our newsletter." };
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

export async function checkSubscriptionStatus(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { subscribed: false };
  }

  try {
    await connectDB();

    const subscriber = await NewsletterSubscriber.findOne({ email });
    
    return { 
      subscribed: subscriber ? subscriber.isActive : false 
    };
  } catch (error) {
    console.error("Check subscription status error:", error);
    return { subscribed: false };
  }
}