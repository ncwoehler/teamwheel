import { Injectable } from "@angular/core";
import { RecentGroupService } from "./recent-group.service";
import { Storage } from "@ionic/storage";
import { Group } from "./Group";
import nanoid from "nanoid";

const STORAGE_KEY = "allGroups";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(
    private storage: Storage,
    private recentGroupService: RecentGroupService
  ) {}

  getAllGroups(): Promise<Group[]> {
    return this.storage.get(STORAGE_KEY);
  }

  addGroup(name: string): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      const id = nanoid();
      const newGroup = new Group(id, name);
      this.getAllGroups().then(
        result => {
          if (result) {
            result.push(newGroup);
            result.sort((a, b) => a.name.localeCompare(b.name));
            this.storage.set(STORAGE_KEY, result);
          } else {
            this.storage.set(STORAGE_KEY, [newGroup]);
          }
          this.recentGroupService.push(newGroup);
          resolve(newGroup);
        },
        value => reject(value) // TODO error handling
      );
    });
  }

  getGroupById(id: string): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.getAllGroups().then(
        value => {
          const selectedGroup = value
            ? value.find(group => group.id === id)
            : undefined;
          if (selectedGroup) {
            this.recentGroupService.push(selectedGroup);
          }
          resolve(selectedGroup);
        },
        value => reject(value)
      );
    });
  }
}
