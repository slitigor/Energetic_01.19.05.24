import { create } from "zustand";
import { TypeStoreState, schemaRzaType } from "../types";
import { appDB } from "../helper";
import { ZodError } from "zod";

export const useRzaTypeStore = create<TypeStoreState>()((set, get) => ({
  typeList: [],
  actions: {
    getAllTypes: async () => {
      try {
        const r = await appDB.get("rza_type");
        if (r.status !== 200) throw new Error("Server Error!");
        const data = schemaRzaType.array().parse(r.data);
        set({ typeList: data });
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
        }
        console.log(err);
      }
    },
    createType: async (t) => {
      const { typeList } = get();
      try {
        const r = await appDB.post("rza_type", t);
        if (r.status !== 200 && r.status !== 201)
          throw new Error("Server Error!");
        const data = schemaRzaType.parse(r.data);
        set({ typeList: [...typeList, data] });
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
        }
        console.log(err);
      }
    },
    updateType: async (id, t) => {
      const { typeList } = get();
      try {
        const r = await appDB.put(`rza_type/${id}`, t);
        if (r.status !== 200) throw new Error("Server Error!");
        const data = schemaRzaType.parse(r.data);
        set({ typeList: typeList.map((t) => (t.id === id ? data : t)) });
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
        }
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
  },
}));
