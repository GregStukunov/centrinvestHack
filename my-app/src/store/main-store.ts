import { makeAutoObservable } from "mobx";

class MainStore {
  difficultyCurrent = "";

  constructor() {
    makeAutoObservable(this);
  }

  difficultyChange(difficulty: string) {
    this.difficultyCurrent = difficulty;
  }
}

export const mainStore = new MainStore();
