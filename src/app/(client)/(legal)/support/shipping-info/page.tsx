import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Shipping Information | Arkin Organics",
  description: "Get detailed information about our shipping policies, delivery timelines, coverage areas, and handling procedures at Arkin Organics.",
};

export default function ShippingInfo() {
  return (
    <div className="bg-green-50 text-green-900 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-800">Shipping Information</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Our Commitment</h2>
          <p>
            At Arkin Organics, we are committed to delivering our high-quality organic fertilizers in a timely and
            environmentally responsible manner. Every shipment is handled with care to ensure your products arrive fresh
            and ready for use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Shipping Options</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Standard Shipping (5–7 business days)</li>
            <li>Expedited Shipping (2–3 business days)</li>
            <li>Local Delivery for Bulk Orders (Available in select regions)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Processing Times</h2>
          <p>
            Orders are typically processed within 1–2 business days. You will receive a confirmation email with tracking
            information once your order has been shipped.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on the weight of your order and destination. Orders over $100
            qualify for free standard shipping.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">International Shipping</h2>
          <p>
            Currently, we only ship within the United States. We are working to expand our reach and hope to serve
            international customers soon.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Need Help?</h2>
          <p>
            If you have any questions about your order or shipping options, feel free to contact our customer service
            team at <a href="mailto:support@arkinorganics.com" className="text-green-600 underline">support@arkinorganics.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
