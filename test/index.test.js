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
      const person = manager.getRelationship("ted", "Siblings");
      assert.equal(person, "NONE");
    });
  });

  context("Add Child", () => {
    it("can add a child", () => {
      const status = manager.addChild("flora", "peter", "m");
      assert.equal(status, "CHILD_ADDITION_SUCCESS");

      const son = manager.getRelationship("flora", "Son");
      assert.equal(son, "louis peter");
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

  it("returns the father name", () => {
    const father = manager.getRelationship("james", "Father-Name");
    assert.equal(father, "harry");
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

  it("returns maternal aunts", () => {
    const siblings = manager.getRelationship("remus", "Maternal-Aunt");
    assert.equal(siblings, "dominique");
  });

  it("returns maternal uncles", () => {
    const uncles = manager.getRelationship("james", "Maternal-Uncle");
    assert.equal(uncles, "bill charlie percy ronald");
  });

  it("returns paternal uncles", () => {
    const uncles = manager.getRelationship("william", "Paternal-Uncle");
    assert.equal(uncles, "albus");
  });

  it("returns paternal aunts", () => {
    const uncles = manager.getRelationship("william", "Paternal-Aunt");
    assert.equal(uncles, "lily");
  });

  it("returns sister in law", () => {
    const sistersInLaw = manager.getRelationship("ted", "Sister-In-Law");
    assert.equal(sistersInLaw, "dominique");
  });
});
