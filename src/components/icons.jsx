import {
  Car, Egg, ChefHat, Trophy, Hotel, Droplets, Truck, Armchair, House, Glasses, Pizza, HardHat,
  Gift, Warehouse, Scale, FolderOpen, Building2, Stethoscope, Calculator, Fingerprint, Package,
  Receipt, Wrench, Leaf, Plane, GraduationCap, Building, Smile, Store, Users, Smartphone, Pill,
  BookOpen, Dumbbell, Tag, CalendarCheck, QrCode, Ticket, Monitor, HandCoins, Utensils, Hammer,
  Shirt, Boxes, Library, ShoppingCart, CalendarClock, FileText, BedDouble, Laptop, FlaskConical,
  Croissant, Hospital, Scissors, PawPrint, Coffee, Wine, Sparkles, Sandwich, Gem, Footprints,
} from 'lucide-react'
import { RUBRO_ICONS } from './Rubros.jsx'

// Glifo oficial de WhatsApp (Simple Icons, dominio público CC0). Peso ≈ 1 kB.
export function WhatsAppIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Icono específico por solución (n.º del catálogo). Si falta, se usa el del rubro.
const BY_ID = {
  1: Car, 2: Egg, 3: ChefHat, 4: Trophy, 5: Hotel, 6: Droplets, 7: Truck, 8: Armchair, 9: House,
  10: Glasses, 11: Pizza, 12: HardHat, 13: Gift, 14: Warehouse, 15: Scale, 16: FolderOpen,
  17: Building2, 18: Stethoscope, 19: Calculator, 20: Fingerprint, 21: Package, 22: Receipt,
  23: Wrench, 24: Leaf, 25: Plane, 26: GraduationCap, 27: Building, 28: Smile, 29: Store,
  30: Users, 31: Users, 32: Smartphone, 33: GraduationCap, 34: Pill, 35: Wrench, 36: BookOpen,
  37: Dumbbell, 38: Tag, 39: CalendarCheck, 40: QrCode, 41: Ticket, 42: Monitor, 43: HandCoins,
  44: Utensils, 45: Hammer, 46: Shirt, 47: Boxes, 48: Library, 49: ShoppingCart, 50: Pill,
  51: CalendarClock, 52: FileText, 53: BedDouble, 54: Laptop, 55: FlaskConical, 56: Croissant,
  57: Utensils, 58: CalendarCheck, 59: GraduationCap, 60: Pill, 61: Hospital, 62: BookOpen,
  63: Hammer, 64: Dumbbell, 65: Hotel, 66: Store, 67: Smile, 68: HandCoins, 69: Utensils,
  70: Wrench, 71: Scissors, 72: Tag, 73: Boxes, 74: PawPrint, 75: Coffee, 76: Wine,
  77: Sparkles, 78: Sandwich, 79: Gem, 80: Store, 81: Croissant, 82: BookOpen, 83: Scissors,
  84: Footprints, 85: Hotel,
}

export const productIcon = (product) => BY_ID[product.id] || RUBRO_ICONS[product.rubro]
