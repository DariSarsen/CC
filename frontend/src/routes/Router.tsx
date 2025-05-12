import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

import Home from "../pages/home/home/home";
import Login from "../pages/auth/login/login";
import Dashboard from "../pages/dashboard/dashboard/dashboard";
import CreateUser from "../pages/admin/createUser/createUser";

import ResumePage from "../pages/resume/list/resumePage";               
import ResumeListPage from "../pages/resume/form/ResumeListPage";       
import ResumeDetailsPage from "../pages/resume/details/ResumeDetailsPage"; 

import VacancyFormPage from "../pages/vacancy/form/VacancyFormPage"; 
import VacancyDetailsPage from "../pages/vacancy/details/VacancyDetailsPage"; 
import VacancyListPage from "../pages/vacancy/list/VacancyListPage"; 

import NotificationListPage from "../pages/notification/list/NotificationListPage";
import NotificationFormPage from "../pages/notification/form/NotificationFormPage";
import NotificationDetailsPage from "../pages/notification/details/NotificationDetailsPage";

import MyResponsesPage from "../pages/response/MyResponsesPage";
import VacancyResponsesPage from "../pages/response/VacancyResponsesPage";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vacancies" element={<VacancyListPage />} />
      <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole={["student", "career_center"]} />}>
      <Route path="/notifications" element={<NotificationListPage />} />
      <Route path="/notifications/:id" element={<NotificationDetailsPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole="admin" />}>
      <Route path="/newUser" element={<CreateUser />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole="student" />}>
      <Route path="/myResume" element={<ResumePage />} />
      <Route path="/myResponses" element={<MyResponsesPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole={["company", "career_center"]} />}>
      <Route path="/resumes" element={<ResumeListPage />} />
      <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole={"company"} />}>
      <Route path="/vacancies/new" element={<VacancyFormPage />} />
      <Route path="/vacancies/:id/edit" element={<VacancyFormPage />} />
      <Route path="/vacancies/:vacancyId/responses" element={<VacancyResponsesPage />} />

    </Route>
      
    <Route element={<ProtectedRoute requiredRole={"career_center"} />}>
      <Route path="/notifications/new" element={<NotificationFormPage />} />
      <Route path="/notifications/:id/edit" element={<NotificationFormPage />} />
    </Route>
    
    {/* <Route path="*" element={<Navigate to="/" />} /> */}
  </Routes>
);

export default AppRouter;
