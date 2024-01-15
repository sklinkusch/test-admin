import { Admin, Resource, ListGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UsersList } from "./users";
import { useState, useEffect } from "react";
/* eslint-disable react-hooks/exhaustive-deps */

type Listener = void | null;
type Mode = "dark" | "light";

export const App = () => {
  const [listener, setListener] = useState<Listener>(null);
  const [mode, setMode] = useState<Mode>("dark");
  useEffect(() => {
    const myListener = window.addEventListener("storage", () => {
      setMode(localStorage.getItem("mode") == "1" ? "dark" : "light");
    });
    setListener(myListener);
    const removeListener = (theListener: any) => {
      window.removeEventListener("storage", theListener);
    };
    return removeListener(listener);
  }, []);
  return (
    <Admin dataProvider={dataProvider} defaultTheme={mode}>
      <Resource name="posts" list={ListGuesser} />
      <Resource name="users" list={UsersList} />
    </Admin>
  );
};
