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

  async addGroup(name: string): Promise<Group> {
    const id = nanoid();
    const newGroup = new Group(id, name);
    const result = await this.getAllGroups();
    if (result) {
      result.push(newGroup);
      result.sort((a, b) => a.name.localeCompare(b.name));
      this.storage.set(STORAGE_KEY, result);
    } else {
      this.storage.set(STORAGE_KEY, [newGroup]);
    }
    await this.recentGroupService.push(newGroup);
    return newGroup;
  }

  async getGroupById(id: string): Promise<Group> {
    const result = await this.getAllGroups();
    const selectedGroup = result
      ? result.find(group => group.id === id)
      : undefined;
    if (selectedGroup) {
      await this.recentGroupService.push(selectedGroup);
    }
    return selectedGroup;
  }
}
