package com.quizhire.quizhire.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.models.test.TestResult;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Integer> {
	@Query("SELECT tr FROM TestResult tr WHERE tr.test = :test")
    List<TestResult> findTestResultByTest(@Param("test") Test test);
	

}
