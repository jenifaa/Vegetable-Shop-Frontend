import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <>
      <div>
        <CommonLayout>
          <Outlet></Outlet>
        </CommonLayout>
      </div>
    </>
  );
}

export default App;
