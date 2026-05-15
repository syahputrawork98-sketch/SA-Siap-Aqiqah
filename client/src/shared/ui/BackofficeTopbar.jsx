import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import BackofficeNotificationDropdown from "@/shared/ui/BackofficeNotificationDropdown";

export default function BackofficeTopbar({
  panelRole,
  profile,
  notifications = [],
  notificationCount,
  onLogout = () => console.log("Logout clicked"),
}) {
  const [openNotif, setOpenNotif] = useState(false);
  const badgeCount = notificationCount ?? notifications.length;

  return (
    <header className="flex items-center justify-between px-6 py-3 siqah-topbar">
      <div>
        <h2 className="text-lg font-semibold text-[#3b3b3b] tracking-wide">
          Panel <span className="siqah-accent-text">{panelRole}</span>
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            onClick={() => setOpenNotif((prev) => !prev)}
            className="relative siqah-icon-button"
          >
            <Bell size={20} className="text-[#3b3b3b] transition" />
            <span
              className="absolute -top-0.5 -right-0.5 bg-[#e2b97f] text-white
              text-[10px] font-semibold rounded-full px-1.5 shadow-sm"
            >
              {badgeCount}
            </span>
          </button>
          {openNotif ? (
            <BackofficeNotificationDropdown
              notifications={notifications}
              onClose={() => setOpenNotif(false)}
            />
          ) : null}
        </div>

        <div className="siqah-chip flex items-center gap-3 rounded-full px-3 py-1">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full border border-[#e7e1d8] object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#3b3b3b]">{profile.name}</p>
            <p className="text-xs text-[#7a7368]">{profile.email}</p>
          </div>
        </div>

        <button className="siqah-link-action flex items-center gap-1" onClick={onLogout}>
          <LogOut size={18} />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
