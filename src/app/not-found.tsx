import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="text-center px-4">
        <p className="text-8xl font-bold" style={{ color: "var(--accent)" }}>404</p>
        <h1 className="mt-4 text-2xl font-bold" style={{ color: "var(--fg)" }}>Page not found</h1>
        <p className="mt-2" style={{ color: "var(--fg-muted)" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-colors"
          style={{ background: "var(--accent)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
