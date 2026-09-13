export interface BookingFormData {
  destination: string;

  pickupAddress: string;

  dropLocation: string;

  travellers: string;

  startDateTime: string;

  endDateTime: string;

  agreedPrice: string;

  advanceAmount: string;

  advancePaid: boolean;

  vehicleName: string;

  vehicleNumber: string;

  driverName: string;

  driverPhone: string;

  notes: string;
}

export const INITIAL_BOOKING_FORM: BookingFormData =
  {
    destination: "",

    pickupAddress: "",

    dropLocation: "",

    travellers: "",

    startDateTime: "",

    endDateTime: "",

    agreedPrice: "",

    advanceAmount: "",

    advancePaid: false,

    vehicleName: "",

    vehicleNumber: "",

    driverName: "",

    driverPhone: "",

    notes: "",
  };