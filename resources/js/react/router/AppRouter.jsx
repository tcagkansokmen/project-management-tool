import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Login from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProjectDetail from "../pages/ProjectDetail.jsx";
import AddProject from "../pages/AddProject.jsx";
import EditProject from "../pages/EditProject.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={
                <AuthLayout>
                    <Login />
                </AuthLayout>
            } />
            <Route path="/" element={
                <MainLayout>
                    <Home />
                </MainLayout>
            } />
            <Route path="/projects" element={
                <MainLayout>
                    <Projects />
                </MainLayout>
            } />
            <Route path="/projects/add" element={
                <MainLayout>
                    <AddProject />
                </MainLayout>
            } />
            <Route path="/projects/edit/:id" element={
                <MainLayout>
                    <EditProject />
                </MainLayout>
            } />
            <Route path="/projects/:id" element={
                <MainLayout>
                    <ProjectDetail />
                </MainLayout>
            } />
        </Routes>
    );
};

export default AppRouter;
