package com.quizhire.quizhire.services.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.test.Skill;
import com.quizhire.quizhire.repositories.SkillRepository;
import com.quizhire.quizhire.services.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<Skill> getAllSkill() {
        return skillRepository.findAll();
    }

    @Override
    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

	@Override
	public Skill findBySkillname(String skillname) {
		return skillRepository.findBySkillname(skillname);
	}
   

 

}
