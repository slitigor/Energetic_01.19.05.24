package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.Jurisdiction;

import java.util.Date;

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
    private Jurisdiction jurisdiction;
    private Date commissioning;
    @Column(nullable = false)
    private Byte verificationCycle;
    @ManyToOne
    @JoinColumn(name = "device_id", columnDefinition = "id", nullable = false)
    private RzaDevice rzaDevice;
}
