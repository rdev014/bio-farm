import { BookOpen, HelpCircle, Package, Users } from "lucide-react";

export const nav = [
  {
    name: "Products",
    icon: Package,
    singlelink: "/products"
  },
  {
    name: "About",
    icon: Users,
    links: [
      { href: "/about-us", label: "Our Story" },
      { href: "/our-farms", label: "Our Farms" },
      { href: "/sustainability", label: "Sustainability" },
    ]
  },
  {
    name: "Resources",
    icon: BookOpen,
    links: [
      { href: "/blogs", label: "Blogs" },
    ]
  },
  {
    name: "Support",
    icon: HelpCircle,
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/contact-us", label: "Contact-Us" },
      { href: "/support/shipping-info", label: "Shipping Info" },
      { href: "/support/returns", label: "Returns" }
    ]
  }
]