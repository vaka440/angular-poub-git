import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable()
export class DefaultFlightService implements FlightService {

  private flightSubject = new BehaviorSubject<Flight[]>([]);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly flights$: Observable<Flight[]> = this.flightSubject.asObservable();

  constructor(
    private oauthService: OAuthService,
    private http: HttpClient) { }

  load(from: string, to: string): void {
    this.find(from, to).subscribe(
      flights => {
        this.flightSubject.next(flights);
      },
      error => {
        console.error('error', error);
      }
    );
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.oauthService.authorizationHeader());

    const params = new HttpParams()
      .set('from', from)
      .set('to', to);

    return this.http.get<Flight[]>(url, {headers, params});
  }

  findById(id: string): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('id', id);

    return this.http.get<Flight>(url, {headers, params});
  }

  delay(): void {
    const oldFlights = this.flightSubject.getValue();
    const oldFlight = oldFlights[0];
    const oldFlightDate = new Date(oldFlight.date);

    const newFlightDate = new Date(oldFlightDate.getTime() + 1000 * 60 * 15);

    const newFlight = {
      ...oldFlight, date: newFlightDate.toISOString()
    };

    const newFlights = [
      newFlight, ...oldFlights.slice(1)
    ];

    this.flightSubject.next(newFlights);
  }

  saveAll(flights: Flight[]): Observable<Flight[]> {
    console.debug(`If this wasn't the trail version, these flights would be saved now:`, flights);
    return of(flights);
  }

  save(flight: Flight): Observable<Flight> {
    console.debug(`If this wasn't the trail version, this flight would be saved now:`, flight);
    return of(flight);
  }
}
