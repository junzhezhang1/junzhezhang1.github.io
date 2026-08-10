import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found content-shell">
      <p className="eyebrow">Not found</p>
      <h1>This path has not been mapped yet.</h1>
      <Link className="button button-dark" href="/">
        <ArrowLeft aria-hidden="true" size={18} />
        Return home
      </Link>
    </section>
  );
}
