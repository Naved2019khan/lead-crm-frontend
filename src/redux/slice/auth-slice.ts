import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { tokenManager } from '@/lib/tokenManager';

interface BusinessRole {
  businessType: 'ecom' | 'flight' | 'agency';
  role: string;
  isActive: boolean;
  meta?: Record<string, any>;
}

interface AuthUser {
  userId: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  roles: BusinessRole[];
}

interface AuthState {
  user: AuthUser | null;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  openModal: string; // Preserved from existing flow
}

const initialState: AuthState = {
  user: null,
  isInitializing: true,
  isLoading: false,
  error: null,
  openModal: "", // Preserved from existing flow
};

// ─── Thunks ────────────────────────────────────────────────

// Called once on app boot — restores session from cookie
export const initAuth = createAsyncThunk(
  'auth/init',
  async (_, { rejectWithValue }) => {
    // Already have token in memory (e.g. dev HMR)
    const existing = tokenManager.get();
    if (existing) {
      try {
        const decoded = jwtDecode<AuthUser>(existing);
        if (decoded && decoded.userId) {
          return decoded;
        }
      } catch (error) {
        // Fall back to refreshing the token if the existing one is invalid
        console.warn("[AuthSlice] Existing token is invalid, attempting refresh...");
      }
    }

    // Try silent refresh from httpOnly cookie
    const token = await tokenManager.getAccessToken();
    if (!token) return rejectWithValue('No session');
    return jwtDecode<AuthUser>(token);
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',  // server sets httpOnly cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.error || 'Login failed');
    }

    const { accessToken } = await res.json();
    tokenManager.set(accessToken);
    return jwtDecode<AuthUser>(accessToken);
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',  // server clears the cookie
    });
    tokenManager.clear();
  }
);

// ─── Slice ──────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Preserved existing reducer
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    // Call this when axios gets a 401 it can't recover from
    sessionExpired: (state) => {
      state.user = null;
      state.error = 'Session expired. Please log in again.';
      tokenManager.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Sync user after silent token refresh
    syncUser: (state) => {
      const token = tokenManager.get();
      if (token) {
        try { state.user = jwtDecode<AuthUser>(token); }
        catch { state.user = null; }
      } else {
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    // initAuth
    builder
      .addCase(initAuth.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload as AuthUser;
        state.isInitializing = false;
      })
      .addCase(initAuth.rejected, (state) => {
        state.user = null;
        state.isInitializing = false; // no session — show login
      });

    // login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload as AuthUser;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    // logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setOpenModal, sessionExpired, clearError, syncUser } = authSlice.actions;
export default authSlice.reducer;
