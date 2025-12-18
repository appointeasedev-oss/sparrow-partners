import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { DashboardLayout } from "@/layouts/Dashboard";
import { getGroups } from "@/lib/actions";

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await auth();

  // If not logged in, go to marketing page
  if (!session?.user?.info) {
    redirect("/");
  }

  const { info: currentUser } = session.user;
  const groups = await getGroups(currentUser.groupIds ?? []);

  return (
    <DashboardLayout groups={groups} currentUser={currentUser}>
      {children}
    </DashboardLayout>
  );
}
