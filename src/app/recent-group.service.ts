import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Group } from "./Group";

const STORAGE_KEY = "recentGroups";

@Injectable({
  providedIn: "root"
})
export class RecentGroupService {
  constructor(private storage: Storage) {}

  private getRecentGroups(): Promise<Group[]> {
    return this.storage.get(STORAGE_KEY);
  }

  push(group: Group): void {
    this.getRecentGroups().then(
      result => {
        if (result) {
          const index = result.findIndex(g => g.id === group.id);
          if (index > -1) {
            result.splice(index, 1);
          }
          const newSize = result.push(group);
          if (newSize > 5) {
            result.shift();
          }
          this.storage.set(STORAGE_KEY, result);
        } else {
          this.storage.set(STORAGE_KEY, [group]);
        }
      },
      value => console.error(value) // TODO error handling
    );
  }

  getRecentGroupsInOrder(): Promise<Group[]> {
    return new Promise<Group[]>((resolve, reject) => {
      this.storage.get(STORAGE_KEY).then(
        value => {
          resolve(value.reverse());
        },
        value => reject(value)
      );
    });
  }
}
