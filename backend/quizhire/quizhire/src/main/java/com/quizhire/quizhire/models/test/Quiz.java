package com.quizhire.quizhire.models.test;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "Quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titre;
    private String difficulte;
    private String domaine;
    private Integer score;
    private String temps;

    @ManyToOne
    private Skill skill;
   
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Question> questions;
    
    @ManyToMany(mappedBy = "quizzes", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Test> tests;

    public Quiz(String titre, String difficulte, String domaine, Integer score, String temps, Skill skill,
                List<Question> questions,List<Test> tests ) {
        this.titre = titre;
        this.difficulte = difficulte;
        this.domaine = domaine;
        this.score = score;
        this.temps = temps;
        this.skill = skill;
        this.questions = questions;
        this.tests=tests;
    }

    public Quiz() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDifficulte() {
        return difficulte;
    }

    public void setDifficulte(String difficulte) {
        this.difficulte = difficulte;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getTemps() {
        return temps;
    }

    public void setTemps(String temps) {
        this.temps = temps;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
   
    public List<Test> getTests() {
		return tests;
	}

	public void setTests(List<Test> tests) {
		this.tests = tests;
	}

	@Override
    public String toString() {
        return "Quiz [id=" + id + ", titre=" + titre + ", difficulté=" + difficulte + ", domaine=" + domaine
                + ", score=" + score + ", temps=" + temps + ", skill=" + skill + ", questions=" + questions + ", tests=" + tests + "]";
    }
}
