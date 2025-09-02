import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardClientLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

    return (
      <div className="container">
        <div className="grid">
          {children}
        </div>
      </div>
    )
}

export default DashboardClientLayout;