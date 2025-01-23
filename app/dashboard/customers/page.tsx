import CostumersTable from "@/app/ui/customers/table";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);

  console.log(customers);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <CostumersTable customers={customers} />
      </Suspense>
    </main>
  );
}
