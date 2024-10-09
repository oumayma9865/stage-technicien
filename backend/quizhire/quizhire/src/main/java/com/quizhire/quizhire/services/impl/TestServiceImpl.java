package com.quizhire.quizhire.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.repositories.TestRepository;
import com.quizhire.quizhire.services.TestService;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    @Override
    public Test getTestById(Integer id) throws Exception {
    	Test test=this.testRepository.findById(id).get();
		if(test==null) {
			throw new Exception("test not found exception");
		}
		return test;
    }

    @Override
    public Test addTest(Test test) {
        return testRepository.save(test);
    }
    
    @Override
    public Test updateTest(Integer id, Test test) {
    	 return testRepository.save(test);
    }

    @Override
    public void deleteTest(Integer id) throws Exception {
    	Test test=this.testRepository.findById(id).get();
		if(test==null) {
			throw new Exception("test not found exception");
		}
		this.testRepository.deleteById(id);
    }

	

	@Override
	public Test findByTitre(String titre) {
		return testRepository.findByTitre(titre);
	}

	

}
