import mongoose, { Schema, Document, Model } from 'mongoose';

interface INewsletterSubscriber extends Document {
  email: string;
  subscribedAt?: Date;
  isActive?: boolean;
  unsubscribedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const NewsletterSubscriberSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subscribedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    unsubscribedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const NewsletterSubscriber: Model<INewsletterSubscriber> =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);

export default NewsletterSubscriber;
