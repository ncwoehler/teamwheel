import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Idable } from "../domain/Idable";
import { concat, from, Observable } from "rxjs";

import {
  defaultIfEmpty,
  filter,
  flatMap,
  map,
  mergeMap,
  tap,
  toArray
} from "rxjs/operators";
import { IdService } from "./id.service";
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  constructor(
    private storage: Storage,
    private idService: IdService,
    private logger: NGXLogger
  ) {}

  save<T extends Idable>(storageKey: string, newObject: T): Observable<T> {
    this.logger.debug("Saving ", storageKey, newObject);
    return this.saveAll(storageKey, [newObject]);
  }

  saveAll<T extends Idable>(
    storageKey: string,
    newObjects: T[]
  ): Observable<T> {
    return concat(
      this.get(storageKey).pipe(
        map(obj => {
          const replacement = newObjects.find(
            (newObj: Idable) => obj.id === newObj.id
          );
          if (replacement) {
            this.logger.debug("Updated ", storageKey, replacement);
          }
          return replacement || obj;
        })
      ),
      from(newObjects).pipe(
        filter(newObj => !newObj.id),
        map(newObj => {
          newObj.id = this.idService.getId();
          this.logger.debug("Created ID for new ", storageKey, newObj);
          return newObj;
        })
      )
    ).pipe(
      toArray(),
      mergeMap(result => this.store(storageKey, result))
    );
  }

  findAll<T extends Idable>(storageKey: string): Observable<T> {
    return this.get(storageKey);
  }

  findById<T extends Idable>(storageKey: string, id: string): Observable<T> {
    return this.get<T>(storageKey).pipe(
      filter(v => {
        const idEqual = v.id === id;
        if (idEqual) {
          this.logger.debug("Found entity for filter ID", storageKey, id);
        }
        return idEqual;
      })
    );
  }

  findAllById<T extends Idable>(
    storageKey: string,
    ids: string[]
  ): Observable<T> {
    return this.get<T>(storageKey).pipe(
      filter(value => {
        const exists = !!ids.find(id => id === value.id);
        if (exists) {
          this.logger.debug("Found entity for filter ID", storageKey, value.id);
        }
        return exists;
      })
    );
  }

  deleteById<T extends Idable>(storageKey: string, id: string): Observable<T> {
    return this.get(storageKey).pipe(
      filter((value: Idable) => value.id !== id),
      toArray(),
      mergeMap(result => this.store(storageKey, result))
    );
  }

  private get<T extends Idable>(storageKey): Observable<T> {
    return from(this.storage.get(storageKey)).pipe(
      filter(value => !!value),
      defaultIfEmpty([] as T[]),
      tap(values => this.logger.debug("Loaded all", storageKey, values)),
      flatMap(values => from(values)),
      tap(values => this.logger.debug("Loaded single", storageKey, values))
    );
  }

  private store<T extends Idable>(storageKey, data): Observable<T> {
    return from(this.storage.set(storageKey, data)).pipe(
      filter(value => !!value),
      tap(value => this.logger.debug("Stored new ", storageKey, value)),
      flatMap(values => from(values))
    );
  }
}
