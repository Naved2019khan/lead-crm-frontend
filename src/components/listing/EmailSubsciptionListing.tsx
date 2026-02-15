import { getAllEmailSubscribe } from "@/services/api/general-api"

/**
 * A modern, clean table component for displaying email subscriptions.
 * Features:
 * - Responsive design with Tailwind CSS
 * - Hover effects for better interactivity
 * - Clear typography and spacing
 * - Status indicators for visual clarity
 */
const EmailSubscriptionListing = async () => {
    const response = await getAllEmailSubscribe()
    const emailSubscribes = response?.emailSubscribes || []

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Email Subscriptions</h2>
                <p className="text-sm text-gray-500 mt-1">Manage and view all your newsletter subscribers.</p>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Email Address
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {emailSubscribes.length > 0 ? (
                            emailSubscribes.map((subscriber) => (
                                <tr 
                                    key={subscriber?.id || subscriber?.email} 
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-700">
                                            {subscriber?.email}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic">
                                    No subscriptions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Total: {emailSubscribes.length} subscribers</span>
            </div>
        </div>
    )
}

export default EmailSubscriptionListing
