import { Navigate, Outlet } from "react-router";
import { Path } from "@/common/routing";
import { ReactNode } from "react";

type Props = {
  isAllowed: boolean;
  children?: ReactNode;
  redirectPath?: string;
};

export const ProtectedRoute = ({
  children,
  isAllowed,
  redirectPath = Path.Login,
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};
