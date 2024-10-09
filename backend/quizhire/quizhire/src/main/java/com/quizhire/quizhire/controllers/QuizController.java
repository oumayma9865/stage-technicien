package com.quizhire.quizhire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizhire.quizhire.models.test.Quiz;
import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.services.QuizService;
import com.quizhire.quizhire.services.TestService;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;
    
    @Autowired
    private TestService testService;
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Integer id) {
        try {
            Quiz quiz = quizService.getQuizById(id);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<Quiz>> getQuizzesByTest(@PathVariable Integer testId) throws Exception {
        Test test = testService.getTestById(testId);
        if (test == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<Quiz> quizzes = quizService.getQuizzesByTest(test);
        return ResponseEntity.ok(quizzes);
    }


    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz newQuiz = quizService.addQuiz(quiz);
        return ResponseEntity.ok(newQuiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Integer id, @RequestBody Quiz quiz) throws Exception {
        Quiz updatedQuiz = quizService.updateQuiz(id, quiz);
        return ResponseEntity.ok(updatedQuiz);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Integer id) {
        try {
            quizService.deleteQuiz(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/titre/{titre}")
    public ResponseEntity<Quiz> getQuizByTitre(@PathVariable String titre) {
        Quiz quiz = quizService.findbyTitre(titre);
        if (quiz != null) {
            return ResponseEntity.ok(quiz);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}