"use client";
import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Clock,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  Luggage,
} from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';

export const FlightDetail = () => {
  const [activeTab, setActiveTab] = useState('transaction');

  const bookingData = {
    bookingRef: 'FLT2024789',
    status: 'Confirmed',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '14:30',
      date: '2024-08-15',
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: '17:45',
      date: '2024-08-15',
    },
    airline: 'SkyLine Airways',
    flightNumber: 'SL 2847',
    duration: '6h 15m',
    transaction: {
      amount: '458.99',
      paymentMethod: 'Visa ****4532',
      transactionId: 'TXN-892347',
      bookingDate: '2024-07-20',
      fees: {
        baseFare: '$399.00',
        taxes: '$45.99',
        serviceFee: '$14.00',
      },
    },
    passenger: {
      name: 'John Anderson',
      email: 'john.anderson@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      passportNumber: 'US123456789',
      seatNumber: '12A',
      baggage: '1 Checked Bag (23kg)',
    },
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Flight Booking</h1>
            <p className="text-blue-100 text-sm mt-1">
              Booking Reference: <span className="font-mono">{bookingData.bookingRef}</span>
            </p>
          </div>
          <span className="mt-2 md:mt-0 px-3 py-1 bg-green-500 rounded-full text-xs font-semibold">
            {bookingData.status}
          </span>
        </div>

        {/* Flight Route */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-center space-y-1">
            <div className="text-xl font-bold bg-white text-gray-800 px-3 py-1 rounded-lg inline-block">
              {bookingData.departure.airport}
            </div>
            <p className="text-blue-100 text-sm">{bookingData.departure.city}</p>
            <div className="flex items-center justify-center gap-1 text-xs mt-1">
              <Calendar className="w-3 h-3" />
              {bookingData.departure.date}
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3" />
              {bookingData.departure.time}
            </div>
          </div>

          <div className="my-4 sm:my-0 flex flex-col items-center">
            <Plane className="w-6 h-6 text-white transform rotate-90" />
            <span className="text-xs mt-1 text-blue-100">{bookingData.duration}</span>
            <span className="text-xs mt-0.5 text-blue-200">{bookingData.flightNumber}</span>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xl font-bold bg-white text-gray-800 px-3 py-1 rounded-lg inline-block">
              {bookingData.arrival.airport}
            </div>
            <p className="text-blue-100 text-sm">{bookingData.arrival.city}</p>
            <div className="flex items-center justify-center gap-1 text-xs mt-1">
              <Calendar className="w-3 h-3" />
              {bookingData.arrival.date}
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3" />
              {bookingData.arrival.time}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'transaction', label: 'Transaction Details', icon: CreditCard },
            { id: 'passenger', label: 'Passenger Data', icon: User },
            { id: 'agents', label: 'For Agents', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors flex flex-col items-center ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs sm:text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'transaction' && <TransactionCard bookingData={bookingData} />}
        {activeTab === 'passenger' && <PassengerCard bookingData={bookingData} />}
        {activeTab === 'agents' && (
          <AgentBookingCard
            bookingId="BK00123"
            onSave={(data) => {
              console.log('Save data:', data);
            }}
          />
        )}
      </div>
    </div>
  );
};

// --- Transaction Card ---
function TransactionCard({ bookingData }: { bookingData: any }) {
  const [manualCommission, setManualCommission] = useState<string>('');
  const MARKUP_LIMIT = 10_000_00;
  const totalAmount = parseFloat(bookingData.transaction.amount || '0') + parseFloat(manualCommission || '0');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(Number(value)) && Number(value) <= MARKUP_LIMIT)) {
      setManualCommission(value);
    }
  };

  const savePrice = () => {
    // Save logic
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Payment Summary
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Base Fare', value: bookingData.transaction.fees.baseFare },
              { label: 'Taxes & Fees', value: bookingData.transaction.fees.taxes },
              { label: 'Service Fee', value: bookingData.transaction.fees.serviceFee },
            ].map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-start mt-2">
              <span className="text-gray-600">Additional Markup</span>
              <div className="w-32">
                <input
                  type="number"
                  value={manualCommission}
                  onChange={handleInput}
                  placeholder="0.00"
                  className="w-full text-sm text-green-800 font-medium border border-green-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {manualCommission && (
                  <button
                    onClick={savePrice}
                    className="mt-1 w-full text-xs bg-green-600 text-white py-1 rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-lg font-bold text-blue-700">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Transaction Info</h3>
          <div className="space-y-3 text-sm">
            <InfoRow label="Transaction ID" value={bookingData.transaction.transactionId} mono />
            <InfoRow label="Payment Method" value={bookingData.transaction.paymentMethod} />
            <InfoRow label="Booking Date" value={bookingData.transaction.bookingDate} />
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">Paid</span>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-semibold text-blue-900">Need a receipt?</h4>
              <p className="text-sm text-blue-700">Download your payment confirmation</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Passenger Card ---
function PassengerCard({ bookingData }: { bookingData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <InfoCard title="Personal Information" icon={User}>
          <InfoRow icon={User} label="Full Name" value={bookingData.passenger.name} />
          <InfoRow icon={Mail} label="Email" value={bookingData.passenger.email} />
          <InfoRow icon={Phone} label="Phone" value={bookingData.passenger.phone} />
          <InfoRow icon={Calendar} label="Date of Birth" value={bookingData.passenger.dateOfBirth} />
        </InfoCard>

        {/* Travel Info */}
        <InfoCard title="Travel Details" icon={MapPin}>
          <InfoRow icon={MapPin} label="Seat" value={bookingData.passenger.seatNumber} />
          <InfoRow icon={Luggage} label="Baggage" value={bookingData.passenger.baggage} />
          <InfoRow icon={User} label="Passport" value={bookingData.passenger.passportNumber} mono />
        </InfoCard>
      </div>

      {/* Check-in Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-amber-900">Check-in Reminder</h4>
          <p className="text-sm text-amber-700 mt-1">
            Online check-in opens 24 hours before departure. Arrive at least 2 hours early for domestic flights.
          </p>
          <button className="mt-3 px-3 py-1.5 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition">
            Check-in Online
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---
const InfoCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-600" />
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoRow = ({
  label,
  value,
  icon,
  mono = false,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
  mono?: boolean;
}) => {
  const Icon = icon;
  return (
    <div className="flex items-start py-2 border-b border-gray-100 last:border-0">
      {Icon && <Icon className="w-4 h-4 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />}
      <div>
        <span className="text-gray-600 text-sm block">{label}</span>
        <span className={`font-medium ${mono ? 'font-mono text-sm' : ''}`}>{value}</span>
      </div>
    </div>
  );
};

// --- Agent Card (unchanged logic, improved style) ---
type AgentBookingCardProps = {
  bookingId: string;
  initialComment?: string;
  initialPaymentStatus?: 'Paid' | 'Unpaid' | 'Partial';
  initialFlightStatus?: 'Confirmed' | 'On Hold' | 'Cancelled';
  initialProceeded?: boolean;
  onSave: (data: {
    bookingId: string;
    comment: string;
    paymentStatus: string;
    flightStatus: string;
    proceeded: boolean;
  }) => void;
};

const AgentBookingCard: React.FC<AgentBookingCardProps> = ({
  bookingId,
  initialComment = '',
  initialPaymentStatus = 'Unpaid',
  initialFlightStatus = 'On Hold',
  initialProceeded = false,
  onSave,
}) => {
  const [comment, setComment] = useState(initialComment);
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
  const [flightStatus, setFlightStatus] = useState(initialFlightStatus);
  const [proceeded, setProceeded] = useState(initialProceeded);

  const handleSave = () => {
    onSave({ bookingId, comment, paymentStatus, flightStatus, proceeded });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 max-w-md mx-auto w-full space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Agent Actions</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Dropdown
        label="Payment Status"
        options={[
          { label: 'Paid', value: 'Paid' },
          { label: 'Unpaid', value: 'Unpaid' },
          { label: 'Partial', value: 'Partial' },
        ]}
        value={paymentStatus}
        onChange={setPaymentStatus}
      />

      <Dropdown
        label="Flight Status"
        options={[
          { label: 'Confirmed', value: 'Confirmed' },
          { label: 'On Hold', value: 'On Hold' },
          { label: 'Cancelled', value: 'Cancelled' },
        ]}
        value={flightStatus}
        onChange={setFlightStatus}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`proceed-${bookingId}`}
          checked={proceeded}
          onChange={() => setProceeded(!proceeded)}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor={`proceed-${bookingId}`} className="text-sm text-gray-700">
          Mark as Proceeded
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition font-medium"
      >
        Save Changes
      </button>
    </div>
  );
};