import { Component, OnInit } from '@angular/core';
import { combineLatest, combineLatestAll, combineLatestWith, concat, concatAll, concatMap, concatWith, exhaustMap, forkJoin, fromEvent, map, merge, mergeAll, mergeMap, mergeScan, mergeWith, of, reduce, scan, switchAll, switchMap, switchMapTo, take, tap, timer, withLatestFrom, zip } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.merge();
    // this.forkJoin();
    //this.concatWith();
    // this.concatMap();
    // this.concat();
    // this.concatAll();
    //this.mergeAll();
    //this.mergeScan();
    //this.reduce();
    //this.scan();
    //this.switchMap();
    //this.switchMap2();
    //this.zip();
    //this.combineLatestAll();
    //this.exhaustMap();
    //this.exhaustMap2();
    //this.mergeMap();
    //this.mergeMap2();
    //this.mergeWith();
    //this.mergeWith2();
    //this.combineLatestWith2();
    //this.switchAll();
    //this.switchAll2();
    this.withLatestFrom();
    //this.withLatestFrom2();
  }

  merge() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    //takeFirst3$.subscribe(x => console.log('takeFirst3$', x));
    //takeSecond5$.subscribe(x => console.log('takeSecond5$', x));

    merge(takeFirst3$, takeSecond5$).subscribe((data: any) => {
      console.log('data', data)
    })
  }

  concatAll() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    const all$ = of(takeFirst3$, takeSecond5$);

    // retourne les valeurs
    all$.pipe(concatAll()).subscribe((data: any) => {
      console.log('data', data)
    })

    // retourne les observables du of(....)
    all$.subscribe((data: any) => {
      console.log('data-', data)
    })
  }

  concat() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    concat(takeFirst3$, takeSecond5$).subscribe((data: any) => {
      console.log('data', data)
    })
  }

  concatMap() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    takeFirst3$.pipe(
      concatMap(v => {
        console.log('v : ' + v)
        return takeSecond5$
      }),
    ).subscribe(res => console.log('res : '+ res))
  }

  concatWith() {
    const source1$ = timer(2000, 2000);
    const clicks$ = fromEvent(document, 'click');

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );

    clicks$.pipe(
      map(() => console.log('click ')),
      take(1),
      concatWith(takeFirst3$)
    ).subscribe(res => console.log('res : ' + res))
  }

  forkJoin() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    forkJoin(
      {
        takeFirst3: takeFirst3$,
        takeSecond5: takeSecond5$
      }
    ).subscribe({
      next: value => console.log(value),
      complete: () => console.log('This is how it ends!'),
     })
  }

  mergeAll() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    const all$ = of(takeFirst3$, takeSecond5$);

    all$.pipe(
      mergeAll()
    ).subscribe(res => console.log('res : ' + res))
  }

  mergeScan() {
    const source1$ = timer(2000, 2000);

    let start = 0;

    source1$.pipe(
      mergeScan((acc, v) => of(acc + v), start)
    ).subscribe(res => console.log('res : ' + res, start))
  }

  reduce() {
    const source1$ = timer(2000, 2000)
                      .pipe(take(2));

    let start = 0;

    source1$.pipe(
      reduce((acc, v) => acc + v, start)
    ).subscribe(res => console.log('res : ' + res, start))
  }

  scan() {
    const source1$ = timer(2000, 2000)
                      .pipe(take(3));

    source1$.pipe(
      scan((acc, v) => acc + v),
      // Obtenir la moyenne en divisant la somme par le nombre total
      // reçus jusqu'à présent (qui est de 1 de plus que l'indice basé sur le zéro).
      map((sum, index) => sum / (index + 1))
    ).subscribe(res => console.log('res : ' + res))
  }

  switchMap() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3')),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    takeFirst3$.pipe(
      switchMap((x: string) => takeSecond5$)
    ).subscribe(res => console.log('res : ' + res))
  }

  switchMap2() {
    const of1$ = of("A", "B");
    const of2$ = of("1", "2", "3");

    of1$.pipe(
      tap(x => console.log('execute of1 : ' + x)),
      switchMap(v => of2$.pipe(
        tap(x => console.log('execute of2 : ' + x)),
      ))
    )
    .subscribe(res => console.log('res : ' + res))
  }

  zip() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    zip(
      takeFirst3$,
      takeSecond5$
    ).pipe(
      map(([take3, take5]) => ({take3, take5}) )
    )
    .subscribe(res => console.log('res : ', res))
  }

  combineLatestAll() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    of(takeFirst3$, takeSecond5$)
    .pipe(combineLatestAll())
    .subscribe(res => console.log('res : ' + res))
  }

  exhaustMap() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      take(3)
    );

    takeFirst3$.pipe(exhaustMap(v => takeSecond5$))
    .subscribe(res => console.log('res : ' + res))
  }

  exhaustMap2() {
    const of1$ = of("A", "B");
    const of2$ = of("1", "2", "3");

    of1$.pipe(
      tap(x => console.log('execute of1 : ' + x)),
      exhaustMap(v => of2$.pipe(
        tap(x => console.log('execute of2 : ' + x)),
      ))
    )
    .subscribe(res => console.log('res : ' + res))
  }

  mergeMap() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      tap(x => console.log('execute t5 : ' + x)),
      take(3)
    );

    takeFirst3$.pipe(mergeMap(v => takeSecond5$))
    .subscribe(res => console.log('res : ' + res))
  }

  mergeMap2() {
    const of1$ = of("A", "B");
    const of2$ = of("1", "2", "3");

    of1$.pipe(mergeMap(v => of2$))
    .subscribe(res => console.log('res : ' + res))
  }

  mergeMap3() {
    const of1$ = of("A", "B");
    const of2$ = (v: string) => of("1" + v, "2" + v, "3" + v);

    of1$.pipe(mergeMap(v => of2$(v)))
    .subscribe(res => console.log('res : ' + res))
  }

  mergeWith() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      tap(x => console.log('execute t5 : ' + x)),
      take(3)
    );

    takeFirst3$.pipe(mergeWith(takeSecond5$))
    .subscribe((res: any) => console.log('res : ' + res))
  }

  mergeWith2() {
    const of1$ = of("A", "B", "C");
    const of2$ = of("1", "2", "3");

    of1$.pipe(mergeWith(of2$))
    .subscribe((res: any) => console.log('res : ' + res))
  }

  combineLatestWith() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      tap(x => console.log('execute t5 : ' + x)),
      take(3)
    );

    takeFirst3$.pipe(combineLatestWith(takeSecond5$))
    .subscribe((res: any) => console.log('res : ' + res))
  }

  combineLatestWith2() {
    const of1$ = of("A", "B", "C");
    const of2$ = of("1", "2", "3");

    of1$.pipe(combineLatestWith(of2$))
    .subscribe((res: any) => console.log('res : ' + res))
  }

  switchAll() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      tap(x => console.log('execute t5 : ' + x)),
      take(3)
    );

    of(takeFirst3$, takeSecond5$).pipe(switchAll())
    .subscribe((res: any) => console.log('res : ' + res))
  }

  switchAll2() {
    const of1$ = of("A", "B", "C");
    const of2$ = of("1", "2", "3");

    of(of1$, of2$).pipe(switchAll())
    .subscribe((res: any) => console.log('res : ' + res))
  }

  withLatestFrom() {
    const source1$ = timer(2000, 2000);
    const source2$ = timer(5000, 5000);

    const takeFirst3$ = source1$.pipe(
      map(v => 't3=' + v),
      tap(x => console.log('execute t3 : ' + x)),
      take(3)
    );
    const takeSecond5$ = source2$.pipe(
      map(v => 't5=' + v),
      tap(x => console.log('execute t5 : ' + x)),
      take(3)
    );

    takeFirst3$.pipe(withLatestFrom(takeSecond5$))
    .subscribe((res: any) => console.log('res : ' + res))
  }

  withLatestFrom2() {
    const of1$ = of("A", "B", "C");
    const of2$ = of("1", "2", "3");

    of1$.pipe(withLatestFrom(of2$))
    .subscribe((res: any) => console.log('res : ' + res))
  }
}
