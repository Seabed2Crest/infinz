import { Suspense } from "react";
import ApplyNowClient from "./ApplyNowClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center flex items-center justify-center">Loading...</div>}>
      <ApplyNowClient />
    </Suspense>
  );
}
