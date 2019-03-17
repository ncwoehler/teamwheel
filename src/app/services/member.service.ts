import { Injectable } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { merge, Observable } from "rxjs";
import { Member } from "../domain/Member";

const STORAGE_KEY = "members";

@Injectable({
  providedIn: "root"
})
export class MemberService {
  constructor(private repositoryService: RepositoryService) {}

  findAllById(membersIds: string[]): Observable<Member> {
    return this.repositoryService.findAllById(STORAGE_KEY, membersIds);
  }

  saveAll(newMembers: Member[]): Observable<Member> {
    return this.repositoryService.saveAll(STORAGE_KEY, newMembers);
  }

  deleteAll(memeberIds: string[]) {
    return this.repositoryService.deleteAllById(STORAGE_KEY, memeberIds);
  }
}
