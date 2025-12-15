import { getAirlineData, getAirportName, getStopCount } from "@/utils/flights/fight-utils";
import { Dropdown } from "../ui/Dropdown";
import { differenceOfTiming, getDateReadableFormate, getTimeReadableFormate } from "@/utils/dates";
import Link from "next/link";


const BookingOption = [
  {
    label: "Confirmed",
    value: "Confirmed",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Reject",
    value: "Reject",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Ready",
    value: "Ready",
  },
];
 
const BookingListing = ({ f, handlePaxSelectionPopup,handleDetailPage , onChange }: { f: any }) => {
  const {
    airlineName,
    fromAiportName,
    toAiportName,
    stopCount,
    flightNumber,
    cabin,
    isRoundTrip,
  } = getFlightInfo(f?.flightInfo);
  const {
    departureAirportCode,
    arrivalAirportCode,
    departureDateTime,
    arrivalDateTime,
    departureTiming,
    arrivalTiming,
    estTime,
  } = getJourneyInfo(f?.flightInfo);

  return (
    <tr key={f?.orderId} className="hover:bg-emerald-50 max-h-[100px]">
       <td className="px-2 py-3 ">
        <div className="w-36 px-2">
          <Dropdown onChange={(value)=>{onChange(value,f?.orderId)}} value={f?.bookingStatus} options={BookingOption} />
        </div>
      </td>
      <td className="px-4 py-6"> 
        <Link href={`manual-booking/${f?.orderId}`}
          
          className="text-sm  bg-green-600 shadow-2xl text-white  hover:bg-green-900   px-4 py-2 rounded-md"
        >
          View
        </Link>
      </td>
      <td>
        <div
          // onClick={() => handlePaxSelectionPopup()}
          className="relative whitespace-nowrap  py-2 text-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2 justify-center">
            <span className="text-sm text-gray-700">
              {(f?.metaData?.passangerInfo?.[0]?.firstName || "X") +
                " " +
                (f?.metaData?.passangerInfo?.[0]?.lastName || "")}
            </span>
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-full">
              {f?.metaData?.passangerInfo?.length}
            </span>
          </div>
        </div>
      </td>
      {/* <td className="px-4 py-6">{f?.metaData?.passangerInfo?.length}</td> */}
      <td className="px-4 py-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className={bookingStatus(f.bookingStatus)}>
              {f.bookingStatus}
            </span>
          </div>

          <div className="text-xs text-gray-500">{f?.orderId || "N/A"}</div>
        </div>
      </td>

      {/* FlightDetail */}
      <td className="px-4 py-6">{f.pnr || "N/A"}</td>
      <td className="px-4 py-3">
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {isRoundTrip ? "Round Trip" : "One Way"}
              </span>
              <span className="text-xs text-slate-500">{cabin}</span>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-center">
              <span className="text-base font-bold text-gray-800">
                {departureAirportCode}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="text-base font-bold text-gray-800">
                {arrivalAirportCode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-700">
                {airlineName || "Airline Name"}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-mono">{flightNumber}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Departure</span>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {departureDateTime}
              </span>
              <span className="text-xs text-gray-600">{departureTiming}</span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-xs text-gray-500">Duration</span>
              <span className="text-sm font-medium text-blue-600">
                {estTime}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Arrival</span>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {arrivalDateTime}
              </span>
              <span className="text-xs text-gray-600">{arrivalTiming}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-semibold whitespace-nowrap">
        {f?.transactions?.orderCurrency || ""} {f.transactions?.orderAmount}
      </td>
      <td className="px-4 py-3">{f?.paymentStatus}</td>
      {/* <td className="px-4 py-3 font-semibold">
                   <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(f.status)}`}>
                    {f.status}
                  </span>
                
                  {f.bookingStatus}
                  </td> */}
     
    </tr>
  );
};

// normalize
type FlightInfo = {
  airlineName: string;
  fromAiportName: string;
  toAiportName: string;
  stopCount: string;
  flightNumber: string;
  cabin: string;
  isRoundTrip: boolean;
};

type FlightInfoInput =
  | { leg1: Leg; leg2?: Leg }
  | { leg1: Leg; leg2?: Leg }[]
  | null
  | undefined;

function getFlightInfo(flightInfo: FlightInfoInput): FlightInfo {
  if (!flightInfo) {
    return {
      cabin: null as unknown as string, // or change FlightInfo.cabin to string | null
      isRoundTrip: false,
      airlineName: "",
      fromAiportName: "",
      flightNumber: "",
      toAiportName: "",
      stopCount: "",
    };
  }

  const data: { leg1: Leg; leg2?: Leg } | undefined = Array.isArray(flightInfo)
    ? flightInfo[0]
    : flightInfo;

  const { leg1 } = data || {};

  if (!leg1?.segments?.length) {
    return {
      cabin: "N/A",
      isRoundTrip: false,
      airlineName: "",
      fromAiportName: "",
      flightNumber: "",
      toAiportName: "",
      stopCount: "",
    };
  }

  const initialSegment = leg1.segments[0];
  const lastSegment = leg1.segments[leg1.segments.length - 1];
  const fromAiportName = getAirportName(initialSegment.departureAirportCode);
  const airlineData = getAirlineData(initialSegment.airlineCode) as any;
  const stopCount = getStopCount(leg1.segments);
  const toAiportName = getAirportName(lastSegment.arrivalAirportCode);

  return {
    cabin: initialSegment?.cabin || "N/A",
    isRoundTrip: "leg2" in data && data.leg2 !== undefined,
    airlineName: airlineData?.name || "",
    fromAiportName,
    flightNumber: initialSegment.flightNumber || "",
    toAiportName: toAiportName,
    stopCount,
  };
}

// Define the type for your segment
type Segment = {
  departureDateTime: string;
  arrivalDateTime: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  airlineCode: string;
  flightNumber: string;
  cabin?: string;
};

type Leg = {
  segments: Segment[];
};

type JourneyInfo = { leg1: Leg }[] | { leg1: Leg } | null | undefined;

type JourneyInfoResult = {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDateTime: string;
  arrivalDateTime: string;
  departureTiming: string;
  arrivalTiming: string;
  estTime: string;
};

function getJourneyInfo(flightInfo: JourneyInfo): JourneyInfoResult {
  if (!flightInfo) {
    return emptyJourney();
  }

  const data: { leg1: Leg } | undefined = Array.isArray(flightInfo)
    ? flightInfo[0]
    : flightInfo;

  if (!data?.leg1?.segments?.length) {
    return emptyJourney();
  }

  const segments = data.leg1.segments;
  const initialSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  return {
    departureAirportCode: initialSegment.departureAirportCode,
    arrivalAirportCode: lastSegment.arrivalAirportCode,
    departureDateTime: getDateReadableFormate(initialSegment.departureDateTime),
    arrivalDateTime: getDateReadableFormate(lastSegment.arrivalDateTime),
    departureTiming: getTimeReadableFormate(initialSegment.departureDateTime),
    arrivalTiming: getTimeReadableFormate(lastSegment.arrivalDateTime),
    estTime: differenceOfTiming(
      initialSegment.departureDateTime,
      lastSegment.arrivalDateTime
    ),
  };
}

function emptyJourney(): JourneyInfoResult {
  return {
    departureAirportCode: "",
    arrivalAirportCode: "",
    departureDateTime: "",
    arrivalDateTime: "",
    departureTiming: "",
    arrivalTiming: "",
    estTime: "",
  };
}

const statusColor = (s: any) => {
  switch (s) {
    case "On Time":
      return "bg-emerald-100 text-emerald-700";
    case "Delayed":
      return "bg-amber-100 text-amber-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "";
  }
};

const bookingStatus = (s: any) => {
  switch (s) {
    case "Ready":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md font-medium text-xs";
    case "Pending":
      return "bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md font-medium text-xs";
    case "Cancelled":
      return "bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-md font-medium text-xs";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md font-medium text-xs";
  }
};

export default BookingListing;
