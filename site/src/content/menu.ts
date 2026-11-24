// Editable menu model. Only verified items are entered here.
// Prices, ingredients, allergens and dietary classes must come from KAMARI.
export type MenuCategory = "small plates" | "mains" | "desserts" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price?: string; // only when verified
  dietary?: string[]; // only when verified
  image?: string; // key into media.images
  available: boolean;
}

// Empty until KAMARI supplies the verified menu. The Savour page then shows a curated showcase.
export const menu: MenuItem[] = [];
export const menuDownloadUrl: string | null = null;
