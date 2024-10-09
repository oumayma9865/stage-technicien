package com.quizhire.quizhire.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.test.Quiz;
import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.repositories.QuizRepository;
import com.quizhire.quizhire.services.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;
	@Override
	public List<Quiz> getQuizzes() {
		 return quizRepository.findAll();
	}

	@Override
	public Quiz getQuizById(Integer id) throws Exception{
		Quiz quiz=this.quizRepository.findById(id).get();
		if(quiz==null) {
			throw new Exception("Quiz not found exception");
		}
		return quiz;
	}
	@Override
	public List<Quiz> getQuizzesByTest(Test test){
		return this.quizRepository.findByTests(test);
		
	}

	@Override
	public Quiz addQuiz(Quiz quiz) {
		return quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Integer id, Quiz updatedQuiz) throws Exception {
       Quiz existingQuiz = quizRepository.findById(id).orElseThrow(() -> new Exception("Quiz not found"));
        
        // Only update specific fields
        existingQuiz.setTitre(updatedQuiz.getTitre());
        existingQuiz.setScore(updatedQuiz.getScore());
        existingQuiz.setTemps(updatedQuiz.getTemps());

        return quizRepository.save(existingQuiz);
	}

	@Override
	public void deleteQuiz(Integer id)throws Exception {
		Quiz quiz=this.quizRepository.findById(id).get();
		if(quiz==null) {
			throw new Exception("Quiz not found exception");
		}
		this.quizRepository.deleteById(id);
		
	}

	@Override
	public Quiz findbyTitre(String titre) {
		return quizRepository.findByTitre(titre);
	}

}
