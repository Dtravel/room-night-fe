import api from "./api";
import {
  BookingDataProps,
  BookingPricesProps,
  ManualBookingDataProps,
  ManualPriceBookingProps,
} from "@dtravel/helpers/interfaces";

export const getStripeInfo = (hostAddress: string) => {
  return api({
    method: "get",
    url: "/paygate-service/stripe/info",
    params: { hostAddress },
  });
};

export const stripePaymentBooking = (
  reservationId: string,
  billingDetail?: any
) => {
  let data = { reservationId };
  if (billingDetail) data = { ...data, ...billingDetail };
  return api({
    method: "post",
    url: "/paygate-service/stripe/payment",
    data,
  });
};

export const createBookingOrder = (data: BookingDataProps) => {
  return api({
    method: "post",
    url: "/reservation-service/reservation",
    data,
  });
};

export const getPaymentMethod = (hostAddress: string) => {
  return api({
    method: "get",
    url: "/paygate-service/payment/method/booking",
    params: { hostAddress },
  });
};

export const getPricesBooking = (
  data: BookingPricesProps,
  cancelParams?: any
) => {
  let optionsApi: any = {
    method: "post",
    url: "/listing-service/v2/calendar/price",
    data,
  };
  if (cancelParams) optionsApi = { ...optionsApi, ...cancelParams };
  return api(optionsApi);
};
export const getPricesManualBooking = (
  reservationId: string,
  data: ManualPriceBookingProps,
  cancelParams?: any
) => {
  let optionsApi: any = {
    method: "post",
    url: `/listing-service/v2/calendar/price/${reservationId}`,
    data,
  };
  if (cancelParams) optionsApi = { ...optionsApi, ...cancelParams };
  return api(optionsApi);
};

export const getDetailBooking = (id: string) => {
  return api({
    method: "get",
    url: `/reservation-service/reservation/public/${id}`,
  });
};

export const cancelReservation = (reservationId: string) => {
  return api({
    method: "post",
    url: `/reservation-service/reservation/cancel/${reservationId}`,
  }).then((res) => res.data);
};

export const getCancelPrice = (reservationId: string, walletId: string) => {
  return api({
    method: "get",
    url: `/reservation-service/reservation/calculate-refund/${reservationId}`,
    params: { walletId },
  }).then((res) => res.data);
};
export const getTokenContract = (chainId: string) => {
  return api({
    method: "get",
    url: `/sc-service/token/${chainId}`,
  }).then((res) => res.data);
};
export const updateManualBookingOrder = (
  reservationId: string,
  data: ManualBookingDataProps
) => {
  return api({
    method: "post",
    url: `/reservation-service/reservation/${reservationId}/update-manual`,
    data,
  });
};
export const getRoomNightOperator = () => {
  return api({
    method: "get",
    url: `/room-night/operator`,
  }).then((res) => res.data);
};
