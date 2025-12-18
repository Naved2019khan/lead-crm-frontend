import { DollarSign, CreditCard, Wallet, Calendar, User, Edit2, Save, X, Tag } from 'lucide-react';
import { useState } from 'react';

export default function FareCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    currency: "INR",
    totalPrice: 2324,
    netCost: 2324,
    mco: 0,
    transactionId: "TXN1234567890",
    date: "Dec 18, 2025",
    customer: "John Doe",
    paymentMethod: "Credit Card",
    status: "Confirmed"
  });

  const [editData, setEditData] = useState({...paymentData});

  const handleEdit = () => {
    setEditData({...paymentData});
    setIsEditing(true);
  };

  const handleSave = () => {
    setPaymentData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...paymentData});
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({...prev, [field]: value}));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed': return 'bg-red-50 text-red-700 border-red-200';
      case 'Refunded': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
      <div className="max-w-2xl mx-auto">
        {/* Pinterest-style Card */}
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100">
          
          {/* Header with gradient accent */}
          <div className="relative bg-slate-900 p-6 pb-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur p-3 rounded-2xl">
                  <CreditCard className="text-white" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Payment</h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{paymentData.transactionId}</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur p-2.5 rounded-xl transition-all duration-200 group"
                >
                  <Edit2 className="text-white group-hover:scale-110 transition-transform" size={18} strokeWidth={1.5} />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className="bg-emerald-500 hover:bg-emerald-600 p-2.5 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    <Save className="text-white" size={18} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    <X className="text-white" size={18} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="inline-block">
              {isEditing ? (
                <select 
                  value={editData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white"
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                  <option>Refunded</option>
                </select>
              ) : (
                <div className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(paymentData.status)}`}>
                  {paymentData.status}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Customer & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <User size={16} strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-wide">Customer</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editData.customer}
                    onChange={(e) => handleChange('customer', e.target.value)}
                    className="w-full text-slate-900 font-semibold border-2 border-slate-200 rounded-xl px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold">{paymentData.customer}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-wide">Date</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full text-slate-900 font-semibold border-2 border-slate-200 rounded-xl px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold">{paymentData.date}</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-slate-200"></div>

            {/* Amount Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                    <DollarSign className="text-blue-600" size={20} strokeWidth={2} />
                  </div>
                  <span className="text-slate-700 font-semibold">Total Price</span>
                </div>
                {isEditing ? (
                  <input 
                    type="number"
                    value={editData.totalPrice}
                    onChange={(e) => handleChange('totalPrice', parseFloat(e.target.value))}
                    className="w-28 text-slate-900 font-bold text-right border-2 border-slate-200 rounded-xl px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <span className="text-slate-900 font-bold text-lg">{paymentData.currency} {paymentData.totalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                    <Wallet className="text-emerald-600" size={20} strokeWidth={2} />
                  </div>
                  <span className="text-slate-700 font-semibold">Net Cost</span>
                </div>
                {isEditing ? (
                  <input 
                    type="number"
                    value={editData.netCost}
                    onChange={(e) => handleChange('netCost', parseFloat(e.target.value))}
                    className="w-28 text-slate-900 font-bold text-right border-2 border-slate-200 rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <span className="text-slate-900 font-bold text-lg">{paymentData.currency} {paymentData.netCost.toLocaleString()}</span>
                )}
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                    <Tag className="text-amber-600" size={20} strokeWidth={2} />
                  </div>
                  <span className="text-slate-700 font-semibold">MCO Amount</span>
                </div>
                {isEditing ? (
                  <input 
                    type="number"
                    value={editData.mco}
                    onChange={(e) => handleChange('mco', parseFloat(e.target.value))}
                    className="w-28 text-slate-900 font-bold text-right border-2 border-slate-200 rounded-xl px-3 py-2 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <span className="text-slate-900 font-bold text-lg">{paymentData.currency} {paymentData.mco.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-slate-200"></div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold text-sm uppercase tracking-wide">Payment Method</span>
              {isEditing ? (
                <select 
                  value={editData.paymentMethod}
                  onChange={(e) => handleChange('paymentMethod', e.target.value)}
                  className="text-slate-900 font-semibold border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>Net Banking</option>
                  <option>Cash</option>
                </select>
              ) : (
                <span className="text-slate-900 font-bold">{paymentData.paymentMethod}</span>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}