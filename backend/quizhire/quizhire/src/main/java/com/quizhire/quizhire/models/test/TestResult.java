package com.quizhire.quizhire.models.test;

import java.sql.Date;
import com.quizhire.quizhire.models.User;

import jakarta.persistence.*;

@Entity
@Table(name = "TestResult")
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private Integer score;
    private Integer totalQuestion;
    private Integer correctAnswers;
    private String tempspasse;
    
    private Date date;
    
    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    public TestResult() {
        super();
    }

    public TestResult(Integer score, Integer totalQuestion,Integer correctAnswers, String tempspasse, Date date, User user, Test test) {
        this.score = score;
        this.totalQuestion=totalQuestion;
        this.correctAnswers=correctAnswers;
        this.tempspasse = tempspasse;
        this.date = date;
        this.user = user;
        this.test = test;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    

    public Integer getTotalQuestion() {
		return totalQuestion;
	}

	public void setTotalQuestion(Integer totalQuestion) {
		this.totalQuestion = totalQuestion;
	}

	public Integer getCorrectAnswers() {
		return correctAnswers;
	}

	public void setCorrectAnswers(Integer correctAnswers) {
		this.correctAnswers = correctAnswers;
	}

	public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getTempspasse() {
        return tempspasse;
    }

    public void setTempspasse(String tempspasse) {
        this.tempspasse = tempspasse;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    @Override
    public String toString() {
        return "TestResult [id=" + id + ", score=" + score + ", tempspasse=" + tempspasse + ", date=" + date
                + ", user=" + user + ", test=" + test + "]";
    }
}
