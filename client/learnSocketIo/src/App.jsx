import { RouterProvider } from "react-router-dom";
import { routers } from "./routers/routers";

export default function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}
