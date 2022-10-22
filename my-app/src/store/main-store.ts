import { makeAutoObservable } from "mobx";

class MainStore {
  difficultyCurrent = 0;

  constructor() {
    makeAutoObservable(this);
  }

  difficultyChange(difficulty: number) {
    this.difficultyCurrent = difficulty;
  }

  health = 0
  hunger = 0
  money = 0
  happiness = 0

  easy() {
      if (this.difficultyCurrent === 1) {
          this.health = 100
          this.hunger = 100
          this.money = 100
          this.happiness = 100
      }
  }

  medium() {
      if (this.difficultyCurrent === 2) {
          this.health = 70
          this.hunger = 70
          this.money = 70
          this.happiness = 70
      }
  }

  hard() {
      if (this.difficultyCurrent === 3) {
          this.health = 40
          this.hunger = 40
          this.money = 40
          this.happiness = 40
      }
  }
}

export const mainStore = new MainStore();
