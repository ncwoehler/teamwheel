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
  constructor(private storage: Storage) {}

  getAllGroups(): Promise<Group[]> {
    return this.storage.get(STORAGE_KEY);
  }

  async addGroup(name: string): Promise<Group> {
    const id = nanoid();
    const newGroup = new Group(id, name);
      this.updateLastUsed(newGroup);
    const result = await this.getAllGroups();
    if (result) {
      result.push(newGroup);
      this.storeGroups(result);
    } else {
      this.storeGroups([newGroup]);
    }
    return newGroup;
  }

  async getGroupById(id: string): Promise<Group> {
    const result = await this.getAllGroups() as Group[];
    const groupById: Group = result ? result.find(group => group.id === id) : undefined;
    if(groupById) {
        this.updateLastUsed(groupById);
        this.storeGroups(result);
    }
    return groupById;
  }

  async deleteGroup(id: string) {
    const result = await this.getAllGroups();
    if (!result) {
      return; // TODO error handling
    }
    const selectedGroupIndex = result
      ? result.findIndex(group => group.id === id)
      : -1;
    if (selectedGroupIndex > -1) {
      result.splice(selectedGroupIndex, 1);
      this.storeGroups(result);
    } else {
      // TODO error handling
    }
  }

  private updateLastUsed(group: Group) {
    group.lastUsed = new Date().getTime();
  }

  private storeGroups(groups: Group[]) {
    groups.sort((a, b) => a.name.localeCompare(b.name));
    this.storage.set(STORAGE_KEY, groups);
  }
}
