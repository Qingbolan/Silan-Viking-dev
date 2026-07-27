import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Boxes,
  FileText,
  GitBranch,
  Home,
  Library,
  Mail,
  Map,
  Search,
} from "lucide-react";
import { primaryNavigation, secondaryNavigation } from "../lib/site/navigation";

const iconByLabel = {
  Home,
  Work: Boxes,
  Reading: BookOpen,
  Notes: FileText,
  Questions: Search,
  Library,
  Maps: Map,
} as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="shell">
      <aside className="identity-rail" aria-label="Silan.dev identity and navigation">
        <div className="identity-block">
          <Image
            className="avatar"
            src="/media/avatar.png"
            width={156}
            height={156}
            alt="Silan Hu"
            priority
          />
          <div>
            <p className="rail-kicker">silan.dev</p>
            <h1>Silan Hu</h1>
            <p className="rail-copy">
              AI systems research workbench. Formal identity stays on{" "}
              <a href="https://silan.tech">silan.tech</a>.
            </p>
          </div>
        </div>

        <nav className="rail-nav" aria-label="Primary">
          {primaryNavigation.map((item) => {
            const Icon = iconByLabel[item.label];
            return (
              <Link key={item.href} href={item.href}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <nav className="rail-nav secondary" aria-label="Secondary">
          {secondaryNavigation.map((item) => {
            const Icon = iconByLabel[item.label];
            return (
              <Link key={item.href} href={item.href}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="rail-footer">
          <a href="mailto:Silan.Hu@u.nus.edu" aria-label="Email Silan Hu">
            <Mail size={18} aria-hidden="true" />
            <span>Email</span>
          </a>
          <a href="https://silan.tech" aria-label="Open canonical identity site">
            <GitBranch size={18} aria-hidden="true" />
            <span>Canonical CV</span>
          </a>
        </div>
      </aside>
      <section className="page-surface">{children}</section>
    </main>
  );
}
