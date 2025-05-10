import { draftMode } from 'next/headers';
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { NextRequest, NextResponse } from "next/server";

// Create a custom handler for enabling draft mode
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  
  // Special case for the server-screenshot API
  if (source === 'server-screenshot') {
    console.log('Enabling draft mode for server-screenshot API');
    
    try {
      // Enable draft mode directly - need to await draftMode() first
      const draft = await draftMode();
      draft.enable();
      
      // Return success with cookie details
      return NextResponse.json(
        { success: true, message: 'Draft mode enabled for screenshot' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error enabling draft mode for screenshot:', error);
      return NextResponse.json(
        { error: 'Failed to enable draft mode', message: error.message },
        { status: 500 }
      );
    }
  }
  
  // Use the standard handler for regular draft mode requests
  const standardHandler = defineEnableDraftMode({
    client: client.withConfig({ token }),
  });
  
  return standardHandler.GET(req);
}
