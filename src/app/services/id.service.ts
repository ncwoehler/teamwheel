import { Injectable } from "@angular/core";
import nanoid from "nanoid";

@Injectable({
  providedIn: "root"
})
export class IdService {
  constructor() {}

  getId(): string {
    return nanoid();
  }
}
