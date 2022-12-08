import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";

class RootStore {
  // All modules
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);

export { useStore };
