import { Routes, Route } from "react-router-dom";
import App from "./App";
import JobDetails from "./components/JobDetails";

export default function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/job-details/:id" element={<JobDetails />} />
    </Routes>
  );
}
