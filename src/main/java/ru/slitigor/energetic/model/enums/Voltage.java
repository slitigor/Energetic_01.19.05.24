package ru.slitigor.energetic.model.enums;

public enum Voltage {
    NOM_110("110 кВ"),
    NOM_35("35 кВ"),
    NOM_10("10 кВ"),
    NOM_6("6 кВ"),
    NOM_04("0.4 кВ"),
    NOM_022("0.22 кВ");

    private String value;

    Voltage(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Voltage getNominalByVal(String val) {
        for (Voltage voltage : Voltage.values())
            if (voltage.getValue().equals(val))
                return voltage;
        return null;
    }
}
