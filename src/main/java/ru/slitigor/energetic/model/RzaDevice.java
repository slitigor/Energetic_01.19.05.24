package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "device")
    private List<Protection> protectionList = new ArrayList<>();
}
