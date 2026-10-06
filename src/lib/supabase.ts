import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project')
);

// Create real supabase client if config is available
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

// Cross-tab Realtime Event Bus for offline / local-first instant preview
class RealtimeBus {
  private channel: BroadcastChannel | null = null;
  private listeners: Map<string, Set<(payload: any) => void>> = new Map();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('bushra_salon_realtime');
      this.channel.onmessage = (event) => {
        const { table, eventType, data } = event.data;
        this.emitLocal(table, { eventType, new: data, old: data });
      };
    }
  }

  subscribe(table: string, callback: (payload: any) => void) {
    if (!this.listeners.has(table)) {
      this.listeners.set(table, new Set());
    }
    this.listeners.get(table)?.add(callback);

    return () => {
      this.listeners.get(table)?.delete(callback);
    };
  }

  publish(table: string, eventType: 'INSERT' | 'UPDATE' | 'DELETE', data: any) {
    // Local tab
    this.emitLocal(table, { eventType, new: data, old: data });
    // Other tabs
    if (this.channel) {
      this.channel.postMessage({ table, eventType, data });
    }
  }

  private emitLocal(table: string, payload: any) {
    const tableListeners = this.listeners.get(table);
    if (tableListeners) {
      tableListeners.forEach((cb) => cb(payload));
    }
    const globalListeners = this.listeners.get('*');
    if (globalListeners) {
      globalListeners.forEach((cb) => cb({ ...payload, table }));
    }
  }
}

export const realtimeBus = new RealtimeBus();
