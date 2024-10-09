package com.quizhire.quizhire.services.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizhire.quizhire.models.test.Option;
import com.quizhire.quizhire.models.test.Question;
import com.quizhire.quizhire.models.test.Quiz;
import com.quizhire.quizhire.repositories.OptionRepository;
import com.quizhire.quizhire.repositories.QuestionRepository;
import com.quizhire.quizhire.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private OptionRepository optionRepository;

    @Override
    public List<Question> getQuestionsByQuiz(Quiz quiz) {
        return questionRepository.findQuestionsByQuiz(quiz);
    }
	@Override
	public Question getQuestionById(Integer id) throws Exception {
		Question question=this.questionRepository.findById(id).get();
		if(question==null) {
			throw new Exception("Question not found exception");
		}
		return question;
	}

	 @Transactional
	    public Question addQuestion(Question question) {
	        Question savedQuestion = questionRepository.save(question);
	        for (Option option : question.getOptions()) {
	            option.setQuestion(savedQuestion);
	            optionRepository.save(option);
	        }
	        return savedQuestion;
	    }

	@Override
	public Question updateQuestion(Integer id, Question question) {
		 return questionRepository.save(question);
	}

	@Override
	public void deleteQuestion(Integer id) throws Exception {
		Question question=this.questionRepository.findById(id).get();
		if(question==null) {
			throw new Exception("Question not found exception");
		}
		questionRepository.deleteById(id);
		
	}

}
