"use client";
import { PropsWithChildren } from "react";
import { getUserState } from "../store/user.slice";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

type Props = {};

const ProtectedRoute = ({ children }: PropsWithChildren<Props>) => {
  const { token } = useSelector(getUserState);

  if (!token) {
    redirect("/login");
  }

  return children;
};

export default ProtectedRoute;
