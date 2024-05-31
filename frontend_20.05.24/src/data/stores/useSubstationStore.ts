import { appDB } from "../helper";
import { ISubstation } from "../types";
import { create } from "zustand";

interface SubstationStore {
  // current: ISubstation;
  substationList: ISubstation[];
  getAllSubstation: () => Promise<void>;
  createSubstation: (s: ISubstation) => Promise<void>;
  updateSubstation: (id: number, s: ISubstation) => Promise<void>;
  deleteSubstation: (id: number) => Promise<void>;
}

export const useSubstationStore = create<SubstationStore>()((set, get) => ({
  substationList: [],
  getAllSubstation: async () => {
    try {
      const r = await appDB.get("/substation");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createSubstation: async (s) => {
    const { substationList } = get();
    try {
      const r = await appDB.post("/substation", s);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        substationList: [...substationList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateSubstation: async (id, s) => {
    const { substationList } = get();
    try {
      const r = await appDB.put(`/substation/${id}`, s);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.map((substation) =>
          substation.id === id ? r.data : substation
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubstation: async (id) => {
    const { substationList } = get();
    try {
      const r = await appDB.delete(`/substation/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.filter(
          (substation) => substation.id !== id
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
