package com.quizhire.quizhire.models.test;

import jakarta.persistence.*;

@Entity
@Table(name = "Option")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String texte;
    private boolean isCorrect;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "question_id")
    private Question question;

    public Option() {
    }

    public Option(String texte, boolean isCorrect) {
        this.texte = texte;
        this.isCorrect = isCorrect;
    }

    public Integer getId() {
        return id;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    @Override
    public String toString() {
        return "Option [id=" + id + ", texte=" + texte + ", isCorrect=" + isCorrect + ", question=" + question + "]";
    }
}
