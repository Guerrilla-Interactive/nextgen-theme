import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/pricing",
  "/(auth)(.*)",
  "/api/stripe/webhook",         // must stay public for Stripe
  "/api/cli/assertion",          // CLI uses API key header; leave public
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) {
    await auth.protect();        // requires signed-in user
  }
});

export const config = {
  // Run on all routes except _next/static, _next/image, assets, and favicon
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
