import {
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Landmark,
  Layers,
  MessageCircle,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  Webhook,
} from 'lucide-react';

const ICONS = {
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Landmark,
  MessageCircle,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  Webhook,
};

export function GroupIcon({ name, size = 18 }) {
  const Icon = ICONS[name] ?? Layers;
  return <Icon size={size} aria-hidden="true" strokeWidth={2} />;
}
