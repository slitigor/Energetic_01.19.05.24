import { create } from "zustand";
import { IRzaDevice } from "../types";
import { appDB } from "../helper";

interface RzaDeviceStore {
  deviceList: IRzaDevice[];
  getAllDevices: () => Promise<void>;
  createDevice: (d: IRzaDevice) => Promise<void>;
  updateDevice: (id: number, d: IRzaDevice) => Promise<void>;
  deleteDevice: (id: number) => Promise<void>;
}

export const useRzaDeviceStore = create<RzaDeviceStore>()((set, get) => ({
  deviceList: [],
  getAllDevices: async () => {
    try {
      const r = await appDB.get("rza_device");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        deviceList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createDevice: async (d) => {
    const { deviceList } = get();
    try {
      const r = await appDB.post("rza_device", d);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        deviceList: [...deviceList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateDevice: async (id, d) => {
    const { deviceList } = get();
    try {
      const r = await appDB.put(`rza_device/${id}`, d);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        deviceList: deviceList.map((d) => (d.id === id ? r.data : d)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteDevice: async (id) => {
    const { deviceList } = get();
    try {
      const r = await appDB.delete(`rza_device/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        deviceList: deviceList.filter((d) => d.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
