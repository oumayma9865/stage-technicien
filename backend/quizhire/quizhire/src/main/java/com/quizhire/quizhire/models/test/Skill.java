package com.quizhire.quizhire.models.test;
import jakarta.persistence.*;


@Entity

@Table(name = "Skill")

public class Skill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String skillname;
	public Skill(String skillname) {
		this.skillname = skillname;
	}
	
	public Skill() {
		super();
	}

	public Integer getId() {
		return id;
	}
	public String getSkill() {
		return skillname;
	}
	public void setSkill(String skill) {
		this.skillname = skill;
	}
	@Override
	public String toString() {
		return "Skill [id=" + id + ", skillname=" + skillname + ", getId()=" + getId() + ", getSkill()=" + getSkill()
				+ "]";
	}
	
	

}
