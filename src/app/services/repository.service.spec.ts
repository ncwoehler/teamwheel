import { RepositoryService } from "./repository.service";
import { from } from "rxjs";
import { Member } from "../domain/Member";
import { toArray } from "rxjs/operators";
import { Idable } from "../domain/Idable";
import { NGXLogger } from "ngx-logger";

describe("RepositoryService", () => {
  const STORAGE_KEY = "KEY";
  let repositoryService: RepositoryService;
  const loggerSpy: NGXLogger = jasmine.createSpyObj("NGXLogger", ["debug"]);

  const mockResult = (members: Member[]) =>
    new Promise(resolve => {
      resolve(members);
    });

  it("#findAll should return values from a spy", () => {
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);

    const values = [new Member("1"), new Member("2")];
    storageSpy.get.and.returnValue(mockResult(values.concat([null as Member])));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

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
    storageSpy.get.and.returnValue(mockResult(values));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

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

  it("#findAll should return nothing on null value from a spy", () => {
    // create `getValue` spy on an object representing the ValueService
    const storageSpy = jasmine.createSpyObj("Storage", ["get"]);

    // set the value to return when the `getValue` spy is called.
    const values = null;
    storageSpy.get.and.returnValue(mockResult(values));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

    repositoryService
      .findAll(STORAGE_KEY)
      .pipe(toArray())
      .subscribe(result => {
        expect(result).toEqual([], "service returned stub value");
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

    storageSpy.get.and.returnValue(mockResult(expectedMembers));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

    repositoryService.findById(STORAGE_KEY, "2").subscribe(
      (next: Idable) => {
        expect(next.id).toEqual("2", "expected member");
        expect(storageSpy.get.calls.count()).toBe(
          1,
          "spy method was called once"
        );
      },
      error => fail("expected an error, not heroes" + error)
    );
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

    storageSpy.get.and.returnValue(mockResult(initialMembers));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

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

    storageSpy.get.and.returnValue(mockResult(initialMembers));
    storageSpy.set.and.returnValue(mockResult(expectedResult));

    repositoryService = new RepositoryService(storageSpy, null, loggerSpy);

    repositoryService
      .deleteById(STORAGE_KEY, "2")
      .pipe(toArray())
      .subscribe(
        next => {
          expect(next).toEqual(expectedResult, "expected member");
          expect(storageSpy.get.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.mostRecent().args).toEqual([
            STORAGE_KEY,
            expectedResult
          ]);
        },
        error => fail("received an error: " + error)
      );
  });

  it("#saveAll should save all and return changed", () => {
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

    const expectedStoredMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "5" },
      { id: "3", name: "3" },
      member1WithId,
      member2WithId
    ];

    const expectedResult: Member[] = [
      { id: "2", name: "5" },
      member1WithId,
      member2WithId
    ];

    storageSpy.get.and.returnValue(mockResult(initialMembers));
    storageSpy.set.and.returnValue(mockResult(expectedStoredMembers));
    idServiceSpy.getId.and.returnValues("id", "id2");

    repositoryService = new RepositoryService(
      storageSpy,
      idServiceSpy,
      loggerSpy
    );

    repositoryService
      .saveAll(STORAGE_KEY, newMembers)
      .pipe(toArray())
      .subscribe(
        next => {
          expect(next).toEqual(expectedResult, "expected member");
          expect(storageSpy.get.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.mostRecent().args).toEqual([
            STORAGE_KEY,
            expectedStoredMembers
          ]);
        },
        error => fail("received an error: " + error)
      );
  });

  it("#save should save one and return entity", () => {
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

    const expectedStoredMembers: Member[] = [
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" },
      memberWithId
    ];

    const expectedResult: Member[] = [memberWithId];

    storageSpy.get.and.returnValue(mockResult(initialMembers));
    storageSpy.set.and.returnValue(mockResult(expectedStoredMembers));
    idServiceSpy.getId.and.returnValues("id");

    repositoryService = new RepositoryService(
      storageSpy,
      idServiceSpy,
      loggerSpy
    );

    repositoryService
      .save(STORAGE_KEY, newMember)
      .pipe(toArray())
      .subscribe(
        next => {
          expect(next).toEqual(expectedResult, "expected member");
          expect(storageSpy.get.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.mostRecent().args).toEqual([
            STORAGE_KEY,
            expectedStoredMembers
          ]);
        },
        error => fail("received an error: " + error)
      );
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

    const expectedStoredMembers: Member[] = [
      { id: "1", name: "1" },
      updatedMember,
      { id: "3", name: "3" }
    ];

    const expectedResult: Member[] = [updatedMember];

    storageSpy.get.and.returnValue(mockResult(expectedStoredMembers));
    storageSpy.set.and.returnValue(mockResult(expectedStoredMembers));
    idServiceSpy.getId.and.returnValues("id");

    repositoryService = new RepositoryService(
      storageSpy,
      idServiceSpy,
      loggerSpy
    );

    repositoryService
      .save(STORAGE_KEY, updatedMember)
      .pipe(toArray())
      .subscribe(
        next => {
          expect(next).toEqual(expectedResult, "expected member");
          expect(storageSpy.get.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.count()).toBe(
            1,
            "spy method was called once"
          );
          expect(storageSpy.set.calls.mostRecent().args).toEqual([
            STORAGE_KEY,
            expectedStoredMembers
          ]);
        },
        error => fail("received an error: " + error)
      );
  });
});
