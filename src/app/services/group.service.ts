import { Injectable } from "@angular/core";
import { Group } from "../domain/Group";
import { RepositoryService } from "./repository.service";
import { Observable } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";

const STORAGE_KEY = "groups";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  private static updateLastUsed(group: Group) {
    group.lastUsed = new Date().getTime();
  }

  constructor(private storageService: RepositoryService) {}

  save(
    name: string,
    icon: string,
    members: string[],
    id?: string
  ): Observable<Group> {
    const group = new Group(name, icon, members);
    GroupService.updateLastUsed(group);
    if (id) {
      group.id = id;
    }
    return this.storageService.save(STORAGE_KEY, group);
  }

  getAllGroups(): Observable<Group> {
    return this.storageService.findAll(STORAGE_KEY);
  }
  getGroupById(id: string): Observable<Group> {
    return this.storageService.findById<Group>(STORAGE_KEY, id).pipe(
      map(groupById => {
        GroupService.updateLastUsed(groupById);
        this.storageService.save(STORAGE_KEY, groupById).subscribe(() => {});
        return groupById;
      })
    );
  }

  deleteGroup(id: string): Observable<Group> {
    return this.storageService.deleteById(STORAGE_KEY, id);
  }
}
