package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.ConnectionType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "connection", uniqueConstraints = {@UniqueConstraint(name = "connection_name_substation_id_key",
        columnNames = {"name", "substation_id"})})
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "VARCHAR(80)")
    private String name;
    @Column(nullable = false)
    private ConnectionType connectionType;
    private Voltage voltage;
    @ManyToOne
    @JoinColumn(name = "substation_id", columnDefinition = "id", nullable = false)
    private Substation substation;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "connection_protection",
        joinColumns = @JoinColumn(name = "connection_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "protection_id", referencedColumnName = "id")
    )
    private Set<Protection> protectionList = new HashSet<>();

    public void addProtection(Protection protection) {
        if (protectionList.contains(protection)) return;
        protectionList.add(protection);
        protection.getConnectionList().add(this);
    }

    public void removeProtection(Protection protection) {
        if (protectionList.contains(protection)) {
            protectionList.remove(protection);
            protection.getConnectionList().remove(this);
        }
    }
}

//РП 110 кВ (ВЛ 110 кВ Челябинская ТЭЦ-1-Пластмасс )
