import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPrivate = createRouteMatcher([
  "/dashboard",
  "/dashboard(.*)",
  "/dashboard/:path*",
]);



export default clerkMiddleware(async (auth, req) => {
  if (isPrivate(req)) {
    await auth.protect();        // requires signed-in user
  }
});

export const config = {
  // Run on all routes except _next/static, _next/image, assets, and favicon
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
