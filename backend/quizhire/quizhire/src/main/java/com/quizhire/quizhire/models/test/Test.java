package com.quizhire.quizhire.models.test;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quizhire.quizhire.models.User;

import jakarta.persistence.*;

@Entity
@Table(name = "Test")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String titre;
    private String poste;
    private String niveau;
    private String duree;
    private Date date;

    @ManyToMany
    @JoinTable(
        name = "test_skill",
        joinColumns = @JoinColumn(name = "test_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;
   
    @ManyToMany
    @JoinTable(
        name = "test_quiz",
        joinColumns = @JoinColumn(name = "test_id"),
        inverseJoinColumns = @JoinColumn(name = "quiz_id")
    )
    private List<Quiz> quizzes;

    @ManyToMany
    @JoinTable(
        name = "test_user",
        joinColumns = @JoinColumn(name = "test_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TestResult> testResults= new ArrayList<>();

    public Test() {
    }

    public Test(String titre, String poste, String niveau, String duree, Date date, List<Skill> skills, List<Quiz> quizzes, List<User> users, List<TestResult> testResults) {
        this.titre = titre;
        this.poste = poste;
        this.niveau = niveau;
        this.duree = duree;
        this.date = date;
        this.skills = skills;
        this.quizzes = quizzes;
        this.users = users;
        this.testResults = testResults;
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

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getDuree() {
        return duree;
    }

    public void setDuree(String duree) {
        this.duree = duree;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<TestResult> getTestResults() {
        return testResults;
    }

    public void setTestResults(List<TestResult> testResults) {
        this.testResults = testResults;
    }

    @Override
    public String toString() {
        return "Test [id=" + id + ", titre=" + titre + ", poste=" + poste + ", niveau=" + niveau + ", duree=" + duree
                + ", date=" + date + ", skills=" + skills + ", quizzes=" + quizzes + ", users=" + users
                + ", testResults=" + testResults + "]";
    }
}
