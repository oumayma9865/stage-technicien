package com.quizhire.quizhire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizhire.quizhire.models.test.Option;
import com.quizhire.quizhire.models.test.Question;
import com.quizhire.quizhire.services.OptionService;
import com.quizhire.quizhire.services.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/options")
public class OptionController {

    @Autowired
    private OptionService optionService;
    @Autowired
    private QuestionService questionService;

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Option>> getOptionsByQuestion(@PathVariable Integer questionId) throws Exception {
    	 Question question = questionService.getQuestionById(questionId);
        List<Option> options = optionService.getOptionsByQuestion(question);
        return ResponseEntity.ok(options);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Option> getOptionById(@PathVariable Integer id) {
        try {
            Option option = optionService.getOptionById(id);
            return ResponseEntity.ok(option);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Option> createOption(@RequestBody Option option) {
        Option newOption = optionService.addOption(option);
        return ResponseEntity.ok(newOption);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Option> updateOption(@PathVariable Integer id, @RequestBody Option option) {
        Option updatedOption = optionService.updateOption(id, option);
        return ResponseEntity.ok(updatedOption);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Integer id) {
        try {
            optionService.deleteOption(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}