import { makeAutoObservable } from "mobx";

class MainStore {
  difficultyCurrent = "Eazy";

  constructor() {
    makeAutoObservable(this);
  }

  difficultyChange(difficulty: string) {
    this.difficultyCurrent = difficulty;
  }

  health = 0;
  hunger = 0;
  money = 0;
  happiness = 0;

  easy() {
    if (this.difficultyCurrent === "Rich") {
      this.health = 100;
      this.hunger = 100;
      this.money = 100;
      this.happiness = 100;
    }

    if (this.difficultyCurrent === "Middle") {
      this.health = 70;
      this.hunger = 70;
      this.money = 70;
      this.happiness = 70;
    }

    if (this.difficultyCurrent === "Eazy") {
      this.health = 40;
      this.hunger = 40;
      this.money = 40;
      this.happiness = 40;
    }
  }

  // Buffs

  education = false;
  relationships = false;
  credit = false;

  getEducation(buff: boolean) {
    this.education = buff;
  }

  getRelationships(buff: boolean) {
    this.relationships = buff;
  }

  getCredit(buff: boolean) {
    this.credit = buff;
  }
}

export const mainStore = new MainStore();