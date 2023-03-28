import { createContext, ReactNode, useContext, useState } from "react";

type Project = {
  id: string;
  name: string;
  url: string;
};

type ContextType = {
  loggedIn: boolean;
  projects: Project[];
  login: (b: boolean) => void;
  logout: () => void;
  setProjects: (y: Project[]) => void;
  username: string;
  setUsername: (name: string) => void;
};

const defaultValue: ContextType = {
  loggedIn: false,
  projects: [],
  login: (b: boolean) => {},
  logout: () => {},
  setProjects: ([]) => {},
  username: "",
  setUsername: (name: string) => {},
};

const Context = createContext<ContextType>(defaultValue);

export function useAccount() {
  return useContext(Context);
}

export function AccountProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<ContextType>(defaultValue);

  function login(b: boolean) {
    setState({ ...state, loggedIn: b });
  }

  function logout() {
    setState({ ...state, loggedIn: false });
  }

  function setProjects(a: Project[]) {
    setState({ ...state, projects: a });
  }

  function setUsername(name: string) {
    setState({ ...state, username: name });
  }
  return (
    <Context.Provider
      value={{
        ...state,
        login: login,
        logout: logout,
        setProjects,
        setUsername,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
