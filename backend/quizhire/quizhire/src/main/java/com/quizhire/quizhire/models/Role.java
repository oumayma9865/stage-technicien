package com.quizhire.quizhire.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;


@Entity

@Table(name = "Role")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String rolename;
	@JsonIgnore
    @OneToMany(fetch=FetchType.LAZY)
    private List <User> user;
	
	public Role(String rolename, List<User> user) {
		this.user = user;
		this.rolename = rolename;
	}
	

	public Role() {
		super();
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", rolename=" + rolename + ", user=" + user + ", getId()=" + getId() + ", getUser()="
				+ getUser() + ", getRolename()=" + getRolename() + "]";
	}
    
	
	

}
