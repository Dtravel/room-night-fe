import { GuestType, TypePaymentProps } from '@dtravel/helpers/interfaces'

export const TOKEN = 'token'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const MONTH_FORMAT = 'YYYY-MM'
export const START_DATE = 'startDate'
export const END_DATE = 'endDate'

export const PMS = {
  HOSTAWAY: 'hostaway',
  UPLISTING: 'uplisting',
  GUEST_SMILES: 'guestsmiles',
}

export const UPLISTING_MAP_HOME_RULES: any = {
  children: {
    '0': 'Not suitable for children',
    '1': 'Suitable for children',
  },
  events: {
    '0': 'No parties or events',
    '1': 'Events allowed',
  },
  pets: {
    '0': 'No pets',
    '1': 'Pets allowed',
  },
  smoking: {
    '0': 'No smoking',
    '1': 'Smoking is allowed',
  },
  infants: {
    '0': 'Not suitable for infants',
    '1': 'Suitable for infants',
  },
}

export const FEES_AND_DISCOUNT: any = {
  cleaningFee: 'Cleaning fee',
  additionalCleaningFee: 'Additional cleaning fee',
  parkingFee: 'Parking fee',
  towelChangeFee: 'Towel change fee',
  midstayCleaningFee: 'Mid- stay cleaning fee',
  roomRequestFee: 'Room request fee',
  reservationChangeFee: 'Reservation change fee',
  lateCheckoutFee: 'Late check - out fee',
  otherFees: 'Other fees',
  creditCardFee: 'Card processing fee',
  kitchenLinenFee: 'Kitchen linen fee',
  linenPackageFee: 'Linen package fee',
  transferFee: 'Transfer fee',
  wristbandFee: 'Wristband fee',
  extraBedsFee: 'Extra beds fee',
  serviceFee: 'Service fee',
  bedLinenFee: 'Bed linen fee',
  bookingFee: 'Booking fee',
  petFee: 'Pet fee',
  skiPassFee: 'Ski pass fee',
  tourismFee: 'Tourism fee',
  childrenExtraFee: 'Extra children fee',
  resortFee: 'Resort fee',
  weeklyDiscount: 'Weekly discount',
  monthlyDiscount: 'Monthly discount',
  priceForExtraPerson: 'Price for extra person',
  refundableDamageDeposit: 'Refundable damage deposit',
  couponDiscount: 'Coupon discount',
  checkinFee: 'Checkin fee',
  shareholderDiscount: 'Share holder discount',
  lastMinuteDiscount: 'Last minute discount',
  employeeDiscount: 'Employee discount',
  otherSpecialDiscount: 'Other special discount',
  salesTax: 'Sales tax',
  hotelTax: 'Hotel tax',
  vat: 'VAT',
  lodgingTax: 'Lodging tax',
  transientOccupancyTax: 'Transient occupancy tax',
  cityTax: 'City tax',
  roomTax: 'Room tax',
  otherTaxes: 'Other taxes',
}

export const PROVIDER_NETWORKS = [
  {
    hex: '0x1',
    decimal: '1',
    name: 'Ethereum Network',
  },
  {
    hex: '0xaa36a7',
    decimal: '11155111',
    name: 'Sepolia Testnet',
  },
  {
    hex: '0x3',
    decimal: '3',
    name: 'Ropsten Test Network',
  },
  {
    hex: '0x4',
    decimal: '4',
    name: 'Rinkeby Test Network',
  },
  {
    hex: '0x5',
    decimal: '5',
    name: 'Goerli Test Network',
  },
  {
    hex: '0x2a',
    decimal: '42',
    name: 'Kovan Test Network',
  },
  {
    hex: '0x38',
    decimal: '56',
    name: 'BSC Main Network',
  },
  {
    hex: '0x61',
    decimal: '97',
    name: 'BSC Test Network',
  },
]

export const GUEST_TYPE: GuestType[] = ['adult', 'child', 'infant', 'pet']

export const PAYMENT_METHOD = {
  FIAT: 'fiat',
  CRYPTO: 'crypto',
}
export const TYPE_PAYMENT: TypePaymentProps = {
  CREDIT_CARD: 'credit_card',
  CRYPTO: 'crypto',
  APPLE_PAY: 'apple',
  GOOGLE_PAY: 'google',
  AFFIRM_PAY: 'affirm',
  AFTER_PAY: 'afterPay',
  KLARNA_PAY: 'klarna',
}
export const RESERVATION_STATUS = {
  DRAFT: 'draft',
  INQUIRY: 'inquiry',
  AWAITING_PAYMENT: 'awaiting_payment',
  NEW: 'new', // mean reservation is successful created, payment is paid
  MODIFIED: 'modified', // After a NEW reservation is create, if you change some info, status must update to modified
  CANCELLED: 'cancelled', //Cancelled by host/guest
  COMPLETED: 'completed', // == CLOSED, when current date is pass the checkout
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  FAILED: 'failed',
  MANUAL_CANCELLED: 'manual_cancelled',
}

export const SUPPORT_EMAIL = 'support@dtravel.com'

export const MAP_ICON_CRYPTO_CURRENCY: any = {
  USDT: 'https://static.dtravel.com/coin-logo/usdt.svg',
  BTC: 'https://static.dtravel.com/coin-logo/btc.svg',
  ETH: 'https://static.dtravel.com/coin-logo/eth.svg',
  BUSD: 'https://static.dtravel.com/coin-logo/busd.svg',
  USDC: 'https://static.dtravel.com/coin-logo/usdc.svg',
  TRVL: 'https://static.dtravel.com/coin-logo/trvl-logo.svg',
}

export const MAP_COUNTRY_AND_CURRENCY = new Map([
  // USD
  ['AS', 'USD'],
  ['BQ', 'USD'],
  ['IO', 'USD'],
  ['SV', 'USD'],
  ['GU', 'USD'],
  ['HT', 'USD'],
  ['MH', 'USD'],
  ['FM', 'USD'],
  ['MP', 'USD'],
  ['PW', 'USD'],
  ['PA', 'USD'],
  ['PR', 'USD'],
  ['TL', 'USD'],
  ['TC', 'USD'],
  ['UM', 'USD'],
  ['US', 'USD'],
  ['VG', 'USD'],

  // GBP
  ['GG', 'GBP'],
  ['IM', 'GBP'],
  ['GB', 'GBP'],
  ['JE', 'GBP'],

  // EUR
  ['AD', 'EUR'],
  ['AT', 'EUR'],
  ['BE', 'EUR'],
  ['CY', 'EUR'],
  ['EE', 'EUR'],
  ['FI', 'EUR'],
  ['FR', 'EUR'],
  ['GF', 'EUR'],
  ['TF', 'EUR'],
  ['DE', 'EUR'],
  ['GR', 'EUR'],
  ['GP', 'EUR'],
  ['VA', 'EUR'],
  ['IE', 'EUR'],
  ['IT', 'EUR'],
  ['LV', 'EUR'],
  ['LT', 'EUR'],
  ['LU', 'EUR'],
  ['MT', 'EUR'],
  ['MQ', 'EUR'],
  ['YT', 'EUR'],
  ['MC', 'EUR'],
  ['ME', 'EUR'],
  ['NL', 'EUR'],
  ['PT', 'EUR'],
  ['RE', 'EUR'],
  ['BL', 'EUR'],
  ['MF', 'EUR'],
  ['PM', 'EUR'],
  ['SM', 'EUR'],
  ['SK', 'EUR'],
  ['SI', 'EUR'],
  ['ES', 'EUR'],
  ['AX', 'EUR'],

  // AUD
  ['AU', 'AUD'],
  ['CX', 'AUD'],
  ['CC', 'AUD'],
  ['HM', 'AUD'],
  ['KI', 'AUD'],
  ['NR', 'AUD'],
  ['NF', 'AUD'],
  ['TV', 'AUD'],

  //SGD
  ['SG', 'SGD'],

  //CAD
  ['CA', 'CAD'],

  //HKD
  ['HK', 'HKD'],

  //CNY
  ['CN', 'CNY'],

  //NZD
  ['CK', 'NZD'],
  ['NZ', 'NZD'],
  ['NU', 'NZD'],
  ['PN', 'NZD'],
  ['TK', 'NZD'],

  //INR
  ['BT', 'INR'],
  ['IN', 'INR'],

  //VND
  ['VN', 'VND'],

  //AED
  ['AE', 'AED'],

  //KRW
  ['KR', 'KRW'],
])
export const DOMAIN_TYPE = {
  CUSTOM: 'custom',
  SELF_HOSTED: 'self_hosted',
}
export const ADEEL_SOCIAL = {
  FACEBOOK: 'https://www.facebook.com/instantsuites',
  INSTAGRAM: 'https://www.instagram.com/instantsuitesofficial/?hl=en',
}
export const RILEY_SOCIAL = {
  FACEBOOK: 'https://www.facebook.com/unwindescapes',
  INSTAGRAM: 'https://www.instagram.com/unwindescapes/',
  TWITTER: 'https://twitter.com/UnwindEscapes',
  TIKTOK: 'https://www.tiktok.com/@unwindescapes',
}
export const GIO_SOCIAL = {
  FACEBOOK: 'https://www.facebook.com/GiardinoDiLimoni/',
}
export const SOCIAL_TYPE = {
  FACEBOOK: 'FACEBOOK',
  INSTAGRAM: 'INSTAGRAM',
  TWITTER: 'TWITTER',
  TIKTOK: 'TIKTOK',
}
export const AFFIRM_PAY_COUNTRY = ['US']
export const AFTER_PAY_COUNTRY = ['US', 'CA', 'UK', 'GB', 'AU', 'NZ', 'FR', 'ES']
export const KLARNA_PAY_COUNTRY = [
  'AT',
  'BE',
  'DE',
  'DK',
  'ES',
  'FI',
  'GB',
  'IE',
  'IT',
  'NL',
  'NO',
  'SE',
  'US',
  'FR',
  'CZ',
  'GR',
  'AU',
  'NZ',
  'CA',
  'PL',
  'PT',
  'CH',
]
export const LANDING_THEME_VERSION = {
  NORMAL: 1,
  SPECIAL: 2,
}
export const DTRAVEL_URL = 'https://dtravel.com'
