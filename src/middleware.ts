import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "crm_token";

/**
 * Routes that require super-admin privileges.
 * Matched by prefix — first match wins.
 */
const SUPER_ADMIN_ROUTES = [
  "/dashboard/user-listing",
  "/dashboard/settings",
];

/** Decode JWT payload without verifying signature (verification happens on the backend). */
function decodeJwtPayload(token: string): any {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    // Handle base64url to base64 conversion manually just in case
    const base64Standard = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64Standard, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to decode JWT in middleware:", error);
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── 1. Auth check ──────────────────────────────────────────
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    // Not logged in → redirect to login page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ── 2. Role / authorization check ─────────────────────────
  const payload = decodeJwtPayload(token);

  // Try to find the isSuperAdmin flag at the top level, or nested inside 'user'
  let isSuperAdmin = false;
  if (payload) {
    const superAdminFlag = payload.isSuperAdmin ?? payload.user?.isSuperAdmin;
    isSuperAdmin = superAdminFlag === true || superAdminFlag === "true";
  }

  console.log(payload, "PAYYYYYLOAF")

  // Check if this path requires super-admin
  const needsSuperAdmin = SUPER_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (needsSuperAdmin && !isSuperAdmin) {
    return NextResponse.redirect(
      new URL("/dashboard/unauthorized", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
