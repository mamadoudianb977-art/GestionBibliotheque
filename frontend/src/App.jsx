import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Livres from "./pages/Livres";
import Auteurs from "./pages/Auteurs";
import Membres from "./pages/Membres";
import Emprunts from "./pages/Emprunts";
import Utilisateurs from "./pages/Utilisateurs";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/livres"
                    element={
                        <ProtectedRoute>
                            <Livres />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/auteurs"
                    element={
                        <ProtectedRoute>
                            <Auteurs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/membres"
                    element={
                        <ProtectedRoute>
                            <Membres />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/emprunts"
                    element={
                        <ProtectedRoute>
                            <Emprunts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/utilisateurs"
                    element={
                        <ProtectedRoute>
                            <Utilisateurs />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;