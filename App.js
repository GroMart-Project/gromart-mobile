import { LogBox } from "react-native";
import Navigation from "./src/navigation";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}
