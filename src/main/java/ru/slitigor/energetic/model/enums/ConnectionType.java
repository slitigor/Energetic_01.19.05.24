package ru.slitigor.energetic.model.enums;

public enum ConnectionType {
    VL("ВЛ"),
    KVL("КВЛ"),
    SV("СВ"),
    SH_SV("ШСВ"),
    V("В"),
    TS("Т"),
    TN("ТН"),
    TT("ТТ"),
    TSN("ТСН"),
    OPU("Общеподстанционные устройства");

    private String value;

    ConnectionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ConnectionType getTypeByVal(String val) {
        for (ConnectionType ct: ConnectionType.values())
            if (ct.value.equals(val)) return ct;
        return null;
    }
}
