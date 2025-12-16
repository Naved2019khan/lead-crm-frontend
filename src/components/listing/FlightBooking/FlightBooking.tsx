// components/FlightTable.tsx
"use client"
import { useState, useMemo, useEffect } from 'react';
import { PaxPopup } from "./PaxPopup";
import BookingListing from '../BookingListing';
import { toast } from 'sonner';
import { getManualBookings } from '@/services/api/booking-api';


const FlightBooking = ({  }: { }) => {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [bookingResponse,setBookingResponse] = useState([])

    const filtered = useMemo(() => {
        if (!bookingResponse) return []
        const result = bookingResponse.filter((f: any) =>
            Object.values(f).some((v) =>
                String(v).toLowerCase().includes(search.toLowerCase())
            )
        );
        if (sortKey) {
            result.sort((a: any, b: any) => {
                const x = a[sortKey];
                const y = b[sortKey];
                if (x < y) return sortDir === 'asc' ? -1 : 1;
                if (x > y) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [JSON.stringify(bookingResponse), search]);

    const handleSort = (key: any) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const statusColor = (s: any) => {
        switch (s) {
            case 'On Time': return 'bg-emerald-100 text-emerald-700';
            case 'Delayed': return 'bg-amber-100 text-amber-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return '';
        }
    };

    async function fetchAllBookings() {
        const response = await getManualBookings()
        setBookingResponse(response.data)
        console.log(response.data)
        toast.success('Flight Booking Loaded Successfully');
    }


    useEffect(() => {
        fetchAllBookings()
    }, []);


    return (
        <div className="w-full mt-8 mx-5">
            {/* Search */}
            {/* <PaxPopup isOpen={!!paxDetailSelected} paxDetail={paxDetailSelected} onClose={handleClosePax} /> */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow h-[calc(80ch-2rem)]">
                <table className="w-full bg-white ">
                    <thead className="bg-gradient-to-r w-full  from-gray-600 via-gray-400 to-gray-600  text-white">
                        <tr>
                            {[
                                { key: 'Status', label: 'Status' },
                                { key: 'viewDetail', label: 'View Detail' },
                                { key: 'paxDetail', label: 'Pax Detail' },
                                { key: 'OrderDetail', label: 'Order Detail' },
                                { key: 'pnr', label: 'PNR' },
                                { key: 'FlightDetail', label: 'Flight Detail' },
                                { key: 'JourneyDetail', label: 'Journey Detail' },
                                { key: 'price', label: 'Price' },
                                // { key: 'paymentStatus', label: 'Payment Status' },
                                // { key: 'bookingStatus', label: 'Booking Status' },
                                // { key: 'status', label: 'Status' },
                            ].map(({ key, label }) => (
                                <th
                                    key={key}
                                    className="px-4 py-5 text-left font-semibold cursor-pointer whitespace-nowrap"
                                    onClick={() => handleSort(key)}
                                >
                                    {label}
                                    {sortKey === key && (
                                        <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y font-mono divide-emerald-100 ">
                        {filtered.map((flight: any, index: number) => {
                            if (!flight) return null
                            return (
                                <BookingListing
                                    key={flight._id}
                                    flight={flight}
                                    />
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-4">
                {filtered.map((f: any) => (
                    <details
                        key={f.id}
                        className="bg-white rounded-lg shadow border border-emerald-200"
                    >
                        <summary className="px-4 py-3 font-bold text-emerald-700 cursor-pointer">
                            {f.airline} · {f.flightNo} · ${f.price}
                        </summary>
                        <div className="px-4 pb-3 text-sm space-y-1">
                            <p>
                                <span className="font-semibold">Route:</span> {f.from} → {f.to}
                            </p>
                            <p>
                                <span className="font-semibold">Departure:</span>{' '}
                                {new Date(f.departure).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Arrival:</span>{' '}
                                {new Date(f.arrival).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Duration:</span> {f.duration}
                            </p>
                            <p>
                                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(f.status)}`}>
                                    {f.status}
                                </span>
                            </p>
                        </div>
                    </details>
                ))}
            </div>
        </div>

    );
};
export default FlightBooking;



const flights = [
    {
        "_id": "689b3ad179a91e6ab407ac0b",
        "metaId": "http://localhost:3000/booking/5079ec71-8ab2-4730-a685-86bb8d7dab43",
        "bookingStatus": "Pending",
        "createdAt": "2025-08-12T13:00:01.450Z",
        "orderId": "order_35808352",
        "transactions": {
            "transactionStage": "reject",
            "orderAmount": 58.01,
            "orderCurrency": "INR",
            "transactionDate": "2025-08-12T13:00:01.450Z"
        },
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Curran",
                    "lastName": "Clements",
                    "title": "MR",
                    "dateOfBirth": "2013-09-16",
                    "_id": "689b3ad0b33e975f253a3320"
                }
            ],
            "primaryInfo": {
                "email": "zivotys@mailinator.com",
                "phone": "9876543210"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 58.01,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 58.01,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2993",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2025-09-16T12:35:00",
                        "arrivalDateTime": "2025-09-16T14:50:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/5079ec71-8ab2-4730-a685-86bb8d7dab43"
        }
    },
]