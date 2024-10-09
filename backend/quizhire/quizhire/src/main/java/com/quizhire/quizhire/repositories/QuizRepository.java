package com.quizhire.quizhire.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quizhire.quizhire.models.test.Quiz;
import com.quizhire.quizhire.models.test.Test;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
	 @Query("SELECT q FROM Quiz q WHERE q.titre = :titre")
	  Quiz findByTitre(@Param("titre") String titre);

	 List<Quiz> findByTests(Test test);

}
