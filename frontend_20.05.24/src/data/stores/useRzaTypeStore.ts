import { create } from "zustand";
import { IRzaType } from "../types";
import { appDB } from "../helper";

interface RzaTypeStore {
  typeList: IRzaType[];
  getAllTypes: () => Promise<void>;
  createType: (t: IRzaType) => Promise<void>;
  updateType: (id: number, t: IRzaType) => Promise<void>;
  deleteType: (id: number) => Promise<void>;
}

export const useRzaTypeStore = create<RzaTypeStore>()((set, get) => ({
  typeList: [],
  getAllTypes: async () => {
    try {
      const r = await appDB.get("rza_type");
      if (r.status !== 200) throw new Error("Server Error!");
      set({ typeList: r.data });
    } catch (err) {
      console.log(err);
    }
  },
  createType: async (t) => {
    const { typeList } = get();
    try {
      const r = await appDB.post("rza_type", t);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({ typeList: [...typeList, r.data] });
    } catch (err) {
      console.log(err);
    }
  },
  updateType: async (id, t) => {
    const { typeList } = get();
    try {
      const r = await appDB.put(`rza_type/${id}`, t);
      if (r.status !== 200) throw new Error("Server Error!");
      set({ typeList: typeList.map((t) => (t.id === id ? r.data : t)) });
    } catch (err) {
      console.log(err);
    }
  },
  deleteType: async (id) => {
    const { typeList } = get();
    try {
      const r = await appDB.delete(`rza_type/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({ typeList: typeList.filter((t) => t.id !== id) });
    } catch (err) {
      console.log(err);
    }
  },
}));
