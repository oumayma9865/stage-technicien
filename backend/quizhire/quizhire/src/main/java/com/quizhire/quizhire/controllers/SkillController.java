package com.quizhire.quizhire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quizhire.quizhire.models.test.Skill;
import com.quizhire.quizhire.services.SkillService;

import java.util.List;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkill();
        return ResponseEntity.ok(skills);
    }

    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill) {
        Skill newSkill = skillService.addSkill(skill);
        return ResponseEntity.ok(newSkill);
    }

    @GetMapping("/{skillname}")
    public ResponseEntity<Skill> getSkillByName(@PathVariable String skillname) {
        Skill skill = skillService.findBySkillname(skillname);
        if (skill != null) {
            return ResponseEntity.ok(skill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}