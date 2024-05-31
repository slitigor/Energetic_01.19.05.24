import { create } from "zustand";
import { ConnectionStoreState, schemaConnection } from "../types";
import { appDB } from "../helper";
import { ZodError } from "zod";

export const useConnectionStore = create<ConnectionStoreState>()(
  (set, get) => ({
    connectionList: [],
    actions: {
      getAllConnections: async () => {
        try {
          const r = await appDB.get("/connection");
          if (r.status !== 200) throw new Error("Server Error!");
          const data = schemaConnection.array().parse(r.data);
          set({ connectionList: data });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      createConnection: async (connection) => {
        const { connectionList } = get();
        try {
          const r = await appDB.post("/connection", connection);
          if (r.status !== 200 && r.status !== 201)
            throw new Error("Server Error!");
          const data = schemaConnection.parse(r.data);
          set({ connectionList: [...connectionList, data] });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      updateConnection: async (id, connection) => {
        const { connectionList } = get();
        try {
          const r = await appDB.put(`/connection/${id}`, connection);
          if (r.status !== 200) throw new Error("Server Error!");
          const data = schemaConnection.parse(r.data);
          set({
            connectionList: connectionList.map((c) => (c.id === id ? data : c)),
          });
        } catch (err) {
          if (err instanceof ZodError) {
            console.log(err);
          }
          console.log(err);
        }
      },
      deleteConnection: async (id) => {
        const { connectionList } = get();
        try {
          const r = await appDB.delete(`/connection/${id}`);
          if (r.status !== 200) throw new Error("Server Error!");
          set({
            connectionList: connectionList.filter((c) => c.id !== id),
          });
        } catch (err) {
          console.log(err);
        }
      },
    },
  })
);
