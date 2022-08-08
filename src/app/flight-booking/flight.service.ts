import { Injectable } from '@angular/core';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable } from 'rxjs';
import { DefaultFlightService } from './default-flight.service';
import { Flight } from './flight';
import { FlightBookingApiModule } from './flight-booking-api.module';

@Injectable({
  providedIn: FlightBookingApiModule,
  // Auf das Api-Modul des lazy Moduls verweisen:
  useClass: DefaultFlightService
})
export abstract class FlightService {

  // Hinzufügen
  abstract readonly flights$: Observable<Flight[]>;
  abstract load(from: string, to: string): void;
  abstract delay(): void;

  abstract findById(id: string): Observable<Flight>;

  // Die Methode find ist nun abstrakt:
  abstract find(from: string, to: string): Observable<Flight[]>;

  abstract save(flight: Flight): Observable<Flight>;
  abstract saveAll(flights: Flight[]): Observable<Flight[]>;


}
