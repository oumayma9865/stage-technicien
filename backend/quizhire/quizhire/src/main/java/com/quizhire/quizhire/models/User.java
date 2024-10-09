package com.quizhire.quizhire.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name = "User")
public class User implements UserDetails{
   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String password;
    private String username;
    private Integer phone;
    @Column(columnDefinition = "TEXT")
    private String cv;
    private boolean isLocked;
    private boolean isEnabled;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public User() {}

    public User(String email, String password, String username, Integer phone, Role role,String cv) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phone = phone;
        this.role = role;
        this.cv=cv;
    }
    

    public boolean isLocked() {
		return isLocked;
	}
    

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    
    
   
    public String getCv() {
		return cv;
	}

	public void setCv(String cv) {
		this.cv = cv;
	}

	@Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority(role.getRolename()));
        return authorities;
    }
    
	 @Override
	    @JsonIgnore
	    public boolean isAccountNonExpired() {
	        return true; 
	    }

	    @Override
	    @JsonIgnore
	    public boolean isAccountNonLocked() {
	        return !isLocked; 
	    }

	    @Override
	    @JsonIgnore
	    public boolean isCredentialsNonExpired() {
	        return true; 
	    }
    
 

  

    @Override
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", password=" + password + ", username=" + username + ", phone="
                +  ", cv="+  cv + ", role=" + role + "]";
    }

}

