"use client";
import React from "react";

import { Provider as JotaiProvider } from "jotai";

import { ApolloProvider } from "lib/apollo";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </JotaiProvider>
  );
}
