package com.quizhire.quizhire.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quizhire.quizhire.models.test.Option;
import com.quizhire.quizhire.models.test.Question;
@Repository
public interface OptionRepository extends JpaRepository<Option, Integer> {
	 @Query("SELECT o FROM Option o WHERE o.question = :question")
	  List<Option> findOptionsByQuestion(@Param("question") Question question);

}
