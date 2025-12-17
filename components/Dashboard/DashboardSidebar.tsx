import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo, useState } from "react";
import {
  DASHBOARD_DRAFTS_URL,
  DASHBOARD_GROUP_URL,
  DASHBOARD_URL,
} from "@/constants";
import { FileIcon, FolderIcon, UserIcon } from "@/icons";
import { LinkButton } from "@/primitives/Button";
import { Group } from "@/types";
import { normalizeTrailingSlash } from "@/utils";
import { ChatSidebar, ChatWindow } from "../Chat";
import styles from "./DashboardSidebar.module.css";

interface Props extends ComponentProps<"div"> {
  groups: Group[];
}

interface SidebarLinkProps extends Omit<
  ComponentProps<typeof LinkButton>,
  "href"
> {
  href: string;
}

function SidebarLink({
  href,
  children,
  className,
  ...props
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(
    () => normalizeTrailingSlash(pathname) === normalizeTrailingSlash(href),
    [pathname, href]
  );

  return (
    <LinkButton
      className={clsx(className, styles.sidebarLink)}
      data-active={isActive || undefined}
      href={href}
      variant="subtle"
      {...props}
    >
      {children}
    </LinkButton>
  );
}

export function DashboardSidebar({ className, groups, ...props }: Props) {
  const [showChat, setShowChat] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);
  return (
    <div className={clsx(className, styles.sidebar)} {...props}>
      <nav className={styles.navigation}>
        <div className={styles.category}>
          <ul className={styles.list}>
            <li>
              <SidebarLink href={DASHBOARD_URL} icon={<FileIcon />}>
                All
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href={DASHBOARD_DRAFTS_URL} icon={<FileIcon />}>
                Drafts
              </SidebarLink>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <button
            className={clsx(styles.chatToggle, { [styles.chatToggleActive]: showChat })}
            onClick={() => setShowChat(!showChat)}
          >
            <UserIcon /> Chat
          </button>
        </div>
        <div className={styles.category}>
          <span className={styles.categoryTitle}>Groups</span>
          <ul className={styles.list}>
            {groups.map((group) => {
              return (
                <li key={group.id}>
                  <SidebarLink
                    href={DASHBOARD_GROUP_URL(group.id)}
                    icon={<FolderIcon />}
                  >
                    {group.name}
                  </SidebarLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
      {showChat && (
        <div className={styles.chatContainer}>
          {!selectedChatUser ? (
            <ChatSidebar
              selectedUserId={selectedChatUser || undefined}
              onSelectUser={(userId) => setSelectedChatUser(userId)}
            />
          ) : (
            <div className={styles.chatWindowContainer}>
              <button
                className={styles.backButton}
                onClick={() => setSelectedChatUser(null)}
              >
                ← Back
              </button>
              <ChatWindow userId={selectedChatUser} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
