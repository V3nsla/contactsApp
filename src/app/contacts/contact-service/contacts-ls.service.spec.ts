import { TestBed } from "@angular/core/testing";

import { ContactsLSService } from "./contacts-ls.service";

describe("ContactsLSService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ContactsLSService = TestBed.get(ContactsLSService);
    expect(service).toBeTruthy();
  });
});
