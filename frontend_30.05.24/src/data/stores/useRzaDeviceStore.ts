import { create } from "zustand";
import { DeviceStoreState, schemaRzaDevice } from "../types";
import { appDB } from "../helper";
import { ZodError } from "zod";

export const useRzaDeviceStore = create<DeviceStoreState>()((set, get) => ({
  deviceList: [],
  actions: {
    getAllDevices: async () => {
      try {
        const r = await appDB.get("rza_device");
        if (r.status !== 200) throw new Error("Server Error!");
        const data = schemaRzaDevice.array().parse(r.data);
        set({
          deviceList: data,
        });
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
        }
        console.log(err);
      }
    },
    createDevice: async (d) => {
      const { deviceList } = get();
      try {
        const r = await appDB.post("rza_device", d);
        if (r.status !== 200 && r.status !== 201)
          throw new Error("Server Error!");
        const data = schemaRzaDevice.parse(r.data);
        set({
          deviceList: [...deviceList, data],
        });
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
        }
        console.log(err);
      }
    },
    updateDevice: async (id, d) => {
      const { deviceList } = get();
      try {
        const r = await appDB.put(`rza_device/${id}`, d);
        if (r.status !== 200) throw new Error("Server Error!");
        const data = schemaRzaDevice.parse(r.data);
        set({
          deviceList: deviceList.map((d) => (d.id === id ? data : d)),
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
  },
}));
