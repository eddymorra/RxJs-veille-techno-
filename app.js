import $ from 'jquery';
import * as Rx from 'rxjs';

let input = document.querySelector('#input');

let keyUp = Rx.Observable.fromEvent(input, 'keyup');
let observable = keyUp
    .map(e => e.target.value)
    .debounceTime(1000)
    .distinctUntilChanged()
    .map(value => {
        let p = $.get('https://test-recrutement.loyaltyexpert.net/products/' + value).promise();
        return Rx.Observable.fromPromise(p)
            .retry(3)
            .takeUntil(keyUp)
    }).concatAll();

observable.subscribe(result => {
    console.log(result.name);
}, err => {
    console.log('Erreur !');
}, completed => {
    console.log('### Fini ! ###');
})