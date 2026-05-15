import BackofficeTopbar from "@/shared/ui/BackofficeTopbar";
import { BACKOFFICE_ROLE_UI } from "@/shared/config/backoffice";

export default function BackofficeRoleTopbar({ role = "admin" }) {
  const roleUi = BACKOFFICE_ROLE_UI[role] ?? BACKOFFICE_ROLE_UI.admin;
  
  // Simplified for Batch 7: Using static data until hooks are migrated
  const fallbackTopbar = roleUi.topbar ?? BACKOFFICE_ROLE_UI.admin.topbar;

  const topbarData = {
    profile: fallbackTopbar.initialProfile,
    notifications: fallbackTopbar.notifications,
    notificationCount: fallbackTopbar.notificationCount ?? fallbackTopbar.notifications?.length ?? 0,
  };

  return (
    <BackofficeTopbar
      panelRole={roleUi.panelRole}
      profile={topbarData.profile}
      notificationCount={topbarData.notificationCount}
      notifications={topbarData.notifications}
    />
  );
}
