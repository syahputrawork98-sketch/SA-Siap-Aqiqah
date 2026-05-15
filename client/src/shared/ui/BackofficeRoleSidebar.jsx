import BackofficeSidebar from "@/shared/ui/BackofficeSidebar";
import {
  ADMIN_SIDEBAR_MENU,
  BACKOFFICE_ROLE_UI,
  MITRA_CATERING_SIDEBAR_MENU,
  MITRA_HEWAN_SIDEBAR_MENU,
  MITRA_KURIR_SIDEBAR_MENU,
  SUPERADMIN_SIDEBAR_MENU,
} from "@/shared/config/backoffice";

const SIDEBAR_MENU_BY_ROLE = {
  admin: ADMIN_SIDEBAR_MENU,
  superadmin: SUPERADMIN_SIDEBAR_MENU,
  mitraCatering: MITRA_CATERING_SIDEBAR_MENU,
  mitraKurir: MITRA_KURIR_SIDEBAR_MENU,
  mitraHewan: MITRA_HEWAN_SIDEBAR_MENU,
};

export default function BackofficeRoleSidebar({ role = "admin" }) {
  const roleUi = BACKOFFICE_ROLE_UI[role] ?? BACKOFFICE_ROLE_UI.admin;
  const menuItems = SIDEBAR_MENU_BY_ROLE[role] ?? ADMIN_SIDEBAR_MENU;

  return (
    <BackofficeSidebar
      menuItems={menuItems}
      roleLabel={roleUi.sidebarRoleLabel}
      navClassName={roleUi.sidebarNavClassName}
    />
  );
}
