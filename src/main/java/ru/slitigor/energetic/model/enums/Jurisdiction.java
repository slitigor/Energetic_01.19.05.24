package ru.slitigor.energetic.model.enums;

public enum Jurisdiction {
    CHRDU("ЧРДУ"),
    CES("ЦЭС");

    private String value;

    Jurisdiction(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Jurisdiction getByVal(String val) {
        for (Jurisdiction j: Jurisdiction.values())
            if (j.value.equals(val)) return j;
        return null;
    }
}
