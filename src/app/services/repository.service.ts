import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Idable } from "../domain/Idable";
import { Observable } from "rxjs";
import nanoid from "nanoid";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  constructor(private storage: Storage) {}

  save<T extends Idable>(storageKey: string, newObject: T): Observable<T> {
    return this.saveAll(storageKey, [newObject]);
  }

  saveAll<T extends Idable>(
    storageKey: string,
    newObjects: T[]
  ): Observable<T> {
    return Observable.create(observer => {
      this.storage
        .get(storageKey)
        .then((allValues: T[]) => {
          const result: T[] = allValues ? allValues : [];

          newObjects.forEach(newObject => {
            // create new ID if none provided
            if (!newObject.id) {
              newObject.id = nanoid();
            }

            const elementIndex = result.findIndex(
              value => value.id == newObject.id
            );
            if (elementIndex > -1) {
              result[elementIndex] = newObject;
            } else {
              result.push(newObject);
            }
          });

          this.storage
            .set(storageKey, result)
            .then(values => values.forEach(value => observer.next(value)))
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }

  findAll<T extends Idable>(storageKey: string): Observable<T> {
    return Observable.create(observer => {
      this.storage
        .get(storageKey)
        .then(values => values.forEach(v => observer.next(v)))
        .catch(e => observer.error(e))
        .finally(() => observer.complete());
    });
  }

  findById<T extends Idable>(storageKey: string, id: string): Observable<T> {
    return this.findAll<T>(storageKey).pipe(filter(v => v.id === id));
  }

  findAllById<T extends Idable>(
    storageKey: string,
    ids: string[]
  ): Observable<T> {
    return this.findAll<T>(storageKey).pipe(
      filter(value => ids.findIndex(id => id === value.id) > -1)
    );
  }

  deleteById<T extends Idable>(
    storageKey: string,
    id: string
  ): Observable<void> {
    return Observable.create(observer => {
      this.storage
        .get(storageKey)
        .then((allValues: T[]) => {
          const elementIndex = allValues.findIndex(value => value.id == id);
          if (elementIndex > -1) {
            allValues.splice(elementIndex, 1);
          }
          this.storage
            .set(storageKey, allValues)
            .then(() => observer.complete())
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }
}
