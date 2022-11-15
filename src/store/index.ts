import { defineStore } from "pinia";

export const signStore = defineStore("id", {
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
  persist: {
    enabled: true,
  },
});
