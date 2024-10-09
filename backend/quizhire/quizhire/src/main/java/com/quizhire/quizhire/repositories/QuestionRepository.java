package com.quizhire.quizhire.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizhire.quizhire.models.test.Question;
import com.quizhire.quizhire.models.test.Quiz;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
	@Query("SELECT q FROM Question q WHERE q.quiz = :quiz")
    List<Question> findQuestionsByQuiz(@Param("quiz") Quiz quiz);

}
