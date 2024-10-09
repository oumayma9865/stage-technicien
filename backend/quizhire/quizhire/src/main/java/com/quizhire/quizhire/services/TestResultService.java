package com.quizhire.quizhire.services;

import java.util.List;

import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.models.test.TestResult;

public interface TestResultService {
    TestResult getTestResultById(Integer id) throws Exception;
    List<TestResult> getTestResultByTest(Test test) throws Exception;
    TestResult CreateTestResult(TestResult testResult);
    

}
