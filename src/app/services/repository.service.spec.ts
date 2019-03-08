import { RepositoryService } from "./repository.service";
import { Storage } from "@ionic/storage";
import { from } from "rxjs";
import { Member } from "../domain/Member";
import { toArray } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Idable } from "../domain/Idable";

describe("RepositoryService", () => {
  const STORAGE_KEY = "KEY";
  let repositoryService: RepositoryService;
  let storageSpy: jasmine.SpyObj<Storage>;

  it("#findAll should return stubbed value from a spy", () => {
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);
    const values = [new Member("1"), new Member("2")];
    storageSpy.get.and.returnValue(from(values.concat([null as Member])));

    repositoryService = new RepositoryService(storageSpy, null);

    repositoryService
      .findAll(STORAGE_KEY)
      .pipe(toArray())
      .subscribe(result => {
        expect(result).toEqual(values, "service returned stub value");
        expect(storageSpy.get.calls.count()).toBe(
          1,
          "spy method was called once"
        );
      });
  });

  it("#findAll should return nothing on empty value from a spy", () => {
    // create `getValue` spy on an object representing the ValueService
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);

    // set the value to return when the `getValue` spy is called.
    const values = [];
    storageSpy.get.and.returnValue(from(values));

    repositoryService = new RepositoryService(storageSpy, null);

    repositoryService
      .findAll(STORAGE_KEY)
      .pipe(toArray())
      .subscribe(result => {
        expect(result).toEqual(values, "service returned stub value");
        expect(storageSpy.get.calls.count()).toBe(
          1,
          "spy method was called once"
        );
      });
  });

  it("#findById should return stubbed value from a spy", () => {
    // create `getValue` spy on an object representing the ValueService
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);

    // set the value to return when the `getValue` spy is called.
    const expectedMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" }
    ];

    const stubValue = from(expectedMembers);
    storageSpy.get.and.returnValue(stubValue);

    repositoryService = new RepositoryService(storageSpy, null);

    repositoryService
      .findById(STORAGE_KEY, "2")
      .subscribe(
        (next: Idable) => expect(next.id).toEqual("2", "expected member"),
        error => fail("expected an error, not heroes")
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#findAllById should return stubbed value from a spy", () => {
    // create `getValue` spy on an object representing the ValueService
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);

    // set the value to return when the `getValue` spy is called.
    const initialMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" }
    ];

    const stubValue = from(initialMembers);
    storageSpy.get.and.returnValue(stubValue);

    repositoryService = new RepositoryService(storageSpy, null);

    const expectedResult: Member[] = [
      { id: "1", name: "1" },
      { id: "3", name: "3" }
    ];
    repositoryService
      .findAllById(STORAGE_KEY, ["1", "3"])
      .pipe(toArray())
      .subscribe(
        next => expect(next).toEqual(expectedResult, "expected member"),
        error => fail("received an error: " + error)
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#deleteById should return stubbed value from a spy", () => {
    // create `getValue` spy on an object representing the ValueService
    const storageSpy = jasmine.createSpyObj("Storage", ["get", "set"]);

    // set the value to return when the `getValue` spy is called.
    const initialMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" }
    ];
    const expectedResult: Member[] = [
      { id: "1", name: "1" },
      { id: "3", name: "3" }
    ];

    const stubValue = from(initialMembers);
    storageSpy.get.and.returnValue(stubValue);
    storageSpy.set.and.returnValue(from(expectedResult));

    repositoryService = new RepositoryService(storageSpy, null);

    repositoryService
      .deleteById(STORAGE_KEY, "2")
      .pipe(toArray())
      .subscribe(
        next => expect(next).toEqual(expectedResult, "expected member"),
        error => fail("received an error: " + error)
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
    expect(storageSpy.set.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.set.calls.mostRecent().args).toEqual([
      STORAGE_KEY,
      expectedResult
    ]);
  });

  it("#saveAll should save all", () => {
    const storageSpy = jasmine.createSpyObj("Storage", ["get", "set"]);
    const idServiceSpy = jasmine.createSpyObj("IdService", ["getId"]);

    // set the value to return when the `getValue` spy is called.
    const initialMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" }
    ];
    const newMembers: Member[] = [
      new Member("4"),
      { id: "2", name: "5" },
      new Member("4")
    ];

    const member1WithId: Member = new Member("4");
    member1WithId.id = "id";
    const member2WithId: Member = new Member("4");
    member2WithId.id = "id2";

    const expectedResult: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "5" },
      { id: "3", name: "3" },
      member1WithId,
      member2WithId
    ];

    const stubValue = from(initialMembers);
    storageSpy.get.and.returnValue(stubValue);
    storageSpy.set.and.returnValue(from(expectedResult));
    idServiceSpy.getId.and.returnValues("id", "id2");

    repositoryService = new RepositoryService(storageSpy, idServiceSpy);

    repositoryService
      .saveAll(STORAGE_KEY, newMembers)
      .pipe(toArray())
      .subscribe(
        next => expect(next).toEqual(expectedResult, "expected member"),
        error => fail("received an error: " + error)
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
    expect(storageSpy.set.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.set.calls.mostRecent().args).toEqual([
      STORAGE_KEY,
      expectedResult
    ]);
  });

  it("#save should save one", () => {
    const storageSpy = jasmine.createSpyObj("Storage", ["get", "set"]);
    const idServiceSpy = jasmine.createSpyObj("IdService", ["getId"]);

    // set the value to return when the `getValue` spy is called.
    const initialMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" }
    ];
    const newMember: Member = new Member("4");
    const memberWithId: Member = new Member("4");
    memberWithId.id = "id";

    const expectedResult: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" },
      memberWithId
    ];

    const stubValue = from(initialMembers);
    storageSpy.get.and.returnValue(stubValue);
    storageSpy.set.and.returnValue(from(expectedResult));
    idServiceSpy.getId.and.returnValues("id");

    repositoryService = new RepositoryService(storageSpy, idServiceSpy);

    repositoryService
      .save(STORAGE_KEY, newMember)
      .pipe(toArray())
      .subscribe(
        next => expect(next).toEqual(expectedResult, "expected member"),
        error => fail("received an error: " + error)
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
    expect(storageSpy.set.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.set.calls.mostRecent().args).toEqual([
      STORAGE_KEY,
      expectedResult
    ]);
  });

  it("#save should update one", () => {
    const storageSpy = jasmine.createSpyObj("Storage", ["get", "set"]);
    const idServiceSpy = jasmine.createSpyObj("IdService", ["getId"]);

    // set the value to return when the `getValue` spy is called.
    const initialMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" }
    ];
    const updatedMember: Member = new Member("4");
    updatedMember.id = "2";

    const expectedResult: Member[] = [
      { id: "1", name: "1" },
      updatedMember,
      { id: "3", name: "3" }
    ];

    const stubValue = from(initialMembers);
    storageSpy.get.and.returnValue(stubValue);
    storageSpy.set.and.returnValue(from(expectedResult));
    idServiceSpy.getId.and.returnValues("id");

    repositoryService = new RepositoryService(storageSpy, idServiceSpy);

    repositoryService
      .save(STORAGE_KEY, updatedMember)
      .pipe(toArray())
      .subscribe(
        next => expect(next).toEqual(expectedResult, "expected member"),
        error => fail("received an error: " + error)
      );
    expect(storageSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
    expect(storageSpy.set.calls.count()).toBe(1, "spy method was called once");
    expect(storageSpy.set.calls.mostRecent().args).toEqual([
      STORAGE_KEY,
      expectedResult
    ]);
  });
});
