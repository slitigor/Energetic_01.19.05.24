package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.Districts;
import ru.slitigor.energetic.model.enums.PSSchema;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table
public class Substation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(nullable = false)
    private PSSchema psSchema;
    @Column(nullable = false)
    private Districts district;
    @OneToMany(mappedBy = "substation")
    private List<Connection> connectionList = new ArrayList<>();
}
