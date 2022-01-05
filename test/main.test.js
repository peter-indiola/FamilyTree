const FamilyManager = require("../main");
const assert = require("assert");

describe("Family Manager", () => {
  let manager;

  beforeEach(() => {
    manager = new FamilyManager();
  });

  it("returns the mother name", () => {
    const mother = manager.getRelationship("bill", "Mother-Name");
    assert.equal(mother, "margret");
  });

  it("returns the siblings", () => {
    const siblings = manager.getRelationship("bill", "Siblings");
    assert.equal(siblings, "charlie percy ronald ginerva");
  });

  it("returns the son", () => {
    const sons = manager.getRelationship("margret", "Son");
    assert.equal(sons, "bill charlie percy ronald");
  });

  it("returns the daughter", () => {
    const sons = manager.getRelationship("margret", "Daughter");
    assert.equal(sons, "ginerva");
  });

  it("returns the siblings", () => {
    const siblings = manager.getRelationship("bill", "Siblings");
    assert.equal(siblings, "charlie percy ronald ginerva");
  });
});
