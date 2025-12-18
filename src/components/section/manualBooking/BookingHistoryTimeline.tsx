import { statusConfig } from "@/constants/flight-constants";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

export default function BookingHistoryTimeline() {
  const { bookingHistory = [] } = useSelector(
    (state) => state?.pageDataSlice?.data || {}
  );

  if (!bookingHistory.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Clock size={28} />
        <p className="mt-2 text-sm">No booking activity yet</p>
      </div>
    );
  }

  // sort newest on top
  const sorted = [...bookingHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-sm font-semibold text-slate-800 mb-6">
        Booking Activity
      </h3>

      <div className="relative space-y-7">
        {/* vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200" />

        {sorted.map((item, index) => {
          const cfg = statusConfig[item.bookingStatus] || {};
          const isLatest = index === 0;

          return (
            <div
              key={item._id}
              className={`relative flex gap-4 pl-8 ${
                isLatest ? "scale-[1.02]  " : ""
              }`}
            >
              {/* dot */}
              <div
                className={`absolute  ${isLatest ? "left-3 translate-x-[2px]" : "left-0 translate-x-[4px]"}  top-1.5 w-4 h-4 rounded-full  ${cfg.dot} ${cfg.glow}`}
              />

              {/* content */}
              <div className="ml-2">
                <p
                  className={`text-sm font-medium ${
                    cfg.text
                  } ${isLatest ? "font-semibold" : ""}`}
                >
                  {cfg.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(item.date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              {isLatest && (
                <div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  CURRENT
                </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
