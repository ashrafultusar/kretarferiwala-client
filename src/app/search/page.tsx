

import React, { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function SearchWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10">Loading search results...</div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
