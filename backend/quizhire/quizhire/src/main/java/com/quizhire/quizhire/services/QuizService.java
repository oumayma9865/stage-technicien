package com.quizhire.quizhire.services;

import java.util.List;

import com.quizhire.quizhire.models.test.Quiz;
import com.quizhire.quizhire.models.test.Test;

public interface QuizService {
    List<Quiz> getQuizzes();
    Quiz getQuizById(Integer id) throws Exception;
    List<Quiz> getQuizzesByTest(Test test);
    Quiz addQuiz(Quiz quiz);
    Quiz updateQuiz(Integer id, Quiz quiz) throws Exception;
    void deleteQuiz(Integer id) throws Exception;
    Quiz findbyTitre(String titre);
}

