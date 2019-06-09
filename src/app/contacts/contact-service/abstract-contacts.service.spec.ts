import { TestBed } from "@angular/core/testing";

import { AbstractContactsService } from "./abstract-contacts.service";

describe("AbstractContactService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AbstractContactsService = TestBed.get(
      AbstractContactsService
    );
    expect(service).toBeTruthy();
  });
});
