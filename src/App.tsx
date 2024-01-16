import { Admin, Resource, ListGuesser, Layout } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UsersList } from "./users";
import { useState, useEffect } from "react";
import { ThemeOptions } from "@mui/material/styles";

// some types
type Listener = void | null;
type Mode = "dark" | "light";

// define custom layout without menu, appbar, and sidebar
const MyLayout = (props: any) => (
  <Layout
    {...props}
    appBar={() => null}
    menu={() => null}
    sidebar={() => null}
  />
);

// basic definition of themes
const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057"
    }
  }
};

const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057"
    }
  }
};

export const App = () => {
  // states for the mode and the eventListener
  const [listener, setListener] = useState<Listener>(null);
  const [mode, setMode] = useState<Mode>("dark");
  // set RAStore.theme manually because control elements are gone
  localStorage.setItem("RAStore.theme", "dark");
  useEffect(() => {
    // define new event listener on local storage
    const myListener = window.addEventListener("storage", () => {
      setMode(localStorage.getItem("mode") == "1" ? "dark" : "light");
      // set RAStore.theme menually because control elements are gone
      localStorage.setItem(
        "RAStore.theme",
        localStorage.getItem("mode") == "1" ? "dark" : "light"
      );
    });
    // store event listener in the respective state hook
    setListener(myListener);
    // function to remove event listener
    const removeListener = (theListener: any) => {
      window.removeEventListener("storage", theListener);
      setListener(null);
    };
    // return the remove function -> event listener is removed before the component App is unmounted
    return removeListener(listener);
    // empty array at the end of useEffect -> useEffect callback is executed once after mounting component App
    // eslint disable command to get rid of eslint warning for missing dependencies
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  return (
    <Admin
      layout={MyLayout}
      dataProvider={dataProvider}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
      defaultTheme={mode}>
      <Resource name="posts" list={ListGuesser} />
      <Resource name="users" list={UsersList} />
    </Admin>
  );
};
