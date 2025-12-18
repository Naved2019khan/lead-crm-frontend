import {
  PlaneTakeoff,
  PlaneLanding,
  ArrowRight,
} from "lucide-react";

const cabinMap = ["Economy", "Premium Economy", "Business", "First"];

export default function TripCard() {
  const trip = {
    tripType: "ROUND_TRIP",
    from: "DEL",
    to: "BLR",
    airline: "Vistara",
    depDate: "2025-02-10T06:45:00.000Z",
    cabinClass: 1,
    airlineNo: "UK 819",
  };

  const returnTrip = {
    from: "BLR",
    to: "DEL",
    depDate: "2025-02-15T14:20:00.000Z",
    airlineNo: "UK 820",
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* top gradient strip */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      {/* ticket body */}
      <div className="p-5 space-y-5">

        {/* header */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold tracking-wide text-slate-500">
            {trip.tripType === "ONE_WAY" ? "ONE WAY" : "ROUND TRIP"}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
            {cabinMap[trip.cabinClass]}
          </span>
        </div>

        {/* route */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-3xl font-bold tracking-wider text-slate-900">
              {trip.from}
            </p>
            <p className="text-xs text-slate-500">Departure</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <PlaneTakeoff className="w-4 h-4 text-indigo-500" />
            <div className="w-20 border-t border-dashed border-slate-300" />
            <PlaneLanding className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold tracking-wider text-slate-900">
              {trip.to}
            </p>
            <p className="text-xs text-slate-500">Arrival</p>
          </div>
        </div>

        {/* meta */}
        <div className="flex justify-between text-xs text-slate-500">
          <span>
            {new Date(trip.depDate).toLocaleDateString("en-IN", {
              dateStyle: "medium",
            })}
          </span>
          <span>{trip.airline}</span>
          <span className="font-medium text-slate-700">
            {trip.airlineNo}
          </span>
        </div>
      </div>

      {/* perforation */}
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300" />
        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full -translate-y-1/2" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full -translate-y-1/2" />
      </div>

      {/* return ticket */}
      {returnTrip && (
        <div className="p-5 pt-3 space-y-3">
          <p className="text-xs font-semibold text-slate-600">
            RETURN FLIGHT
          </p>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{returnTrip.from}</p>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <p className="text-lg font-semibold">{returnTrip.to}</p>
          </div>

          <div className="flex justify-between text-xs text-slate-500">
            <span>
              {new Date(returnTrip.depDate).toLocaleDateString("en-IN", {
                dateStyle: "medium",
              })}
            </span>
            <span className="font-medium text-slate-700">
              {returnTrip.airlineNo}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
