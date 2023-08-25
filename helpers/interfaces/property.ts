export interface ReservationAvailabilityData {
  checkinDate: string;
  checkoutDate: string;
  listingId: number;
  guestCount: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  currency: string;
}

export interface Price {
  name: string;
  title: string;
  isIncludedInTotalPrice: boolean;
  isOverriddenByUser: boolean;
  value: number;
}

export interface Fee {
  name: string;
  title: string;
  isIncludedInTotalPrice: boolean;
  isOverriddenByUser: boolean;
  value: number;
  convertedValue: any;
  isMandatory: boolean;
  isQuantitySelectable?: boolean;
  quantity?: number;
  id?: number;
}

export interface Discount {
  name: string;
  title: string;
  isIncludedInTotalPrice: boolean;
  isOverriddenByUser: boolean;
  value: number;
  isMandatory: boolean;
  convertedValue: any;
}

export interface PriceDetail {
  price: Price[];
  fee?: Fee[];
  discount?: Discount[];
  tax?: any[];
  taxAndFee?: any;
  totalDiscount?: any;
  addons?: any[];
  totalAddOns?: any;
  promotionDiscount?: any[];
}

export interface PriceReservation {
  isAvail: boolean;
  price: number;
  totalPrice: number;
  priceDetail: PriceDetail;
  pricePerNight: number;
  basePricePerNight: number;
  convertedBasePricePerNight: any;
  convertedPricePerNight: any;
  convertedTotalPrice: any;
  platformFee: any;
  convertedPrice: any;
  finalPrice: any;
  calendar: Array<any>;
  nights: number;
  baseRateDetail: any[];
  exchangeRate: {
    currencies: string[];
    rates: any;
  };
  promoCode?: any;
}

export interface Address {
  lat: string;
  lng: string;
  city?: any;
  state: string;
  street: string;
  address: string;
  country: string;
  zipcode: string;
  countryCode: string;
  publicAddress: string;
}

export interface Amenity {
  id: number;
  name: string;
  category: string;
  pmsAmenityId: string;
}

export interface Contact {
  language?: any;
  contactName: string;
  contactEmail: string;
  contactPhone1: string;
  contactPhone2?: any;
  contactAddress: string;
  contactSurName: string;
  contactLanguage: string;
}

export interface CancelPolicies {
  id: string;
  name: string;
  key: string;
  description: string;
  createdBy?: any;
  createdAt: Date;
  updatedAt: Date;
  policies: any[];
}

export interface PropertyType {
  id: number;
  name: string;
}

export interface BedType {
  id: number;
  name: string;
  quantity: number;
  pmsBedTypeId: string;
}

export interface PropertyRoom {
  id: number;
  propertyId: number;
  name: string;
  description?: any;
  hasBathroom?: any;
  bedTypes: BedType[];
  pmsRoomId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyPrice {
  id: number;
  propertyId: number;
  currency: string;
  basePrice: number;
  avgPrice: number;
  guestsIncludedInRegularFee: string;
  weeklyPriceFactor: string;
  monthlyPriceFactor?: any;
  cleaningFee: string;
  securityDepositFee?: any;
  extraPersonFee: string;
  propertyRentTax: string;
  guestPerPersonPerNightTax: string;
  guestStayTax: string;
  guestNightlyTax: string;
  refundableDamageDeposit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: number;
  propertyId: number;
  caption: string;
  url: string;
  sortOrder: number;
  pmsImageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeeSetting {
  id: number;
  propertyId: number;
  feeType: string;
  feeTitle: string;
  feeAppliedPer: string;
  amount: string;
  amountType: string;
  isMandatory: boolean;
  isQuantitySelectable: boolean;
  pmsFeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyInfo {
  id: number;
  userId: string;
  walletId: string;
  hostId: string;
  status: string;
  title?: any;
  internalName: string;
  externalName: string;
  doorCode: string;
  keyPickup: string;
  starRating?: any;
  description: string;
  propertyTypeId: number;
  roomType: string;
  bathRoomType: string;
  defaultCheckInTime: string;
  defaultCheckOutTime: string;
  checkinType?: any;
  checkinInstruction?: any;
  personCapacity: number;
  guestsIncluded: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxChildren?: any;
  maxInfant?: any;
  maxPet?: any;
  address: Address;
  pictures?: any;
  amenities: Amenity[];
  additionalInfo?: any;
  contact: Contact;
  rooms?: any;
  cleaningStatus?: any;
  policies?: any;
  cancelPolicy: string;
  cancelPolicies: CancelPolicies;
  importedAt: Date;
  pmsType: string;
  pmsPropertyId: string;
  propertyType: PropertyType;
  propertyTypeName: string;
  propertyContracts: any[];
  propertyRooms: PropertyRoom[];
  propertyPrice: PropertyPrice;
  propertyImages: PropertyImage[];
  feeSettings: FeeSetting[];
  houseRules: string;
  minNights: number;
  maxNights: number;
  timezone: string;
  listingInfo: any;
  cancellationPolicy: any;
  thumbnail: string;
  publishedStatus: string;
  fiat: boolean;
  crypto: boolean;
  isActive: boolean;
  fiatPaymentEnabled: boolean;
  cryptoPaymentEnabled: boolean;
  guestMessage?: string;
  expiredAt?: string;
  priceInfo?: PriceReservation;
  superhogKYGId?: string;
  superhogProtectId?: string;
  superhogStatus?: string;
}
export interface RateData {
  name: string;
  key: string;
  symbol: string;
  rate: string | number;
}
export interface MerchantLandingDataProps {
  gallery: string;
  headline: string;
  id: string;
  userId: string;
  subHeadline: string;
}
export type ViewModeMerchant = "list" | "map";
export type LocationItemMerchant = { city: string; country: string };
export interface GoogleApplePayEnableProps {
  applePay?: boolean;
  googlePay?: boolean;
  link?: boolean;
}
export interface SpecialUserProps {
  color: string;
  name: "adeel" | "riley";
  userId: string;
}
