export const BACKOFFICE_ROLE_UI = {
  admin: {
    panelRole: "Admin",
    sidebarRoleLabel: "Admin",
    sidebarNavClassName: "space-y-1",
    topbar: {
      initialProfile: {
        name: "Admin Siqah",
        email: "admin@siqah.id",
        avatar: "https://ui-avatars.com/api/?name=Admin+Siqah&background=e2b97f&color=fff",
      },
      notificationCount: 5,
      notifications: [],
    },
  },
  superadmin: {
    panelRole: "Superadmin",
    sidebarRoleLabel: "Superadmin",
    sidebarNavClassName: "space-y-2",
    topbar: {
      initialProfile: { name: "-", email: "-", avatar: "" },
      notifications: [],
    },
  },
  mitraCatering: {
    panelRole: "Mitra Catering",
    sidebarRoleLabel: "Mitra Catering",
    sidebarNavClassName: "space-y-1",
    topbar: {
      initialProfile: { name: "-", email: "-", avatar: "" },
      notifications: [],
    },
  },
  mitraKurir: {
    panelRole: "Mitra Kurir",
    sidebarRoleLabel: "Mitra Kurir",
    sidebarNavClassName: "space-y-1",
    topbar: {
      initialProfile: { name: "-", email: "-", avatar: "" },
      notifications: [],
    },
  },
  mitraHewan: {
    panelRole: "Mitra Hewan",
    sidebarRoleLabel: "Mitra Hewan",
    sidebarNavClassName: "space-y-1",
    topbar: {
      initialProfile: { name: "-", email: "-", avatar: "" },
      notifications: [],
    },
  },
};
