import { Injectable } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { Observable } from "rxjs";
import { Member } from "../domain/Member";

const STORAGE_KEY = "members";

@Injectable({
  providedIn: "root"
})
export class MemberService {
  constructor(private storageService: RepositoryService) {}

  findAllById(membersIds: string[]): Observable<Member> {
    return this.storageService.findAllById(STORAGE_KEY, membersIds);
  }

  saveAll(oldMemberIds: string[], newMembers: Member[]): Observable<Member> {
    return null;
  }
}
