package com.quizhire.quizhire.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quizhire.quizhire.models.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {

 @Query("SELECT r FROM Role r WHERE r.rolename = :rolename")
 public Role findByRolename(@Param("rolename") String rolename);
}
