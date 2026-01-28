// types/navigation.ts
export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}