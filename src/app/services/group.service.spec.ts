import { TestBed } from "@angular/core/testing";

import { GroupService } from "./group.service";
import { IonicStorageModule } from "@ionic/storage";

describe("GroupService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot(),
    ]
  }));

  it("should be created", () => {
    const service: GroupService = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });
});
