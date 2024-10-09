package com.quizhire.quizhire.services;

import java.util.List;

import com.quizhire.quizhire.models.test.Test;

public interface TestService {
    List<Test> getAllTests();
    Test getTestById(Integer id) throws Exception;
    Test findByTitre(String titre);
    Test addTest(Test test);
    Test updateTest(Integer id, Test test);
    void deleteTest(Integer id) throws Exception;
}


