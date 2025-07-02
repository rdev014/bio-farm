import FaqPage from '@/components/General/Faq'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata= {
  metadataBase: new URL(process.env.APP_URL!),
  title: "FAQs | Help & Support – Arkin Fertilizers",
  description:
    "Find quick answers to common questions about Arkin Fertilizers, including product usage, certifications, shipping, bulk orders, and sustainable farming support.",
};

export default function page() {
  return (
    <div>
      <FaqPage />
    </div>
  )
}
