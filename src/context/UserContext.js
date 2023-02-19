import { createContext } from 'react';

const UserContext = createContext({
  userInfo: {},
  setUsetInfo: () => {},
});

export { UserContext };
