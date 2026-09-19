export type ScreenView = 'grid' | 'wars' | 'available';

export type PlotFilter = 'all' | 'claimable' | 'wars' | 'unicorns';

export interface BrandPlot {
  id: string; // e.g. '001-006'
  plotNumbers: number[];
  name: string;
  tagline: string;
  category: 'Titan' | 'Unicorn' | 'Fintech' | 'QuickCommerce' | 'Ecommerce' | 'Consumer' | 'Tech' | 'Claimable';
  status: 'claimed' | 'available' | 'war' | 'locked';
  colSpan: string; // Tailwind grid col span class
  rowSpan?: string;
  bgColor: string; // Tailwind background or hex
  textColor: string;
  borderColor?: string;
  borderDashed?: boolean;
  logoText?: string;
  logoBg?: string;
  badge?: {
    text: string;
    type: 'titan' | 'war' | 'users' | 'locked' | 'bootstrapped' | 'global' | 'bid' | 'ecommerce' | 'instamart' | 'soundbox' | 'club';
  };
  price?: number; // In INR ₹
  currentBid?: number;
  bidCount?: number;
  highestBidder?: string;
  challenger?: string;
  valuation?: string; // e.g. "₹24.8T CAP" or "$5.5B"
  websiteUrl?: string;
  founded?: string;
  founders?: string;
  description?: string;
  lockExpiryDays?: number;
  verified?: boolean;
}

export interface BiddingWar {
  id: string;
  slotId: string;
  title: string;
  defender: {
    name: string;
    logoText: string;
    color: string;
    bid: number;
  };
  challenger: {
    name: string;
    logoText: string;
    color: string;
    bid: number;
  };
  timeLeftSeconds: number;
  totalBids: number;
  category: string;
  story: string;
}

export interface TickerEvent {
  id: string;
  type: 'claim' | 'bid' | 'lock';
  message: string;
  timestamp: string;
  highlight?: boolean;
}
