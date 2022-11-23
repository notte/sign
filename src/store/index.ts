import { defineStore } from "pinia";

export const signStore = defineStore("id", {
  persist: true,
  state: () => {
    return {
      signOne: "",
      signSec: "",
    };
  },
  actions: {
    setSignOne(sign: string) {
      this.signOne = sign;
    },
    setSignSec(sign: string) {
      this.signSec = sign;
    },
  },
});
