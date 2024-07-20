"use client";
import React from "react";

import { ApolloProvider } from "lib/apollo";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider>{children}</ApolloProvider>;
}
