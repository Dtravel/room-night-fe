import { createBookingOrder } from '@dtravel/helpers/api/booking'

export interface ServerResponse {
  success?: boolean
  data?: any
  result?: any
  status?: any
  [propsName: string]: any
}

export interface IResponse {
  ok: boolean
  result?: any
  code?: number
  msg?: string
  data?: any
}

export interface FormError {
  show: boolean
  message: string
}

export interface ListingAmenity {
  amenityId: number
  amenityName: string
  id: number
}

export interface ListingBedType {
  bedTypeId: number
  quantity: number
  bedroomNumber: number
  id: number
}

export interface ListingImage {
  caption: string
  url: string
  sortOrder: number
  id: number
}

export interface CustomField {
  id: number
  name: string
  possibleValues?: any
  type: string
  isPublic: number
  insertedOn: string
  updatedOn: string
}

export interface CustomFieldValue {
  id: number
  customFieldId: number
  value: string
  insertedOn: string
  updatedOn: string
  customField: CustomField
}

export interface ListingFeeSetting {
  id: number
  accountId: number
  listingMapId: number
  feeType: string
  feeTitle: string
  feeAppliedPer: string
  amount: number
  amountType: string
  isMandatory: number
  isQuantitySelectable: number
  insertedOn: string
  updatedOn: string
}

export type GuestType = 'adult' | 'child' | 'infant' | 'pet'

export interface Price {
  name: string
  title: string
  isIncludedInTotalPrice: boolean
  isOverriddenByUser: boolean
  value: number
}

export interface Fee {
  name: string
  title: string
  isIncludedInTotalPrice: boolean
  isOverriddenByUser: boolean
  value: number
  isMandatory: boolean
  isQuantitySelectable?: boolean
  quantity?: number
  id?: number
  convertedValue: any
}

export interface Discount {
  name: string
  title: string
  isIncludedInTotalPrice: boolean
  isOverriddenByUser: boolean
  value: number
  isMandatory: boolean
  isQuantitySelectable: boolean
  quantity: number
  id?: any
  convertedValue: any
}

export interface PriceComponents {
  price: Price[]
  fee: Fee[]
  discount: Discount[]
}

export interface PriceDetail {
  price: number
  weeklyDiscount: number
  monthlyDiscount: number
  priceForExtraPerson: number
  cleaningFee: number
  refundableDamageDeposit: number
  couponDiscount: number
  checkinFee: number
  hostChannelFee: number
  petFee: number
  bookingFee: number
  parkingFee: number
  lastMinuteDiscount: number
  salesTax: number
  hotelTax: number
  vat: number
  lodgingTax: number
  transientOccupancyTax: number
  cityTax: number
  roomTax: number
  otherTaxes: number
  totalPrice: number
  components: PriceComponents
  isDirectChannelFeesActive: number
}

export interface PriceAvailability {
  id: number
  date: string
  isAvailable: number
  status: string
  price: number
  minimumStay: number
  maximumStay: number
  closedOnCheckin?: boolean
  closedOnCheckout?: boolean
  bookable?: boolean
}

export interface StripeInfoProps {
  stripe_publishable_key?: string
  stripePublishableKey?: string
  stripeAccount?: string
  country?: string
  capabilities?: any
}

export interface AddressSuperhogProps {
  addressLine1?: string
  town?: string
  county?: string
  countryIso?: string
  postcode?: string
}
export interface GuestInfoProps {
  name?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
}
export interface SuperhogInfoProps {
  dateOfBirth?: string
  telephoneType?: number
  telephoneCode?: string
  address?: AddressSuperhogProps
}

export interface BookingDataProps {
  checkinDate: string
  checkoutDate: string
  nights?: number
  guestCount: number
  adults: number
  children: number
  infants: number
  pets: number
  guestInfo: GuestInfoProps
  listingId: string | number
  finalPrice: string | number
  currency: string
  paymentMethod: string
  hostWallet?: string
  guestWallet?: string
  chainId?: number
  currencyAddress?: string
  subPaymentMethod?: string
}
export interface ManualBookingDataProps {
  guestInfo: GuestInfoProps & SuperhogInfoProps
  currency: string
  paymentMethod: string
  guestWallet?: string
  chainId?: number
  currencyAddress?: string
  addons?: Array<any>
  subPaymentMethod?: string
  promoCode?: string
}
export interface BookingPricesProps {
  checkinDate: string
  checkoutDate: string
  guestCount?: number
  listingId: number
  currency: string
  adults?: number
  children?: number
  infants?: number
  pets?: number
  promoCode?: string
}

export interface Contact {
  language?: any
  contactName: string
  contactEmail: string
  contactPhone1: string
  contactPhone2?: any
  contactAddress: string
  contactSurName: string
  contactLanguage: string
  hostId?: string
}

export interface BedType {
  id: number
  name: string
  pmsBedTypeId: string
  quantity: number
}

export interface PropertyRoom {
  id: number
  propertyId: number
  name: string
  description?: any
  hasBathroom?: any
  bedTypes: BedType[]
  pmsRoomId: string
  createdAt: Date
  updatedAt: Date
}

export interface PropertyImage {
  id: number
  propertyId: number
  caption: string
  url: string
  sortOrder: number
  pmsImageId: string
  createdAt: Date
  updatedAt: Date
}
export interface TokenAddressProps {
  id: number
  symbol: string
  address: string
  chainId: number
  chainName: string
  isShow: boolean
  isAcceptPayment: boolean
  logo: string
  createdAt: Date
  updatedAt: Date
}

export interface MerchantListProps {
  guestCount?: number
  adults?: number
  children?: number
  infants?: number
  pets?: number
  checkinDate?: string
  checkoutDate?: string
  hostAddress: string
  pageSize: string | number
  page: string | number
  locations?: string[]
  minPrice?: string | number
  maxPrice?: string | number
  beds?: string | number
  bathrooms?: string | number
}

export interface CurrencyItem {
  name: string
  key: string
  symbol: string
  type: 'FIAT' | 'CRYPTO'
  icon?: string
}
export interface TypePaymentProps {
  CREDIT_CARD: 'credit_card'
  CRYPTO: 'crypto'
  APPLE_PAY: 'apple'
  GOOGLE_PAY: 'google'
  AFFIRM_PAY: 'affirm'
  AFTER_PAY: 'afterPay'
  KLARNA_PAY: 'klarna'
}
export type TypePayment = 'credit_card' | 'crypto' | 'apple' | 'google' | 'affirm' | 'afterPay' | 'klarna' | ''
export interface SettingUrlProps {
  id: string
  userId: string
  status: string
  customId: string
  isPrimary: boolean
  type: string
}
export interface DomainInfoProps {
  domain?: string
  userId?: string
  walletId?: string
}

export interface ManualPriceBookingProps {
  currency: string
  addons: Array<string>
  promoCode?: string
}
export interface ReviewParamsProps {
  searchType: 'host' | 'listing'
  isStrict: boolean
  hostId: string
  pmsListingId?: string
  pageSize?: number
  minRate?: number
}
