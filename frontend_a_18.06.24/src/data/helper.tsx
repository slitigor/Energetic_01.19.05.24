import axios from "axios";
import { dbPath } from "./types";

export const appDB = axios.create({ baseURL: dbPath });
appDB.defaults.headers.common["Content-Type"] = "application/json";
