import { Injectable } from "@angular/core";
import { Group } from "../domain/Group";
import { GroupService } from "./group.service";

@Injectable({
  providedIn: "root"
})
export class RecentGroupService {
  constructor(private groupService: GroupService) {}

  async getRecentGroupsInOrder(): Promise<Group[]> {
    const allGroups = await this.groupService.getAllGroups();
    return allGroups.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, 5);
  }
}
