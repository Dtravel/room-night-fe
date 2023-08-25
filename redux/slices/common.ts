import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FocusedInputShape } from 'react-dates'
import { CurrencyItem, TypePayment } from '@dtravel/helpers/interfaces'
import { TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { LocationItemMerchant } from '@dtravel/helpers/interfaces/property'

export interface CommonState {
  locale: string
  isLoading: boolean
  triggerTime: undefined | number
  walletAddress: string
  connecting: boolean
  toast: {
    duration?: number
    type?: string
    show: boolean
    title?: string
    message: string
  }
  accounts: Array<string>
  chainId: string
  stripeComplete: boolean
  datePickerFocusedId: FocusedInputShape | null
  isOpenDatePickerDesktop: boolean
  isOpenDatePickerMobile: boolean
  isOpenSelectGuestDesktop: boolean
  isOpenSelectGuestMobile: boolean
  isOpenSelectLocationDesktop: boolean
  isOpenSelectLocationMobile: boolean
  cryptoPayment: string
  typePayment: TypePayment
  isLoadingPrice: boolean
  isOpenPopupImages: boolean
  anchorDatePicker: HTMLElement | null
  anchorSelectGuest: HTMLElement | null
  anchorSelectLocation: HTMLElement | null
  selectedLocations: any[]
  locations: LocationItemMerchant[]
  indexImageInGallery: number
  isOpenSelectCurrency: boolean
  selectedCurrency: CurrencyItem
  listCurrency: CurrencyItem[]
  isSelectedCurrencyByCountry: boolean
  typeTooltip: string
  promoCode: string
}

const initialState: CommonState = {
  locale: 'en-US',
  isLoading: false,
  triggerTime: 0,
  walletAddress: '',
  connecting: false,
  toast: {
    duration: 6000,
    type: 'error',
    show: false,
    title: 'Title',
    message: '',
  },
  accounts: [],
  chainId: '',
  stripeComplete: false,
  isOpenDatePickerDesktop: false,
  isOpenDatePickerMobile: false,
  isOpenSelectGuestDesktop: false,
  isOpenSelectGuestMobile: false,
  isOpenSelectLocationDesktop: false,
  isOpenSelectLocationMobile: false,
  datePickerFocusedId: 'startDate',
  cryptoPayment: '',
  typePayment: '',
  isLoadingPrice: false,
  isOpenPopupImages: false,
  anchorDatePicker: null,
  anchorSelectGuest: null,
  anchorSelectLocation: null,
  selectedLocations: [],
  locations: [],
  indexImageInGallery: 0,
  isOpenSelectCurrency: false,
  selectedCurrency: {
    name: 'US Dollar',
    key: 'USD',
    symbol: '$',
    type: 'FIAT',
  },
  listCurrency: [],
  isSelectedCurrencyByCountry: false,
  typeTooltip: '',
  promoCode: '',
}

export const commonSlices = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload
    },
    setTriggerTime: (state: RootState, action: PayloadAction<any>) => {
      state.triggerTime = action.payload
    },
    updateWalletAddress: (state: RootState, action: PayloadAction<string>) => {
      state.walletAddress = action.payload
    },
    setConnecting: (state, action: PayloadAction<any>) => {
      state.connecting = action.payload
    },
    setToast: (
      state,
      action: PayloadAction<{
        type?: string
        title?: string
        duration?: number
        show: boolean
        message: string
      }>
    ) => {
      state.toast = action.payload
    },
    setToastError: (
      state,
      action: PayloadAction<{
        title?: string
        duration?: number
        message: string
      }>
    ) => {
      state.toast = { ...action.payload, type: 'error', show: true }
    },
    setToastSuccess: (
      state,
      action: PayloadAction<{
        title?: string
        duration?: number
        message: string
      }>
    ) => {
      state.toast = { ...action.payload, type: 'success', show: true }
    },
    setAccounts: (state, action: PayloadAction<Array<string>>) => {
      state.accounts = action.payload
    },
    setChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload
    },
    setStripeComplete: (state, action: PayloadAction<boolean>) => {
      state.stripeComplete = action.payload
    },
    setDatePickerFocusedId: (state, action: PayloadAction<FocusedInputShape | null>) => {
      state.datePickerFocusedId = action.payload
    },

    setIsOpenDatePickerDesktop: (state, action: PayloadAction<boolean>) => {
      state.isOpenDatePickerDesktop = action.payload
    },
    setIsOpenDatePickerMobile: (state, action: PayloadAction<boolean>) => {
      state.isOpenDatePickerMobile = action.payload
    },
    setIsOpenSelectGuestDesktop: (state, action: PayloadAction<boolean>) => {
      state.isOpenSelectGuestDesktop = action.payload
    },
    setIsOpenSelectGuestMobile: (state, action: PayloadAction<boolean>) => {
      state.isOpenSelectGuestMobile = action.payload
    },
    setIsOpenSelectLocationDesktop: (state, action: PayloadAction<boolean>) => {
      state.isOpenSelectLocationDesktop = action.payload
    },
    setIsOpenSelectLocationMobile: (state, action: PayloadAction<boolean>) => {
      state.isOpenSelectLocationMobile = action.payload
    },
    setCryptoPayment: (state, action: PayloadAction<string>) => {
      state.cryptoPayment = action.payload
    },
    setTypePayment: (state, action: PayloadAction<TypePayment>) => {
      state.typePayment = action.payload
    },
    setLoadingPrice: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPrice = action.payload
    },
    setIsOpenPopupImages: (state, action: PayloadAction<boolean>) => {
      state.isOpenPopupImages = action.payload
    },
    setAnchorDatePicker: (state, action: PayloadAction<any>) => {
      state.anchorDatePicker = action.payload
    },
    setAnchorSelectGuest: (state, action: PayloadAction<any>) => {
      state.anchorSelectGuest = action.payload
    },
    setAnchorSelectLocation: (state, action: PayloadAction<any>) => {
      state.anchorSelectLocation = action.payload
    },
    setIndexImageInGallery: (state, action: PayloadAction<number>) => {
      state.indexImageInGallery = action.payload
    },
    setIsOpenSelectCurrency: (state, action: PayloadAction<boolean>) => {
      state.isOpenSelectCurrency = action.payload
    },
    setSelectedCurrency: (state, action: PayloadAction<any>) => {
      state.selectedCurrency = action.payload
    },
    setListCurrency: (state, action: PayloadAction<CurrencyItem[]>) => {
      state.listCurrency = action.payload
    },
    setSelectedLocations: (state, action: PayloadAction<any[]>) => {
      state.selectedLocations = action.payload
    },
    setLocations: (state, action: PayloadAction<LocationItemMerchant[]>) => {
      state.locations = action.payload
    },
    setIsSelectedCurrencyByCountry: (state, action: PayloadAction<boolean>) => {
      state.isSelectedCurrencyByCountry = action.payload
    },
    setTypeTooltip: (state, action: PayloadAction<string>) => {
      state.typeTooltip = action.payload
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setTriggerTime,
  updateWalletAddress,
  setConnecting,
  setToast,
  setToastError,
  setToastSuccess,
  setAccounts,
  setChainId,
  setStripeComplete,
  setDatePickerFocusedId,
  setIsOpenDatePickerMobile,
  setIsOpenDatePickerDesktop,
  setIsOpenSelectGuestMobile,
  setIsOpenSelectGuestDesktop,
  setIsOpenSelectLocationMobile,
  setIsOpenSelectLocationDesktop,
  setCryptoPayment,
  setTypePayment,
  setLoadingPrice,
  setIsOpenPopupImages,
  setAnchorDatePicker,
  setAnchorSelectGuest,
  setAnchorSelectLocation,
  setIndexImageInGallery,
  setIsOpenSelectCurrency,
  setSelectedCurrency,
  setListCurrency,
  setSelectedLocations,
  setLocations,
  setIsSelectedCurrencyByCountry,
  setTypeTooltip,
  setPromoCode,
} = commonSlices.actions

export default commonSlices.reducer
