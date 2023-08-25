import { RateData } from '@dtravel/helpers/interfaces/property'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  checkIn: string | null
  checkOut: string | null
  adults: number
  children: number
  infants: number
  pets: number
  disabledDatesMap: any
  calendarDatesMap: any
  propertyHover: any
  showCollapseMobile: boolean
  minimumStay: number
  maximumStay: number
  userID: string | null
  rates: RateData[]
  rate: RateData
  businessInfor: any
  landingSetting: any
  isDisableCalendar: boolean
  isRateLoadDone: boolean
  hostReviewSpecial: any[]
  propertyReview: any[]
}

const initialState: CommonState = {
  checkIn: null,
  checkOut: null,
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
  disabledDatesMap: new Map(),
  calendarDatesMap: new Map(),
  propertyHover: null,
  showCollapseMobile: true, // true for v1 and false for v2
  minimumStay: 1,
  maximumStay: 365,
  userID: null,
  rates: [],
  rate: { name: 'US Dollar', key: 'USD', symbol: '$', rate: '1' },
  businessInfor: null,
  landingSetting: null,
  isDisableCalendar: false,
  isRateLoadDone: false,
  hostReviewSpecial: [],
  propertyReview: [],
}

export const propertySlices = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCheckIn: (state, action: PayloadAction<string | null>) => {
      state.checkIn = action.payload
    },
    setCheckOut: (state, action: PayloadAction<string | null>) => {
      state.checkOut = action.payload
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload
    },
    setInfants: (state, action: PayloadAction<number>) => {
      state.infants = action.payload
    },
    setPets: (state, action: PayloadAction<number>) => {
      state.pets = action.payload
    },
    setDisabledDatesMap: (state, action: PayloadAction<any>) => {
      state.disabledDatesMap = action.payload
    },
    setCalendarDatesMap: (state, action: PayloadAction<any>) => {
      state.calendarDatesMap = action.payload
    },
    setHoverProperty: (state, action: PayloadAction<any>) => {
      state.propertyHover = action.payload
    },
    setShowCollapseMobile: (state, action: PayloadAction<boolean>) => {
      state.showCollapseMobile = action.payload
    },
    setMinimumStay: (state, action: PayloadAction<number>) => {
      state.minimumStay = action.payload
    },
    setMaximumStay: (state, action: PayloadAction<number>) => {
      state.maximumStay = action.payload
    },
    setUserID: (state, action: PayloadAction<string | null>) => {
      state.userID = action.payload
    },
    setRates: (state, action: PayloadAction<RateData[]>) => {
      state.rates = action.payload
    },
    setRate: (state, action: PayloadAction<RateData>) => {
      state.rate = action.payload
    },
    setIsRateLoadDone: (state, action: PayloadAction<boolean>) => {
      state.isRateLoadDone = action.payload
    },
    setBusinessInfor: (state, action: PayloadAction<any>) => {
      state.businessInfor = action.payload
    },
    setLandingSetting: (state, action: PayloadAction<any>) => {
      state.landingSetting = action.payload
    },
    setIsDisableCalendar: (state, action: PayloadAction<boolean>) => {
      state.isDisableCalendar = action.payload
    },
    setHostReviewSpecial: (state, action: PayloadAction<any[]>) => {
      state.hostReviewSpecial = action.payload
    },
    setPropertyReview: (state, action: PayloadAction<any[]>) => {
      state.propertyReview = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  setInfants,
  setPets,
  setDisabledDatesMap,
  setCalendarDatesMap,
  setHoverProperty,
  setShowCollapseMobile,
  setMinimumStay,
  setMaximumStay,
  setUserID,
  setRates,
  setRate,
  setBusinessInfor,
  setLandingSetting,
  setIsDisableCalendar,
  setIsRateLoadDone,
  setHostReviewSpecial,
  setPropertyReview,
} = propertySlices.actions

export default propertySlices.reducer
