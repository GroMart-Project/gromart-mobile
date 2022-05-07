import { LogBox } from "react-native";
import Navigation from "./src/navigation";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
