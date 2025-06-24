import { BookOpen, HelpCircle,  Package, Users } from "lucide-react";

export const nav =  [

    {
      name: "Products",
      icon: Package,
      links: [
        { href: "/products", label: "All Products" },
        { href: "/seasonal-products", label: "Seasonal Products" },
        { href: "/organic-certified", label: "Organic Certified" },
        { href: "/bulk-orders", label: "Bulk Orders" }
      ]
    },
    {
      name: "About",
      icon: Users,
      links: [
        { href: "/about-us", label: "Our Story" },
        { href: "/our-farms", label: "Our Farms" },
        { href: "/sustainability", label: "Sustainability" },
        { href: "/certifications", label: "Certifications" }
      ]
    },
    {
      name: "Resources",
      icon: BookOpen,
      links: [
        { href: "/blogs", label: "Blogs" },
        { href: "/growing-guides", label: "Growing Guides" },
        { href: "/nutrition", label: "Nutrition Info" }
      ]
    },
    {
      name: "Support",
      icon: HelpCircle,
      links: [
        { href: "/help", label: "Help Center" },
        { href: "/contact", label: "Contact Us" },
        { href: "/shipping", label: "Shipping Info" },
        { href: "/returns", label: "Returns" }
      ]
    }
  ]