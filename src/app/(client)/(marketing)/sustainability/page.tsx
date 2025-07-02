import Sustainability from '@/components/General/Sustainability'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Sustainability | Arkin Fertilizers",
  description:
    "Learn how Arkin Fertilizers promotes sustainability through organic practices, eco-friendly production, zero-waste packaging, and regenerative agriculture for a healthier planet.",
};

export default function page() {
  return (
    <div>
      <Sustainability/>
    </div>
  )
}
