package ru.slitigor.energetic.model.enums;

public enum PSSchema {
    PS110_35_10("110/35/10 кВ"),
    PS110_35_6("110/35/6 кВ"),
    PS110_10("110/10 кВ"),
    PS110_6("110/6 кВ"),
    PS35_10("35/10 кВ"),
    PS35_6("35/6 кВ");

    private String value;

    PSSchema(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static PSSchema getSchemaByVal(String val) {
        for (PSSchema schema: PSSchema.values())
            if (schema.value.equals(val)) return schema;
        return null;
    }
}
