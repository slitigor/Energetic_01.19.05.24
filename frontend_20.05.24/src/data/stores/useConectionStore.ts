import { create } from "zustand";
import { IConnection } from "../types";
import { appDB } from "../helper";

interface ConnectionStore {
  connectionList: IConnection[];
  getAllConnection: () => Promise<void>;
  createConnection: (c: IConnection) => Promise<void>;
  updateConnection: (id: number, c: IConnection) => Promise<void>;
  deleteConnection: (id: number) => Promise<void>;
}

export const useConnectionStore = create<ConnectionStore>()((set, get) => ({
  connectionList: [],
  getAllConnection: async () => {
    try {
      const r = await appDB.get("connection");
      if (r.status !== 200) throw new Error("Server Error!");
      set({ connectionList: r.data });
    } catch (err) {
      console.log(err);
    }
  },
  createConnection: async (c) => {
    const { connectionList } = get();
    try {
      const r = await appDB.post("connection", c);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({ connectionList: [...connectionList, r.data] });
    } catch (err) {
      console.log(err);
    }
  },
  updateConnection: async (id, c) => {
    const { connectionList } = get();
    try {
      const r = await appDB.put(`connection/${id}`, c);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        connectionList: connectionList.map((c) => (c.id === id ? r.data : c)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteConnection: async (id) => {
    const { connectionList } = get();
    try {
      const r = await appDB.delete(`connection/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        connectionList: connectionList.filter((c) => c.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
  // addDevice: async (device) => {
  //   try {
  //     const r = await appDB.put()
  //   } catch(err) {
  //     console.log(err);

  //   }
  // }
}));
