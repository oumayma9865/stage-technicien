package com.quizhire.quizhire.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.quizhire.quizhire.models.test.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
	 @Query("SELECT t FROM Test t WHERE t.titre = :titre")
	    Test findByTitre(@Param("titre") String titre);

}
