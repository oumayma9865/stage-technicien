package com.quizhire.quizhire.services.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.test.Option;
import com.quizhire.quizhire.models.test.Question;
import com.quizhire.quizhire.repositories.OptionRepository;
import com.quizhire.quizhire.services.OptionService;

@Service
public class OptionServiceImpl implements OptionService {

    @Autowired
    private OptionRepository optionRepository;

    @Override
    public List<Option> getOptionsByQuestion(Question question) {
        return optionRepository.findOptionsByQuestion(question);
    }
	@Override
	public Option getOptionById(Integer id) throws Exception {
		Option option=this.optionRepository.findById(id).get();
		if(option==null) {
			throw new Exception("Question not found exception");
		}
		return option;
	}

	@Override
	public Option addOption(Option option) {
		return optionRepository.save(option);
	}

	@Override
	public Option updateOption(Integer id, Option option) {
		return optionRepository.save(option);
	}

	@Override
	public void deleteOption(Integer id) throws Exception{
		Option option=this.optionRepository.findById(id).get();
		if(option==null) {
			throw new Exception("Question not found exception");
		}
	   this.optionRepository.deleteById(id);
		
	}

}
