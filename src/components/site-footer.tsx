import Link from "next/link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer-minimal">
      <div className="content-shell footer-minimal-inner">
        <Link href="/">{siteConfig.name}</Link>
      </div>
    </footer>
  );
}
