/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/lib/auth"

// NextAuth v4 requires this pattern for App Router
function handler(...args: any[]) {
  // Dynamically import to avoid TS type issues
  const NextAuth = require("next-auth").default
  return NextAuth(authOptions)(...args)
}

export { handler as GET, handler as POST }
