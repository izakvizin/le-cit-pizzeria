import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// Shared frame for the "not found" and "error" pages, in the site's own colours.
function StatusPage({ code, title, text, children }: { code: string; title: string; text: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald px-6 text-cream">
      <div className="absolute inset-0 marble-pattern-cream opacity-30 pointer-events-none" />
      <div className="relative max-w-lg text-center">
        <a href="/" className="serif text-2xl tracking-display">
          LE CITÉ
        </a>
        <p className="mt-12 text-bronze tracking-wide-2 uppercase text-[11px]">{code}</p>
        <h1 className="mt-4 serif leading-tight" style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}>
          {title}
        </h1>
        <span className="block hairline w-16 mx-auto my-8" />
        <p className="serif italic text-cream/80 text-lg">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">{children}</div>
      </div>
    </div>
  );
}

const statusButton =
  "border border-bronze px-7 py-3.5 text-[12px] tracking-wide-2 uppercase text-cream hover:bg-bronze transition-colors";

function NotFoundComponent() {
  return (
    <StatusPage
      code="404 · Pagina non trovata · Page not found"
      title="Te strani ni"
      text="Morda je bila premaknjena ali pa se je v povezavo prikradla napaka."
    >
      <Link to="/" className={statusButton}>
        Na začetno stran
      </Link>
    </StatusPage>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <StatusPage
      code="Errore · Something went wrong"
      title="Stran se ni naložila"
      text="Pri nas je šlo nekaj narobe. Poskusite znova ali se vrnite na začetno stran."
    >
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className={statusButton}
      >
        Poskusi znova
      </button>
      <a href="/" className={statusButton}>
        Na začetno stran
      </a>
    </StatusPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Le Cité — Pizza napoletana, Nova Gorica" },
      { name: "description", content: "Le Cité — picerija napoletanskega stila na Bevkovem trgu v Novi Gorici. Ročno izdelane pice, intimno vzdušje, nagrajen interier." },
      { property: "og:title", content: "Le Cité — Pizza napoletana, Nova Gorica" },
      { property: "og:description", content: "Picerija napoletanskega stila na Bevkovem trgu v Novi Gorici." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1B4332" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
