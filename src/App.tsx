import { Suspense } from "react";
import "./App.css";
import AppRouting from "./AppRouting";
import Header from "./core/header/Header";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Header />
          <AppRouting />
        </div>
      </Suspense>
    </>
  );
}

export default App;
