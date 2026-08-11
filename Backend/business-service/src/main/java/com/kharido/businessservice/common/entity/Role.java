package com.kharido.businessservice.common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "CommonRole")
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleid")
    private Integer roleId;

    @Column(name = "rolename", nullable = false, unique = true, length = 20)
    private String roleName;
}
