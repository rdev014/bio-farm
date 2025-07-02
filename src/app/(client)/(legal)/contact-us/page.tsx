import ContactPage from "@/components/General/Contact";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Contact Us | Arkin Fertilizers",
  description:
    "Get in touch with Arkin Fertilizers for product inquiries, bulk orders, distributor partnerships, or customer support. We're committed to promoting sustainable agriculture through organic solutions.",
};


export default function page() {
  return (
    <div>
      <ContactPage />
    </div>
  );
}
