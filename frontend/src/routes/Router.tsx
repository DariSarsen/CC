import { Routes, Route, Navigate } from "react-router-dom";
import AccessGuard from "./AccessGuard";

import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Personal from "../pages/home/personal";


import Dashboard from "../pages/admin/createUser/dashboard";
import CreateUser from "../pages/admin/createUser/createUser";

import ResumePage from "../pages/resume/view-form/resumePage";               
import ResumeListPage from "../pages/resume/list/ResumeListPage";       
import ResumeDetailsPage from "../pages/resume/details/ResumeDetailsPage"; 

import VacancyFormPage from "../pages/vacancy/form/VacancyFormPage"; 
import VacancyDetailsPage from "../pages/vacancy/details/VacancyDetailsPage"; 
import VacancyListPage from "../pages/vacancy/list/VacancyListPage"; 

import NotificationListPage from "../pages/notification/list/NotificationListPage";
import NotificationFormPage from "../pages/notification/form/NotificationFormPage";
import NotificationDetailsPage from "../pages/notification/details/NotificationDetailsPage";

import MyResponsesPage from "../pages/response/MyResponsesPage";
import VacancyResponsesPage from "../pages/response/VacancyResponsesPage";

import Layout from "../components/layouts/Layout";

const AccessAll = <AccessGuard />;
const AccessStudent = <AccessGuard roles={["student"]} />;
const AccessAdmin = <AccessGuard roles={["admin"]} />;
const AccessCareerCenter = <AccessGuard roles={["career_center"]} />;
const AccessStudentOrCenter = <AccessGuard roles={["student", "career_center"]} />;
const AccessCompanyOrCenter = <AccessGuard roles={["company", "career_center"]} />;
const AccessCompany = <AccessGuard roles={["company"]} />;


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    <Route element={<Layout />}>

        <Route element={AccessAll}>
            <Route path="/personal" element={<Personal />} />
            <Route path="/vacancies" element={<VacancyListPage />} />
            <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />
        </Route>

        <Route element={AccessStudentOrCenter}>
            <Route path="/notifications" element={<NotificationListPage />} />
            <Route path="/notifications/:id" element={<NotificationDetailsPage />} />
        </Route>

        <Route element={AccessAdmin}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newUser" element={<CreateUser />} />
        </Route>

        <Route element={AccessStudent}>
            <Route path="/myResume" element={<ResumePage />} />
            <Route path="/myResponses" element={<MyResponsesPage />} />
        </Route>

        <Route element={AccessCompanyOrCenter}>
        <Route path="/resumes" element={<ResumeListPage />} />
        <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
        </Route>

        <Route element={AccessCompany}>
            <Route path="/vacancies/new" element={<VacancyFormPage />} />
            <Route path="/vacancies/:id/edit" element={<VacancyFormPage />} />
            <Route path="/vacancies/:vacancyId/responses" element={<VacancyResponsesPage />} />
        </Route>

        <Route element={AccessCareerCenter}>
            <Route path="/notifications/new" element={<NotificationFormPage />} />
            <Route path="/notifications/:id/edit" element={<NotificationFormPage />} />
        </Route>

    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>

);

export default AppRouter;
