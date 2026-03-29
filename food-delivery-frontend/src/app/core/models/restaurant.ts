export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  address?: string;
  city?: string;
  deliveryFee?: number;
  minOrderAmount?: number;
  rating?: number;
  isActive?: boolean;
}
