package com.quizhire.quizhire.services;

import java.util.List;
import com.quizhire.quizhire.models.test.Skill;

public interface SkillService {
    List<Skill> getAllSkill();
    Skill addSkill(Skill skill);
    Skill findBySkillname(String skillname);

}
