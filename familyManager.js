class FamilyManager {
  constructor() {
    this.initFamily();
  }

  initFamily() {
    this.genderList = {
      arthur: "m",
      margret: "f",
      bill: "m",
      flora: "f",
      charlie: "m",
      percy: "m",
      audrey: "f",
      ronald: "m",
      helen: "f",
      ginerva: "f",
      harry: "m",
      victoire: "f",
      ted: "m",
      dominique: "f",
      louis: "m",
      molly: "f",
      lucy: "f",
      malfoy: "m",
      rose: "f",
      hugo: "m",
      darcy: "f",
      james: "m",
      alice: "f",
      albus: "m",
      lily: "f",
      remus: "m",
      draco: "m",
      aster: "f",
      william: "m",
      ron: "m",
      ginny: "f",
    };

    // Tuple
    // [[string, string]]
    this.couplesList = [
      ["arthur", "margret"],
      ["bill", "flora"],
      ["percy", "audrey"],
      ["ronald", "helen"],
      ["ginerva", "harry"],
      ["victoire", "ted"],
      ["malfoy", "rose"],
      ["darcy", "james"],
      ["alice", "albus"],
    ];

    //{ key: []}
    this.childList = {
      margret: ["bill", "charlie", "percy", "ronald", "ginerva"],
      flora: ["victoire", "dominique", "louis"],
      ginerva: ["james", "albus", "lily"],
      victoire: ["remus"],
      rose: ["draco", "aster"],
      darcy: ["william"],
      alice: ["ron", "ginny"],
    };
  }

  addChild(parentName, childName, gender) {
    const spouse = this.getSpouseName(parentName);

    if (spouse && this.genderList[parentName] === "f") {
      this.genderList[childName] = gender;
      this.childList[parentName].push(childName);
      const mother = this.getMotherName(childName);
      if (mother === parentName) {
        return "CHILD_ADDITION_SUCCESS";
      }
    }

    return "CHILD_ADDITION_FAILED";
  }

  getRelationship(name, relation) {
    const methodName = `get${relation.replace(/-/g, "")}`;
    const isDefined = this[methodName];
    if (!isDefined) {
      return "Unknown or invalid relation: ${relation)";
    }

    if (!this.genderList[name]) {
      return "PERSON_NOT_FOUND";
    }

    const result = this[methodName](name);
    if (result === null || result.length === 0) {
      return "NONE";
    }

    if (!Array.isArray(result)) {
      return result;
    }

    return result.join(" ");
  }

  getSon(name) {
    const children = this.getChildren(name);
    return children
      ? children.filter((child) => this.genderList[child] === "m")
      : null;
  }

  getDaughter(name) {
    const children = this.getChildren(name);
    return children
      ? children.filter((child) => this.genderList[child] === "f")
      : null;
  }

  getChildren(name) {
    return this.childList[name];
  }

  getMaternalAunt(name) {
    const mother = this.getMotherName(name);
    return mother ? this.getSisters(mother) : null;
  }

  getMaternalUncle(name) {
    const mother = this.getMotherName(name);
    return mother ? this.getBrothers(mother) : null;
  }

  getPaternalUncle(name) {
    const father = this.getFatherName(name);
    return father ? this.getBrothers(father) : null;
  }

  getPaternalAunt(name) {
    const father = this.getFatherName(name);
    return father ? this.getSisters(father) : null;
  }

  getSisterInLaw(name) {
    const spouse = this.getSpouseName(name);

    if (spouse) {
      return this.getSisters(spouse);
    } else if (!spouse) {
      let siblings = this.getSiblings(name);

      siblings = siblings.map((s) => this.getSpouseName(s));
      return siblings.filter((s) => s);
    }
    return null;
  }

  getBrotherInLaw(name) {
    const spouse = this.getSpouseName(name);

    if (spouse) {
      return this.getBrothers(spouse);
    } else if (!spouse) {
      let siblings = this.getSiblings(name);

      siblings = siblings.map((s) => this.getSpouseName(s));
      return siblings.filter((s) => s);
    }

    return null;
  }

  getSisters(name) {
    const siblings = this.getSiblings(name);
    return siblings.filter((s) => this.genderList[s] !== "m");
  }

  getBrothers(name) {
    const siblings = this.getSiblings(name);
    return siblings.filter((s) => this.genderList[s] !== "f");
  }

  getSiblings(name) {
    const mother = this.getMotherName(name);
    return mother ? this.childList[mother].filter((c) => c !== name) : null;
  }

  getSpouseName(name) {
    let couple =
      this.couplesList.filter((couple) => couple.indexOf(name) > -1)[0] || null;
    if (couple) {
      return name === couple[0] ? couple[1] : couple[0];
    }
    return null;
  }

  getFatherName(name) {
    const mother = this.getMotherName(name);
    const father = mother ? this.getSpouseName(mother) : null;
    return father;
  }

  getMotherName(name) {
    for (let mother in this.childList) {
      if (this.childList[mother].indexOf(name) > -1) {
        return mother;
      }
    }

    return null;
  }
}

module.exports = FamilyManager;
