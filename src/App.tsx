// external
import { Provider } from "react-redux";
// components
import { Toastify } from "@components";
import { Dashboard } from "@pages";
// other
import { store } from "@store";
// styles
import { GlobalStyle } from "@styles";


function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Dashboard />
        <Toastify />
      </Provider>
    </>
  );
}

export default App;
