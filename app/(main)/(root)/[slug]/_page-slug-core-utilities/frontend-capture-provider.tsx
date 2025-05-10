"use client";

import { useEffect } from "react";
import { setupFrontendCapture } from "./frontend-capture";

export function FrontendCaptureProvider() {
  useEffect(() => {
    setupFrontendCapture();
  }, []);

  // This component doesn't render anything
  return null;
} 