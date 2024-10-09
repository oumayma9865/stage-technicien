package com.quizhire.quizhire.services;

import java.util.List;

import com.quizhire.quizhire.models.test.Question;
import com.quizhire.quizhire.models.test.Quiz;

public interface QuestionService {
    List<Question> getQuestionsByQuiz(Quiz quiz);
    Question getQuestionById(Integer id) throws Exception;
    Question addQuestion(Question question);
    Question updateQuestion(Integer id, Question question);
    void deleteQuestion(Integer id) throws Exception;
}
