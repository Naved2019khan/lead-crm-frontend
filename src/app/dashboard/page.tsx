import LeadListing from "@/components/listing/LeadListing";
import DashboardMain from "@/components/section/dashboard/DashboardMain";

export default function Dashboard() {
  return (
    <div className="w-full bg-white shadow-sm">
      <DashboardMain />
      <div className="mx-8">
      <LeadListing />

      </div>
    </div>
  );
}
