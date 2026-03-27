/**
 * Mock API service for E-commerce User Management
 * Simulates network calls and persistence.
 */

export interface EcomUser {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  spend: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joined: string;
}

export interface UserActivity {
  id: string;
  userName: string;
  action: string;
  time: string;
  type: 'signup' | 'order' | 'view' | 'update';
}

// In-memory "database"
let mockUsers: EcomUser[] = [
  { 
    id: "CUS-101", 
    name: "Sarah Jenkins", 
    email: "sarah.j@example.com", 
    location: "New York, USA", 
    orders: 12, 
    spend: "$2,450.00", 
    status: "Active",
    joined: "Jan 12, 2024"
  },
  { 
    id: "CUS-102", 
    name: "Michael Chen", 
    email: "m.chen@example.com", 
    location: "London, UK", 
    orders: 5, 
    spend: "$890.50", 
    status: "Active",
    joined: "Feb 05, 2024"
  },
  { 
    id: "CUS-103", 
    name: "Emma Wilson", 
    email: "emma.w@example.com", 
    location: "Berlin, DE", 
    orders: 28, 
    spend: "$5,120.00", 
    status: "Inactive",
    joined: "Dec 20, 2023"
  },
];

let mockActivities: UserActivity[] = [
  { id: "ACT-1", userName: "Sarah Jenkins", action: "Purchased 'Wireless Headphones'", time: "2 min ago", type: "order" },
  { id: "ACT-2", userName: "Michael Chen", action: "Updated shipping address", time: "1 hour ago", type: "update" },
  { id: "ACT-3", userName: "System", action: "New user Sarah Jenkins registered", time: "5 hours ago", type: "signup" },
  { id: "ACT-4", userName: "Emma Wilson", action: "Viewed 'Summer Collection'", time: "Yesterday", type: "view" },
];

export const ecomUserApi = {
  getUsers: async (): Promise<EcomUser[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockUsers]), 600);
    });
  },

  createUser: async (userData: Omit<EcomUser, 'id' | 'joined' | 'orders' | 'spend'>): Promise<EcomUser> => {
    return new Promise((resolve) => {
      const newUser: EcomUser = {
        ...userData,
        id: `CUS-${Math.floor(Math.random() * 900) + 100}`,
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        orders: 0,
        spend: "$0.00",
      };
      
      setTimeout(() => {
        mockUsers = [newUser, ...mockUsers];
        // Add activity
        mockActivities = [
          { 
            id: `ACT-${Date.now()}`, 
            userName: newUser.name, 
            action: `New user ${newUser.name} registered`, 
            time: "Just now", 
            type: "signup" 
          }, 
          ...mockActivities
        ];
        resolve(newUser);
      }, 800);
    });
  },

  getActivities: async (): Promise<UserActivity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockActivities]), 400);
    });
  }
};
