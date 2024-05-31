package ru.slitigor.energetic.model.enums;

public enum Districts {
    CHRES("Челябинский"),
    ARGRES("Аргаяшский"),
    EMANRES("Еманжелинский"),
    ETKRES("Еткульский");

    private String value;

    Districts(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Districts getDistrictByVal(String val) {
        for (Districts district: Districts.values())
            if (district.value.equals(val)) return district;
        return null;
    }
}
