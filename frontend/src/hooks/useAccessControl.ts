import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useAccessControl = () => {
  const { user } = useAuth();

  const hasRole = useMemo(() => {
    return (roles: string | string[]) => {
      if (!user) return false;
      const roleList = Array.isArray(roles) ? roles : [roles];
      return roleList.includes(user.role);
    };
  }, [user]);

  const checkAccess = useMemo(() => {
    return (roles?: string[]) => {
      if (!user) return "unauthenticated";
      if (roles && !hasRole(roles)) return "forbidden";
      return "granted";
    };
  }, [user, hasRole]);

  return { user, hasRole, checkAccess };
};
