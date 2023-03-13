import { createContext } from 'react';

const UserContext = createContext({
  userInfo: {},
  setUserInfo: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export { UserContext };
