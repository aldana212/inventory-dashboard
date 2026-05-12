import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import MovementsPage from "../features/movements/list/MovementsPage";
import ProductsPage from "../features/products/list/ProductsPage";
import ProductDetailPage from "../features/products/detail/ProductDetailPage";
import ProductForm from "../features/products/form/ProductForm";
import MovementsForm from "../features/movements/form/movementsForm";
import CategoryPage from "../features/categories/list/CategoryPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "../features/users/list/UsersPage";
import Auth from "../features/auth/pages/Auth";
import ChangeTemporaryPasswordPage from "../features/auth/pages/ChangeTemporaryPasswordPage";
import RequireRole from "./RequireRole";
import SettingsPage from "../features/settings/settingsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<Auth />} />
          <Route
            path="change-temporary-password"
            element={<ChangeTemporaryPasswordPage />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* HOME */}
            <Route path="/" element={<DashboardPage />} />
            {/* 📦 PRODUCTOS */}
            <Route
              element={
                <RequireRole
                  allowedRoles={["ADMIN", "SUPERVISOR", "OPERADOR", "VIEWER"]}
                />
              }
            >
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
            </Route>
            {/* ✏️ CREAR / EDITAR */}
            <Route
              element={<RequireRole allowedRoles={["ADMIN", "SUPERVISOR"]} />}
            >
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
            </Route>
            {/* 🔄 MOVIMIENTOS */}
            <Route
              element={
                <RequireRole
                  allowedRoles={["ADMIN", "SUPERVISOR", "OPERADOR"]}
                />
              }
            >
              <Route path="/movements" element={<MovementsPage />} />
              <Route path="/movements/:type/new" element={<MovementsForm />} />
            </Route>

            {/* 👥 USUARIOS */}
            <Route element={<RequireRole allowedRoles={["ADMIN", "SUPERVISOR"]} />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
            
            {/* 🏷️ CATEGORÍAS */}
            <Route
              element={
                <RequireRole
                  allowedRoles={["ADMIN", "SUPERVISOR", "OPERADOR", "VIEWER"]}
                />
              }
            >
              <Route path="/category" element={<CategoryPage />} />
            </Route>

            {/* SETTINGS */}
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
