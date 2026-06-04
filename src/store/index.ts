import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalStataProps {
  expandedPlayer: boolean;
  setExpandedPlayer: (expanded: boolean) => void;
}

const useGlobalStore = create<GlobalStataProps>()(
  devtools(
    persist(
      (set) => ({
        expandedPlayer: false,
        setExpandedPlayer: (expanded) => set({ expandedPlayer: expanded }),
      }),
      {
        name: "global-storage",
      },
    ),
  ),
);

export default useGlobalStore;
