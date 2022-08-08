import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromFlightBooking from './+state/flight-booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FlightBookingEffects } from './+state/flight-booking.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromFlightBooking.flightBookingFeatureKey, fromFlightBooking.reducer),
    EffectsModule.forFeature([FlightBookingEffects])
  ]
})
export class FlightBookingModule { }
