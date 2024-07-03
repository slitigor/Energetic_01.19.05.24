package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "rza_type")
public class RzaType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(25)")
    private String type;
    @Column(nullable = false)
    private Byte verificationCycle;
    @OneToMany(mappedBy = "type")
    private List<Protection> protectionList = new ArrayList<>();
}
