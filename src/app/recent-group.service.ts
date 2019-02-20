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

  async push(group: Group) {
    const result = await this.getRecentGroups();
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
  }

  async getRecentGroupsInOrder(): Promise<Group[]> {
    const recentGroups = await this.getRecentGroups();
    return recentGroups.reverse();
  }
}
