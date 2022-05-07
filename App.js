import { LogBox } from "react-native";
import Navigation from "./src/navigation";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
