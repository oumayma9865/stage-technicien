package com.quizhire.quizhire.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizhire.quizhire.models.test.Test;
import com.quizhire.quizhire.models.test.TestResult;
import com.quizhire.quizhire.services.TestResultService;

@RestController
@RequestMapping("/test-results")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable Integer id) {
        try {
            TestResult testResult = testResultService.getTestResultById(id);
            return ResponseEntity.ok(testResult);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TestResult> createTestResult(@RequestBody TestResult testResult) {
        TestResult newTestResult = testResultService.CreateTestResult(testResult);
        return ResponseEntity.ok(newTestResult);
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<TestResult>> getTestResultsByTest(@PathVariable Integer testId) {
        try {
            Test test = new Test();
            test.setId(testId);
            List<TestResult> testResults = testResultService.getTestResultByTest(test);
            return ResponseEntity.ok(testResults);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
