export interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: 'user' | 'admin' | 'moderator'|'guest';
}

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  image?: string;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  links?: NavLink[];
  singlelink?:string;
}