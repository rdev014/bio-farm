import OurFarms from '@/components/General/OurFarm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Our Farms | Arkin Fertilizers",
  description:
    "Explore the farms behind Arkin Fertilizers. See how we practice organic farming, test our products in real-world conditions, and support healthy soil ecosystems across India.",
};

export default function page() {
  return (
    <div>
      <OurFarms/>
    </div>
  )
}
