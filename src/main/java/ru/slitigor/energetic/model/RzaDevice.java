package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
public class RzaDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(10)")
    private String name;
    @Column(nullable = false)
    private String description;
    @OneToMany(mappedBy = "rzaDevice")
    private List<RzaType> typeList = new ArrayList<>();
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY, mappedBy = "deviceList")
    private Set<Connection> connectionList = new HashSet<>();
}
