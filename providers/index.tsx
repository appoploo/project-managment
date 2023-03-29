import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  username: string;
  setUsername: (name: string) => void;
};

const defaultValue: ContextType = {
  username: "",
  setUsername: (name: string) => {},
};

const Context = createContext<ContextType>(defaultValue);

export function useAccount() {
  return useContext(Context);
}

export function AccountProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<ContextType>(defaultValue);

  function setUsername(name: string) {
    setState({ ...state, username: name });
  }
  return (
    <Context.Provider
      value={{
        ...state,

        setUsername,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
