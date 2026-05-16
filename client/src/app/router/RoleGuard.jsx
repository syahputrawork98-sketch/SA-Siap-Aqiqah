import { Navigate, useLocation } from 'react-router-dom';
import { getPersona } from "@/app/router/developerPersona";

/**
 * RoleGuard (Mock/Development)
 * In production, this would check against an actual Auth context or JWT.
 * For now, we use localStorage for testing role transitions.
 */
const RoleGuard = ({ allowedRoles, children }) => {
  const location = useLocation();
  
  // Mock auth: Get role from localStorage or default to public
  const currentRole = getPersona();

  // Check if role is allowed
  const isAllowed = allowedRoles.includes(currentRole);

  if (!isAllowed) {
    // Redirect to home if not allowed
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleGuard;
