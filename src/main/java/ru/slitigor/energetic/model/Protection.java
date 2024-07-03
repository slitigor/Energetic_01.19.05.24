package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
public class Protection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(100)")
    private String name;
    @ManyToOne
    @JoinColumn(name = "device_id", columnDefinition = "id", nullable = false)
    private RzaDevice device;
    @ManyToOne
    @JoinColumn(name = "type_id", columnDefinition = "id", nullable = false)
    private RzaType type;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
    fetch = FetchType.LAZY, mappedBy = "protectionList")
    private Set<Connection> connectionList = new HashSet<>();
}
