import { 
  Briefcase, 
  Car, 
  Heart, 
  PiggyBank, 
  ShoppingCart, 
  Ticket, 
  Gift, 
  Utensils, 
  Tag, 
  Home, 
  Dumbbell, 
  Book, 
  FileText 
} from 'lucide-react';

export const CATEGORY_ICONS = [
  { icon: Briefcase, name: 'briefcase' },
  { icon: Car, name: 'car' },
  { icon: Heart, name: 'heart' },
  { icon: PiggyBank, name: 'piggy-bank' },
  { icon: ShoppingCart, name: 'shopping-cart' },
  { icon: Ticket, name: 'ticket' },
  { icon: Gift, name: 'gift' },
  { icon: Utensils, name: 'utensils' },
  { icon: Tag, name: 'tag' },
  { icon: Home, name: 'home' },
  { icon: Dumbbell, name: 'dumbbell' },
  { icon: Book, name: 'book' },
  { icon: FileText, name: 'file-text' },
] as const;

export const CATEGORY_COLORS = [
  { name: 'green', bg: 'bg-green-base', text: 'text-green-base', light: 'bg-green-light/20' },
  { name: 'blue', bg: 'bg-blue-base', text: 'text-blue-base', light: 'bg-blue-light/20' },
  { name: 'purple', bg: 'bg-purple-base', text: 'text-purple-base', light: 'bg-purple-light/20' },
  { name: 'pink', bg: 'bg-pink-base', text: 'text-pink-base', light: 'bg-pink-light/20' },
  { name: 'red', bg: 'bg-red-base', text: 'text-red-base', light: 'bg-red-light/20' },
  { name: 'orange', bg: 'bg-orange-base', text: 'text-orange-base', light: 'bg-orange-light/20' },
  { name: 'yellow', bg: 'bg-yellow-base', text: 'text-yellow-base', light: 'bg-yellow-light/20' },
] as const;

export function getCategoryIcon(name : string | undefined) {
  return CATEGORY_ICONS.find(i => i.name === name)?.icon || Tag;
}

export function getCategoryColor(name : string | undefined) {
  return CATEGORY_COLORS.find(c => c.name === name) || CATEGORY_COLORS[0];
}
