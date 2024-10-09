package com.quizhire.quizhire.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.quizhire.quizhire.models.test.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
	@Query("SELECT s FROM Skill s WHERE s.skillname = :skillname")
	public Skill findBySkillname(@Param("skillname") String skillname);

}
