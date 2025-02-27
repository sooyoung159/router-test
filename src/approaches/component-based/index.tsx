import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Root from "./components/root.tsx";
import * as User from "./components/user.tsx";

export function ComponentBasedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/component-based" replace />} />
        <Route path="/component-based" element={<Root.Component />}>
          <Route path="users/:userId" element={<User.Component />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}