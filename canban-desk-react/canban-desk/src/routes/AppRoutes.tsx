import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import MainLoadingFallback from "../pages/MainLoadingFallback";
import Graph from "../pages/Graph";

const Todo = lazy(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 3000);
  });

  return import("../pages/Todo");
});

function AppRoutes() {
  return (
    <Suspense fallback={<MainLoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Todo />} />
          <Route path="/statistics" element={<Graph />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
