import React from 'react';

export default function ReturnsPage() {
  return (
    <div className="bg-green-50 text-green-900 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-800">Returns & Refunds</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Our Guarantee</h2>
          <p>
            At Arkin Organics, customer satisfaction is our priority. If you&#39;re not satisfied with your purchase,
            we&#39;re here to help with a fair and simple return policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Return Window</h2>
          <p>
            Returns are accepted within 30 days of purchase. Items must be unused and in their original packaging to
            qualify for a full refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">How to Return</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Email us at <a href="mailto:returns@arkinorganics.com" className="text-green-600 underline">returns@arkinorganics.com</a> with your order number.</li>
            <li>We will send you a return authorization and shipping instructions.</li>
            <li>Package your items securely and ship them back using the provided label.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Refunds</h2>
          <p>
            Once we receive your return and inspect the items, we will issue a refund to your original payment method.
            Refunds typically take 5–7 business days to process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Non-Returnable Items</h2>
          <p>
            Perishable items or opened bags of fertilizer are not eligible for return. Please contact us if your order
            arrived damaged or defective.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Need Help?</h2>
          <p>
            Questions about returns or refunds? Contact us at <a href="mailto:support@arkinorganics.com" className="text-green-600 underline">support@arkinorganics.com</a>. We&#39;re happy to assist!
          </p>
        </section>
      </div>
    </div>
  );
}
