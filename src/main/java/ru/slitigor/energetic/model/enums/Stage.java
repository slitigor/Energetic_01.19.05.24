package ru.slitigor.energetic.model.enums;

public enum Stage {
    TASK_SET("Задача поставлена"),
    TASK_PROGRESS("Задача на стадии выполнения"),
    TASK_COMPLETED("Задача завершена");

    private String value;

    Stage(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Stage getStageByVal(String val) {
        for (Stage stage: Stage.values())
            if (stage.value.equals(val))
                return stage;
        return null;
    }
}
