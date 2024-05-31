import { z } from "zod";

export const schemaSubstation = z.object({
  id: z.number(),
  name: z.string(),
  psSchema: z.string(),
  district: z.string(),
});

export const schemaSubstationStore = z.object({
  substationList: schemaSubstation.array(),
  actions: z.object({
    getAllSubstation: z.function().returns(z.promise(z.void())),
    createSubstation: z
      .function()
      .args(schemaSubstation)
      .returns(z.promise(z.void())),
    updateSubstation: z
      .function()
      .args(z.number(), schemaSubstation)
      .returns(z.promise(z.void())),
    deleteSubstation: z
      .function()
      .args(z.number())
      .returns(z.promise(z.void())),
  }),
});

export type SubstationStoreState = z.infer<typeof schemaSubstationStore>;

export type Substation = z.infer<typeof schemaSubstation>;

export const schemaRzaDevice = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export const schemaDeviceStore = z.object({
  deviceList: schemaRzaDevice.array(),
  actions: z.object({
    getAllDevices: z.function().returns(z.promise(z.void())),
    createDevice: z
      .function()
      .args(schemaRzaDevice)
      .returns(z.promise(z.void())),
    updateDevice: z
      .function()
      .args(z.number(), schemaRzaDevice)
      .returns(z.promise(z.void())),
    deleteDevice: z.function().args(z.number()).returns(z.promise(z.void())),
  }),
});

export type DeviceStoreState = z.infer<typeof schemaDeviceStore>;

export type RzaDevice = z.infer<typeof schemaRzaDevice>;

export const schemaRzaType = z.object({
  id: z.number(),
  type: z.string(),
  jurisdiction: z.string(),
  commissioning: z.date(),
  verificationCycle: z.number(),
  rzaDevice: schemaRzaDevice.optional(),
});

export const schemaRzaTypeStore = z.object({
  typeList: schemaRzaType.array(),
  actions: z.object({
    getAllTypes: z.function().returns(z.promise(z.void())),
    createType: z.function().args(schemaRzaType).returns(z.promise(z.void())),
    updateType: z
      .function()
      .args(z.number(), schemaRzaType)
      .returns(z.promise(z.void())),
    deleteType: z.function().args(z.number()).returns(z.promise(z.void())),
  }),
});

export type TypeStoreState = z.infer<typeof schemaRzaTypeStore>;

export type RzaType = z.infer<typeof schemaRzaType>;

export const schemaConnection = z.object({
  id: z.number(),
  name: z.string(),
  connectionType: z.string(),
  voltage: z.string(),
  substation: schemaSubstation,
  deviceList: schemaRzaDevice.optional(),
});

export const schemaConnectionStore = z.object({
  connectionList: schemaConnection.array(),
  actions: z.object({
    getAllConnections: z.function().returns(z.promise(z.void())),
    createConnection: z
      .function()
      .args(schemaConnection)
      .returns(z.promise(z.void())),
    updateConnection: z
      .function()
      .args(z.number(), schemaConnection)
      .returns(z.promise(z.void())),
    deleteConnection: z
      .function()
      .args(z.number())
      .returns(z.promise(z.void())),
  }),
});

export type ConnectionStoreState = z.infer<typeof schemaConnectionStore>;

export type Connection = z.infer<typeof schemaConnection>;

export const dbPath = "http://localhost:8080/";

export const schemaList: string[] = [
  "110/35/10 кВ",
  "110/35/6 кВ",
  "110/10 кВ",
  "110/6 кВ",
  "35/10 кВ",
  "35/6 кВ",
];

export const voltageList: string[] = [
  "110 кВ",
  "35 кВ",
  "10 кВ",
  "6 кВ",
  "0.4 кВ",
  "0.22 кВ",
];

export const districtList: string[] = [
  "Челябинский",
  "Аргаяшский",
  "Еманжелинский",
  "Еткульский",
];

export const connectionTypeList: string[] = [
  "ВЛ",
  "КВЛ",
  "СВ",
  "ШСВ",
  "В",
  "Т",
  "ТН",
  "ТТ",
  "ТСН",
  "Общеподстанционные устройства",
];

export const jurisdictionList: string[] = ["ЧРДУ", "Челябэнерго"];

export const substationColName = new Map([
  ["id", "ID"],
  ["name", "Называние ПС"],
  ["psSchema", "Схема ПС"],
  ["district", "РЭС"],
  ["actions", "Действия"],
]);

export const connectionColName = new Map([
  ["id", "ID"],
  ["name", "Наименование"],
  ["connectionType", "Тип присоединения"],
  ["voltage", "Напряжение"],
  ["substation", "ПС"],
  ["devices", "Устройства РЗА"],
  ["actions", "Действия"],
]);

export const deviceColName = new Map([
  ["id", "ID"],
  ["name", "Название"],
  ["description", "Описание"],
  ["actions", "Действия"],
]);

export const typeColName = new Map([
  ["id", "ID"],
  ["type", "Тип РЗА"],
  ["jurisdiction", "Принадлежность"],
  ["commissioning", "Дата ввода"],
  ["verificationCycle", "Цикличность"],
  ["rzaDevice", "Устройство РЗА"],
  ["actions", "Действия"],
]);
