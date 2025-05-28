import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessControl } from "../hooks/useAccessControl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  roles?: string[];
};

const AccessGuard = ({ roles }: Props) => {

  const { isLoading } = useAuth();
  const { checkAccess } = useAccessControl();
  const [ access, setAccess ] = useState<"loading" | "granted" | "unauthenticated" | "forbidden">("loading");

  useEffect(() => {
    if (isLoading) return;
    const result = checkAccess(roles);
    setAccess(result);

    if (result === "forbidden") {
      console.error("Access denied: You do not have permission to view this page.");
      toast.error("У вас нет доступа!");
    }
  }, [roles, checkAccess, isLoading]);

  if (isLoading || access === "loading") return null;
  if (access === "unauthenticated") return <Navigate to="/login" />;
  if (access === "forbidden") return <Navigate to="/" />;

  return <Outlet />;
};

export default React.memo(AccessGuard);

