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

export interface ISubstation {
  id: number;
  name: string;
  psSchema: string;
  district: string;
}

export const substationColName = new Map([
  ["id", "ID"],
  ["name", "Называние ПС"],
  ["psSchema", "Схема ПС"],
  ["district", "РЭС"],
  ["actions", "Действия"],
]);

export interface IConnection {
  id: number;
  name: string;
  connectionType: string;
  voltage: string;
  substation: ISubstation;
  devices?: IRzaDevice[];
}

export const connectionColName = new Map([
  ["id", "ID"],
  ["name", "Наименование"],
  ["connectionType", "Тип присоединения"],
  ["voltage", "Напряжение"],
  ["substation", "ПС"],
  ["devices", "Устройства РЗА"],
  ["actions", "Действия"],
]);

export interface IRzaDevice {
  id: number;
  name: string;
  description: string;
}

export const deviceColName = new Map([
  ["id", "ID"],
  ["name", "Название"],
  ["description", "Описание"],
  ["actions", "Действия"],
]);

export interface IRzaType {
  id: number;
  type: string;
  jurisdiction: string;
  commissioning: Date;
  verificationCycle: number;
  rzaDevice: IRzaDevice;
}

export const typeColName = new Map([
  ["id", "ID"],
  ["type", "Тип РЗА"],
  ["jurisdiction", "Принадлежность"],
  ["commissioning", "Дата ввода"],
  ["verificationCycle", "Цикличность"],
  ["rzaDevice", "Устройство РЗА"],
  ["actions", "Действия"],
]);
