package com.quizhire.quizhire.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.services.TestService;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable Integer id) {
        try {
            Test test = testService.getTestById(id);
            return ResponseEntity.ok(test);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
        Test newTest = testService.addTest(test);
        return ResponseEntity.ok(newTest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable Integer id, @RequestBody Test test) {
        Test updatedTest = testService.updateTest(id, test);
        return ResponseEntity.ok(updatedTest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable Integer id) {
        try {
            testService.deleteTest(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/titre/{titre}")
    public ResponseEntity<Test> getTestByTitre(@PathVariable String titre) {
        Test test = testService.findByTitre(titre);
        if (test != null) {
            return ResponseEntity.ok(test);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}