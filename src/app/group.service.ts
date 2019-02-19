import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Group} from "./Group";
import {Observable, of} from 'rxjs';

const STORAGE_KEY = 'recentGroups';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor() {
    }

    getRecentGroups(): Observable<Group[]> {
        return of([
            {id: 1, name: "6c"},
            {id: 2, name: "6d"}
        ]);
    }
    /*
        isFavorite(filmId) {
            return this.getAllFavoriteFilms().then(result => {
                return result && result.indexOf(filmId) !== -1;
            });
        }

        favoriteFilm(filmId) {
            return this.getAllFavoriteFilms().then(result => {
                if (result) {
                    result.push(filmId);
                    return this.storage.set(STORAGE_KEY, result);
                } else {
                    return this.storage.set(STORAGE_KEY, [filmId]);
                }
            });
        }

        unfavoriteFilm(filmId) {
            return this.getAllFavoriteFilms().then(result => {
                if (result) {
                    var index = result.indexOf(filmId);
                    result.splice(index, 1);
                    return this.storage.set(STORAGE_KEY, result);
                }
            });
        }

        getAllFavoriteFilms() {
            return this.storage.get(STORAGE_KEY);
        }

        / set a key/value
      storage.set('name', 'Max');

      // Or to get a key/value pair
      storage.get('age').then((val) => {
      console.log('Your age is', val);
    });*/
}
