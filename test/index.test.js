const FamilyManager = require("../familyManager");
const assert = require("assert");

describe("Family Manager", () => {
  let manager;

  beforeEach(() => {
    manager = new FamilyManager();
  });

  context("Person Not Found", () => {
    it("return the proper message", () => {
      const person = manager.getRelationship("foobar", "Siblings");
      assert.equal(person, "PERSON_NOT_FOUND");
    });
  });

  context("No Relationship(s) - NONE", () => {
    it("returns the proper message", () => {
      const person = manager.getRelationship("louis", "Siblings");
      assert.equal(person, "NONE");
    });
  });

  context("Add Child", () => {
    it("can add a child", () => {
      const status = manager.addChild("flora", "peter", "m");
      assert.equal(status, "CHILD_ADDITION_SUCCESS");

      const son = manager.getRelationship("flora", "Son");
      assert.equal(son, "peter");
    });

    it("can't a child", () => {
      const status = manager.addChild("ted", "peter", "m");
      assert.equal(status, "CHILD_ADDITION_FAILED");
    });
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
