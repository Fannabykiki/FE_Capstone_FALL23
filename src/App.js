import { Provider } from "react-redux";
import Navigations from "./navigations";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}

export default App;