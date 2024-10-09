package com.quizhire.quizhire.services.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.models.test.TestResult;
import com.quizhire.quizhire.repositories.TestResultRepository;
import com.quizhire.quizhire.services.TestResultService;

@Service
public class TestResultServiceImpl implements TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;

	@Override
	public TestResult getTestResultById(Integer id) throws Exception {
		TestResult testResult=testResultRepository.findById(id).get();
		if(testResult==null) {
			throw new Exception("test not found exception");
		}
		return testResult;
	}

	@Override
	public TestResult CreateTestResult(TestResult testResult) {
		return testResultRepository.save(testResult);
	}

	@Override
	public List<TestResult> getTestResultByTest(Test test) throws Exception {
		return testResultRepository.findTestResultByTest(test);
		
	}

}
