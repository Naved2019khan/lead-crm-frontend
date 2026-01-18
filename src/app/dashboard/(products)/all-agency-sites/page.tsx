import { Heading } from "@/components/ui/Heading";
import { ProductGridWrapper } from "@/components/grid/ProductGridWrapper";
import { Suspense } from "react";

 function Page() {
  return (
    <div className="mx-12 mt-4">
      <Heading level="h2" align="left" subtitle="Software Lead Section">
        Agency Lead Sites
      </Heading>
      <Suspense fallback={<div>Loading...</div>}>
      <ProductGridWrapper />
      </Suspense>
    </div>
  );
}

export default Page;
