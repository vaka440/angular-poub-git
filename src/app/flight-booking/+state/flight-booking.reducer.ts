import { Action, createReducer, on } from '@ngrx/store';
import { Flight } from '../flight';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingState {
  flights: Flight[];
  loading: boolean;
  error: unknown;
}

export const initialState: FlightBookingState = {
  flights: [],
  loading: false,
  error: {}
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    const loading = false;
    return {...state, flights, loading};
  }),

  on(FlightBookingActions.loadFlights, (state, action) => {
    const flights = [] as Flight[];
    const loading = false;
    return {...state, flights, loading};
  }),

  on(FlightBookingActions.loadFlightsError, (state, action) => {
    const flights = [] as Flight[];
    const loading = false;
    const error = action.error;
    return {...state, flights, loading, error};
  }),
);
