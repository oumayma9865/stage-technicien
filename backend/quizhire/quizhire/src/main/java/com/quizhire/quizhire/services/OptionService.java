package com.quizhire.quizhire.services;

import java.util.List;

import com.quizhire.quizhire.models.test.Option;
import com.quizhire.quizhire.models.test.Question;

public interface OptionService {
    List<Option> getOptionsByQuestion(Question question);
    Option getOptionById(Integer id) throws Exception;
    Option addOption(Option option);
    Option updateOption(Integer id, Option option);
    void deleteOption(Integer id) throws Exception;
}
