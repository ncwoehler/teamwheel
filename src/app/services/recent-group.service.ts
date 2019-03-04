import { Injectable } from "@angular/core";
import { Group } from "../domain/Group";
import { GroupService } from "./group.service";
import { Observable } from "rxjs";
import { map, toArray } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecentGroupService {
  constructor(private groupService: GroupService) {}

  getRecentGroupsInOrder(): Observable<Group[]> {
    return this.groupService.getAllGroups().pipe(
      toArray(),
      map(groups => groups.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, 5))
    );
  }
}
