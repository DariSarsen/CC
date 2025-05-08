import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";

import Home from "../pages/home";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import CreateUser from "../pages/createUser";
import ResumePage from "../pages/resumePage";               
import ResumeListPage from "../pages/ResumeListPage";       
import ResumeDetailsPage from "../pages/ResumeDetailsPage"; 

import VacancyFormPage from "../pages/VacancyFormPage"; 



const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    {/* общие защищённые */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    {/* админ */}
    <Route element={<ProtectedRoute requiredRole="admin" />}>
      <Route path="/newUser" element={<CreateUser />} />
    </Route>

    {/* студент — своё резюме */}
    <Route element={<ProtectedRoute requiredRole="student" />}>
      <Route path="/myResume" element={<ResumePage />} />
    </Route>

    {/* компания и ЦК — все резюме */}
    <Route element={<ProtectedRoute requiredRole={["company", "career_center"]} />}>
      <Route path="/resumes" element={<ResumeListPage />} />
      <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole={"company"} />}>
      {/* <Route path="/myVacancies" element={<VacancyListPage />} /> */}
      <Route path="/vacancies/new" element={<VacancyFormPage />} />
      <Route path="/vacancies/:id/edit" element={<VacancyFormPage />} />
      {/* <Route path="/vacancies/:id" element={<VacancyDetailsPage />} /> */}
    </Route>
      
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
