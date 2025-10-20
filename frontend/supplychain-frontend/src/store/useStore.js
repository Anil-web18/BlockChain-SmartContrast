import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Wallet state
      account: '',
      contract: null,
      isConnected: false,
      isLoading: false,
      
      // UI state
      darkMode: false,
      notifications: [],
      
      // Shipment state
      shipments: [],
      selectedShipment: null,
      
      // Actions
      setAccount: (account) => set({ account, isConnected: !!account }),
      setContract: (contract) => set({ contract }),
      setLoading: (isLoading) => set({ isLoading }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { 
          id: Date.now(), 
          ...notification 
        }]
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      addShipment: (shipment) => set((state) => ({
        shipments: [...state.shipments, shipment]
      })),
      
      updateShipment: (id, updates) => set((state) => ({
        shipments: state.shipments.map(s => 
          s.id === id ? { ...s, ...updates } : s
        )
      })),
      
      setSelectedShipment: (shipment) => set({ selectedShipment: shipment }),
      
      // Reset state
      reset: () => set({
        account: '',
        contract: null,
        isConnected: false,
        shipments: [],
        selectedShipment: null,
      }),
    }),
    {
      name: 'supply-chain-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        shipments: state.shipments,
      }),
    }
  )
);