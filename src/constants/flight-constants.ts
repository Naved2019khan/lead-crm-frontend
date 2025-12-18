export const TRAVEL_CLASS = ["Economy", "Premium Economy", "Business", "First Class"];

export const statusConfig = {
  pending: {
    label: "Booking Created",
    text: "text-slate-600",
    dot: "bg-gradient-to-br from-slate-400 to-slate-600",
    glow: "",
  },
  "payment-done": {
    label: "Payment Successful",
    text: "text-emerald-700",
    dot: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    glow: "shadow-[0_0_0_6px_rgba(16,185,129,0.15)]",
  },
  "pnr-generated": {
    label: "PNR Generated",
    text: "text-blue-700",
    dot: "bg-gradient-to-br from-blue-400 to-blue-600",
    glow: "shadow-[0_0_0_6px_rgba(59,130,246,0.15)]",
  },
  "ticked-received": {
    label: "Ticket Issued",
    text: "text-indigo-700",
    dot: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    glow: "shadow-[0_0_0_6px_rgba(99,102,241,0.15)]",
  },
  close: {
    label: "Booking Closed",
    text: "text-slate-700",
    dot: "bg-gradient-to-br from-slate-500 to-slate-700",
    glow: "",
  },
  cancelled: {
    label: "Booking Cancelled",
    text: "text-rose-700",
    dot: "bg-gradient-to-br from-rose-400 to-rose-600",
    glow: "shadow-[0_0_0_6px_rgba(244,63,94,0.15)]",
  },
};
