import AboutUs from '@/components/marketing/about'
import { Metadata } from 'next';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "About Us | Arkin Organics",
  description: "Discover the mission, vision, and story behind Arkin Organics. Learn how we are transforming agriculture with natural fertilizers and sustainable farming solutions.",
};


export default function page() {
  return (
    <AboutUs/>
  )
}
