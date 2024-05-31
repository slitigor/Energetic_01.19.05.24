import { ZodError } from "zod";
import { appDB } from "../helper";
import { SubstationStoreState, schemaSubstation } from "../types";
import { create } from "zustand";
import {} from "@/data/types";

export const useSubstationStore = create<SubstationStoreState>()(
  (set, get) => ({
    substationList: [],
    actions: {
      getAllSubstation: async () => {
        try {
          const r = await appDB.get("/substation");
          if (r.status !== 200) throw new Error("Server Error!");
          const data = schemaSubstation.array().parse(r.data);
          set({
            substationList: data,
          });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      createSubstation: async (substation) => {
        const { substationList } = get();
        try {
          const r = await appDB.post("/substation", substation);
          if (r.status !== 200 && r.status !== 201)
            throw new Error("Server Error!");
          const created = schemaSubstation.parse(r.data);
          set({
            substationList: [...substationList, created],
          });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      updateSubstation: async (id, substation) => {
        const { substationList } = get();
        try {
          const r = await appDB.put(`/substation/${id}`, substation);
          if (r.status !== 200) throw new Error("Server Error!");
          const updated = schemaSubstation.parse(r.data);
          set({
            substationList: substationList.map((s) =>
              s.id === id ? updated : s
            ),
          });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      deleteSubstation: async (id) => {
        const { substationList } = get();
        try {
          const r = await appDB.delete(`/substation/${id}`);
          if (r.status !== 200) throw new Error("Server Error!");
          set({
            substationList: substationList.filter((s) => s.id !== id),
          });
        } catch (err) {
          console.log(err);
        }
      },
    },
  })
);
