// components/FlightTable.tsx
"use client"
import  { useState, useMemo, useEffect } from 'react';
import { PaxPopup } from "./PaxPopup";
import BookingListing from '../BookingListing';
import { toast } from 'sonner';


const FlightBooking = ({ bookingResponse = flights} : { bookingResponse : any }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [paxDetailSelected , setPaxDetailSelected ] = useState(null)

  const filtered = useMemo(() => {
    if(!bookingResponse) return []
    const result = bookingResponse.filter((f : any) =>
      Object.values(f).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
    if (sortKey) {
      result.sort((a : any, b : any) => {
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

  // PopUp
  const handlePaxSelectionPopup = (items : any ) =>{
    setPaxDetailSelected(items)
  }

  const handleClosePax = () =>{
    setPaxDetailSelected(null)
  }

  // detail page navigation
  const handleDetailPage = (id : string,item : any) =>{
    // router.push(`/crm-dashboard/flight-booking/flight-detail/${id}?flightData=${JSON.stringify(item)}`)
  }
 const handleSaveBookingStatus = async (value : string,orderId : string) => {
    // const response = await updateBookingStatus({orderId, bookingStatus : value })
    // if(response.status){
    //   toast(response.message)
    // }
    // else{
    //   toast(response)
    // }
 }


 useEffect(() => {
    toast.success('Flight Booking Loaded Successfully');
  } , []);



  return (
    <div className="w-full mt-8 ">
      {/* Search */}
      <PaxPopup isOpen={!!paxDetailSelected} paxDetail={paxDetailSelected}  onClose={handleClosePax} /> 
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="max-w-full bg-white"> 
          <thead className="bg-gradient-to-r from-green-600 via-green-500 to-green-600  text-white">
            <tr>
              {[
                { key: 'Action', label: 'Action' },
                { key: 'viewDetail', label: 'View Detail' },
                { key: 'paxDetail', label: 'Pax Detail' },
                { key: 'OrderDetail', label: 'Order Detail' },
                { key: 'pnr', label: 'PNR' },
                { key: 'FlightDetail', label: 'Flight Detail' },
                { key: 'JourneyDetail', label: 'Journey Detail' },
                { key: 'price', label: 'Price' },
                { key: 'paymentStatus', label: 'Payment Status' },
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
          <tbody className="divide-y font-mono divide-emerald-100">
            {filtered.map((f : any,index : number) => {
              if(!f?.flightInfo) return null
              return (
              <BookingListing key={f.id} f={f} index={index} handlePaxSelectionPopup={handlePaxSelectionPopup} onChange={handleSaveBookingStatus} handleDetailPage={handleDetailPage} />
            )})}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4">
        {filtered.map((f : any) => (
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



const flights =[
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
    {
        "_id": "689b3c0a79a91e6ab407ac0d",
        "metaId": "http://localhost:3000/booking/17ad1283-7c45-482b-8a02-295511577d1b",
        "bookingStatus": "Ready",
        "createdAt": "2025-08-12T13:05:14.207Z",
        "orderId": "order_24228693",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 53.81,
            "orderCurrency": "INR",
            "transactionDate": "2025-08-12T13:05:14.207Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "Curranfgh",
                    "lastName": "Clements",
                    "title": "MR",
                    "dateOfBirth": "2013-08-12",
                    "_id": "689b3c095b529837a772b5bd"
                }
            ],
            "primaryInfo": {
                "email": "asdasdss@mailinator.com",
                "phone": "9876543210"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 53.81,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 53.81,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9484",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "737",
                        "departureDateTime": "2025-08-12T21:10:00",
                        "arrivalDateTime": "2025-08-12T23:35:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/17ad1283-7c45-482b-8a02-295511577d1b"
        }
    },
    {
        "_id": "689c1826c460a63bea0321e5",
        "metaId": "http://localhost:3000/booking/e05cc628-e151-436a-b392-4332fd04f1cb",
        "bookingStatus": "Ready",
        "createdAt": "2025-08-13T04:44:22.821Z",
        "orderId": "order_87838828",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 56.5,
            "orderCurrency": "INR",
            "transactionDate": "2025-08-13T04:44:22.821Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "BookingNow",
                    "lastName": "Test",
                    "title": "MR",
                    "dateOfBirth": "2013-08-14",
                    "_id": "689c1825102e35ceecbb6494"
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
                "pricePerAdult": 56.5,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 56.5,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9729",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-08-14T11:00:00",
                        "arrivalDateTime": "2025-08-14T11:50:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "JAI"
                    },
                    {
                        "cabin": "Economy",
                        "flightNumber": "9719",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-08-14T18:00:00",
                        "arrivalDateTime": "2025-08-14T20:00:00",
                        "departureAirportCode": "JAI",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/e05cc628-e151-436a-b392-4332fd04f1cb"
        }
    },
    {
        "_id": "689c37c9c460a63bea03221c",
        "metaId": "http://localhost:3000/booking/667939a3-d955-4312-8966-b2aa8071314f",
        "bookingStatus": "Ready",
        "createdAt": "2025-08-13T06:59:21.869Z",
        "orderId": "order_77615402",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 48.1,
            "orderCurrency": "INR",
            "transactionDate": "2025-08-13T06:59:21.869Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "Deepuk",
                    "lastName": "Clements",
                    "title": "MR",
                    "dateOfBirth": "2013-09-23",
                    "_id": "689c37c885303da336b71028"
                }
            ],
            "primaryInfo": {
                "email": "test@test.com",
                "phone": "8675654665"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 48.1,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 48.1,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9729",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-23T11:00:00",
                        "arrivalDateTime": "2025-09-23T11:50:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "JAI"
                    },
                    {
                        "cabin": "Economy",
                        "flightNumber": "9719",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-23T18:00:00",
                        "arrivalDateTime": "2025-09-23T20:00:00",
                        "departureAirportCode": "JAI",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/667939a3-d955-4312-8966-b2aa8071314f"
        }
    },
    {
        "_id": "689c6521c460a63bea032243",
        "metaId": "http://localhost:3000/booking/8d40405f-33cc-49c5-b923-00254efd576e",
        "bookingStatus": "Pending",
        "createdAt": "2025-08-13T10:12:49.045Z",
        "orderId": "order_70861323",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Firtst",
                    "lastName": "Last",
                    "title": "MR",
                    "dateOfBirth": "2013-08-13",
                    "_id": "689c6520eb23a86850e3548b"
                }
            ],
            "primaryInfo": {
                "email": "admin@test.com",
                "phone": "8990893213"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 65.25,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 65.25,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2433",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2025-08-13T21:30:00",
                        "arrivalDateTime": "2025-08-13T23:55:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/8d40405f-33cc-49c5-b923-00254efd576e"
        },
        "transactions": {
            "transactionDate": "2025-08-13T10:12:49.045Z"
        }
    },
    {
        "_id": "68a03054c460a63bea03245c",
        "metaId": "http://localhost:3000/booking/5df4217a-5c7a-4496-bee7-dc8a1023aeb1",
        "bookingStatus": "Ready",
        "createdAt": "2025-08-16T07:16:36.191Z",
        "orderId": "order_49906675",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 48.1,
            "orderCurrency": "INR",
            "transactionDate": "2025-08-16T07:16:36.191Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "Suyash",
                    "lastName": "Test",
                    "title": "MR",
                    "dateOfBirth": "2013-09-24",
                    "_id": "68a030532e124c95675cfcf6"
                }
            ],
            "primaryInfo": {
                "email": "suyash@sadd.com",
                "phone": "9876543210"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 48.1,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 48.1,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9729",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-24T11:00:00",
                        "arrivalDateTime": "2025-09-24T11:50:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "JAI"
                    },
                    {
                        "cabin": "Economy",
                        "flightNumber": "9719",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-24T18:00:00",
                        "arrivalDateTime": "2025-09-24T20:00:00",
                        "departureAirportCode": "JAI",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/5df4217a-5c7a-4496-bee7-dc8a1023aeb1"
        }
    },
    {
        "_id": "68a030f7c460a63bea03245e",
        "metaId": "http://localhost:3000/booking/7a6b2de5-10dd-423b-80b2-6dc8d16c830b",
        "bookingStatus": "Pending",
        "createdAt": "2025-08-16T07:19:19.622Z",
        "orderId": "order_58660359",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Naved",
                    "lastName": "Naved",
                    "title": "MR",
                    "dateOfBirth": "2013-09-03",
                    "_id": "68a030f6f705a815df00af37"
                }
            ],
            "primaryInfo": {
                "email": "naved@gmailc.com",
                "phone": "9889089089"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "EUR",
                "pricePerAdult": 57.55,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 57.55,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9540",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-24T04:30:00",
                        "arrivalDateTime": "2025-09-24T07:10:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "GOI"
                    },
                    {
                        "cabin": "Economy",
                        "flightNumber": "9530",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-09-24T13:50:00",
                        "arrivalDateTime": "2025-09-24T14:55:00",
                        "departureAirportCode": "GOI",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/7a6b2de5-10dd-423b-80b2-6dc8d16c830b"
        },
        "transactions": {
            "transactionDate": "2025-08-16T07:19:19.622Z"
        }
    },
    {
        "_id": "68d81d1873759f1224c7aa09",
        "metaId": "http://localhost:3000/booking/15bfa276-2e85-4d39-b0dd-dfdc0f15cfd9",
        "bookingStatus": "Pending",
        "createdAt": "2025-09-27T17:21:28.144Z",
        "orderId": "order_33975106",
        "transactions": {
            "transactionDate": "2025-09-27T17:21:28.144Z"
        }
    },
    {
        "_id": "68d81fcb73759f1224c7aa12",
        "metaId": "http://localhost:3000/booking/58a52bec-39b4-485d-bf20-801982922a8d",
        "bookingStatus": "Pending",
        "createdAt": "2025-09-27T17:32:59.039Z",
        "orderId": "order_54001950",
        "transactions": {
            "transactionDate": "2025-09-27T17:32:59.039Z"
        }
    },
    {
        "_id": "68d8cea373759f1224c7aa3c",
        "metaId": "http://localhost:3000/booking/2848465a-13e8-4b44-a20e-7b796da5c0ab",
        "bookingStatus": "Pending",
        "createdAt": "2025-09-28T05:58:59.099Z",
        "orderId": "order_64563394",
        "transactions": {
            "transactionDate": "2025-09-28T05:58:59.099Z"
        }
    },
    {
        "_id": "68d8d29573759f1224c7aa3e",
        "metaId": "http://localhost:3000/booking/b79997ab-d9c1-46e3-b2b8-133e9513b0ed",
        "bookingStatus": "Pending",
        "createdAt": "2025-09-28T06:15:49.119Z",
        "orderId": "order_49576586",
        "metaData": {
            "customerStage": "lead",
            "passangerInfo": [],
            "primaryInfo": {
                "email": "zcz@sff.bbb",
                "phone": "8754321112"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 64,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 64,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9729",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-10-09T11:00:00",
                        "arrivalDateTime": "2025-10-09T11:50:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "JAI"
                    },
                    {
                        "cabin": "Economy",
                        "flightNumber": "9719",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "320",
                        "departureDateTime": "2025-10-09T18:00:00",
                        "arrivalDateTime": "2025-10-09T20:00:00",
                        "departureAirportCode": "JAI",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/b79997ab-d9c1-46e3-b2b8-133e9513b0ed"
        },
        "transactions": {
            "transactionDate": "2025-09-28T06:15:49.119Z"
        }
    },
    {
        "_id": "68d965b373759f1224c7ab10",
        "metaId": "http://localhost:3000/booking/4e9a0120-1ee7-4976-8020-05ca3295ad26",
        "bookingStatus": "Pending",
        "createdAt": "2025-09-28T16:43:31.429Z",
        "orderId": "order_67398252",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "ADasf",
                    "lastName": "asdasd",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-02-11",
                    "_id": "68d96abf35b25ec643d5e5b3"
                }
            ],
            "primaryInfo": {
                "email": "naved@nfj.com",
                "phone": "8990890809"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 145.3,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 145.3,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2983",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2026-02-11T02:30:00",
                        "arrivalDateTime": "2026-02-11T04:45:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "leg2": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2970",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "789",
                        "departureDateTime": "2026-03-03T08:45:00",
                        "arrivalDateTime": "2026-03-03T10:55:00",
                        "departureAirportCode": "BOM",
                        "arrivalAirportCode": "DEL"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/4e9a0120-1ee7-4976-8020-05ca3295ad26"
        },
        "transactions": {
            "transactionDate": "2025-09-28T16:43:31.429Z"
        }
    },
    {
        "_id": "68da120c73759f1224c7abdc",
        "metaId": "http://localhost:3000/booking/428dc045-0629-4bdd-aee9-0d7f1de472fb",
        "bookingStatus": "Confirmed",
        "createdAt": "2025-09-29T04:58:53.189Z",
        "orderId": "order_36193266",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 66,
            "orderCurrency": "INR",
            "transactionDate": "2025-09-29T04:58:53.189Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "Shantanu",
                    "lastName": "Khan",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2013-10-11",
                    "_id": "68da120d15138f180c36aeaf"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 65.1,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 65.1,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9484",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "737",
                        "departureDateTime": "2025-10-11T21:10:00",
                        "arrivalDateTime": "2025-10-11T23:35:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/428dc045-0629-4bdd-aee9-0d7f1de472fb"
        }
    },
    {
        "_id": "68da120c73759f1224c7abdc",
        "metaId": "http://localhost:3000/booking/428dc045-0629-4bdd-aee9-0d7f1de472fb",
        "bookingStatus": "Confirmed",
        "createdAt": "2025-09-29T04:58:53.189Z",
        "orderId": "order_36193266",
        "transactions": {
            "transactionStage": "success",
            "orderAmount": 66,
            "orderCurrency": "INR",
            "transactionDate": "2025-09-29T04:58:53.189Z"
        },
        "metaData": {
            "customerStage": "payment-done",
            "passangerInfo": [
                {
                    "firstName": "Shantanu",
                    "lastName": "Khan",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2013-10-11",
                    "_id": "68da120d15138f180c36aeaf"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 65.1,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 65.1,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9484",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "737",
                        "departureDateTime": "2025-10-11T21:10:00",
                        "arrivalDateTime": "2025-10-11T23:35:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/428dc045-0629-4bdd-aee9-0d7f1de472fb"
        }
    },
    {
        "_id": "68da606f73759f1224c7b170",
        "metaId": "http://localhost:3000/booking/37c160a7-5066-4fab-95f6-00918a119f68",
        "bookingStatus": "Reject",
        "createdAt": "2025-09-29T10:33:20.348Z",
        "orderId": "order_94169286",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Naved",
                    "lastName": "Naved",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2013-10-23",
                    "_id": "68da60d1e391fcc8696c5ddc"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 65.1,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 65.1,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "9484",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "IX",
                        "aircraftCode": "737",
                        "departureDateTime": "2025-10-23T21:10:00",
                        "arrivalDateTime": "2025-10-23T23:35:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/37c160a7-5066-4fab-95f6-00918a119f68"
        },
        "transactions": {
            "transactionDate": "2025-09-29T10:33:20.348Z"
        }
    },
    {
        "_id": "68e7a2b34219d4c33fcc4fd5",
        "metaId": "http://localhost:3000/booking/211f1649-f35f-4142-9286-9b000472f3a2",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-09T11:55:32.123Z",
        "orderId": "order_32783116",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-01-07",
                    "_id": "68e7a44b2e0d9187c6171c42"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 95.6,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 95.6,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2983",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2026-01-07T02:30:00",
                        "arrivalDateTime": "2026-01-07T04:45:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/211f1649-f35f-4142-9286-9b000472f3a2"
        },
        "transactions": {
            "transactionDate": "2025-10-09T11:55:32.123Z"
        }
    },
    {
        "_id": "68e7a5db4219d4c33fcc4fdb",
        "metaId": "http://localhost:3000/booking/464e1d87-d28b-4092-a6ec-cc81f28089db",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-09T12:09:00.741Z",
        "orderId": "order_54455501",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-01-14",
                    "_id": "68e7ad5eba559519f950f9ca"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 95.6,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 95.6,
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
                        "departureDateTime": "2026-01-14T12:45:00",
                        "arrivalDateTime": "2026-01-14T15:00:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/464e1d87-d28b-4092-a6ec-cc81f28089db"
        },
        "transactions": {
            "transactionDate": "2025-10-09T12:09:00.741Z"
        }
    },
    {
        "_id": "68e7a5db4219d4c33fcc4fdc",
        "metaId": "http://localhost:3000/booking/464e1d87-d28b-4092-a6ec-cc81f28089db",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-09T12:09:00.745Z",
        "orderId": "order_71089703",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-01-14",
                    "_id": "68e7ad5eba559519f950f9ca"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 95.6,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 95.6,
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
                        "departureDateTime": "2026-01-14T12:45:00",
                        "arrivalDateTime": "2026-01-14T15:00:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/464e1d87-d28b-4092-a6ec-cc81f28089db"
        },
        "transactions": {
            "transactionDate": "2025-10-09T12:09:00.745Z"
        }
    },
    {
        "_id": "68e7adb94219d4c33fcc5007",
        "metaId": "http://localhost:3000/booking/9c3ec5e8-bd75-4a13-a309-df9f10f66268",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-09T12:42:34.985Z",
        "orderId": "order_60869185",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-01-23",
                    "_id": "68e7b0db34184ecc28efa283"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 110.3,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 110.3,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2983",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2026-01-23T02:30:00",
                        "arrivalDateTime": "2026-01-23T04:45:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/9c3ec5e8-bd75-4a13-a309-df9f10f66268"
        },
        "transactions": {
            "transactionDate": "2025-10-09T12:42:34.985Z"
        }
    },
    {
        "_id": "68e7b1544219d4c33fcc500c",
        "metaId": "http://localhost:3000/booking/a288d245-3d6b-4687-875e-70898f8c17cb",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-09T12:57:57.239Z",
        "orderId": "order_89221004",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2014-01-23",
                    "_id": "68e7b15534184ecc28efa28e"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 110.3,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 110.3,
                "isRefundable": true
            },
            "leg1": {
                "segments": [
                    {
                        "cabin": "Economy",
                        "flightNumber": "2941",
                        "airlineCode": "AI",
                        "operatingAirlineCode": "AI",
                        "aircraftCode": "32N",
                        "departureDateTime": "2026-01-23T16:50:00",
                        "arrivalDateTime": "2026-01-23T19:05:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/a288d245-3d6b-4687-875e-70898f8c17cb"
        },
        "transactions": {
            "transactionDate": "2025-10-09T12:57:57.239Z"
        }
    },
    {
        "_id": "68e9e5a44219d4c33fcc56a0",
        "metaId": "http://localhost:3000/booking/c370d521-582f-4bec-8705-14e832faf2d3",
        "bookingStatus": "Pending",
        "createdAt": "2025-10-11T05:05:38.999Z",
        "orderId": "order_68545795",
        "metaData": {
            "customerStage": "info-added",
            "passangerInfo": [
                {
                    "firstName": "Alok",
                    "lastName": "Singh",
                    "middleName": "",
                    "title": "MR",
                    "dateOfBirth": "2013-11-11",
                    "_id": "68e9fce2d2f92f8152265f37"
                }
            ],
            "primaryInfo": {
                "email": "naved.khan@snva.com",
                "phone": "8929659751"
            }
        },
        "flightInfo": {
            "price": {
                "currencyCode": "USD",
                "pricePerAdult": 95.6,
                "pricePerChild": 0,
                "pricePerInfant": 0,
                "totalAmount": 95.6,
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
                        "departureDateTime": "2025-11-11T12:45:00",
                        "arrivalDateTime": "2025-11-11T15:00:00",
                        "departureAirportCode": "DEL",
                        "arrivalAirportCode": "BOM"
                    }
                ]
            },
            "deeplinkUrl": "http://localhost:3000/booking/c370d521-582f-4bec-8705-14e832faf2d3"
        },
        "transactions": {
            "transactionDate": "2025-10-11T05:05:38.999Z"
        }
    }
]