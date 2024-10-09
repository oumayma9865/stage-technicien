package com.quizhire.quizhire.services.impl;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.User;
import com.quizhire.quizhire.repositories.UserRepository;





@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	   @Autowired
	    private UserRepository userRepository;

	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        User user = userRepository.findByUsername(username);
	        
	        if (user == null) {
	            System.out.println("User not found with username: " + username);
	            throw new UsernameNotFoundException("User not found with username: " + username);
	        }

	        // You may need to adapt this based on your User entity and how UserDetails is implemented
	        return new org.springframework.security.core.userdetails.User(
	            user.getUsername(), 
	            user.getPassword(), 
	    
	            Collections.emptyList()
	        );
	    }
	}