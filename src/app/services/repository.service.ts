import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Idable } from "../domain/Idable";
import { concat, Observable } from "rxjs";

import { distinct, filter, map, mergeMap, toArray } from "rxjs/operators";
import { from } from "rxjs";
import { IdService } from "./id.service";

@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  constructor(private storage: Storage, private idService: IdService) {}

  save<T extends Idable>(storageKey: string, newObject: T): Observable<T> {
    return this.saveAll(storageKey, [newObject]);
  }

  saveAll<T extends Idable>(
    storageKey: string,
    newObjects: T[]
  ): Observable<T> {
    return concat(
      this.findAll(storageKey).pipe(
        map(obj => {
          const replacement = newObjects.find(
            (newObj: Idable) => obj.id === newObj.id
          );
          return replacement || obj;
        })
      ),
      from(newObjects).pipe(
        filter(newObj => !newObj.id),
        map(newObj => {
          newObj.id = this.idService.getId();
          return newObj;
        })
      )
    ).pipe(
      distinct((obj: Idable) => obj.id),
      toArray(),
      mergeMap(result =>
        from(this.storage.set(storageKey, result)).pipe(
          filter(value => value !== null)
        )
      )
    );
  }

  findAll<T extends Idable>(storageKey: string): Observable<T> {
    return from(this.storage.get(storageKey)).pipe(
      filter(value => value !== null)
    );
  }

  findById<T extends Idable>(storageKey: string, id: string): Observable<T> {
    return this.findAll<T>(storageKey).pipe(filter(v => v.id === id));
  }

  findAllById<T extends Idable>(
    storageKey: string,
    ids: string[]
  ): Observable<T> {
    return this.findAll<T>(storageKey).pipe(
      filter(value => !!ids.find(id => id === value.id))
    );
  }

  deleteById<T extends Idable>(storageKey: string, id: string): Observable<T> {
    return this.findAll(storageKey).pipe(
      filter((value: Idable) => value.id !== id),
      toArray(),
      mergeMap(result =>
        from(this.storage.set(storageKey, result)).pipe(
          filter(value => value !== null)
        )
      )
    );
  }
}
