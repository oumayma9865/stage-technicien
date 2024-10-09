package com.quizhire.quizhire.services.impl;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizhire.quizhire.models.Role;
import com.quizhire.quizhire.models.User;
import com.quizhire.quizhire.repositories.RoleRepository;
import com.quizhire.quizhire.repositories.UserRepository;
import com.quizhire.quizhire.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
	private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
	@Override
	public User getUserById(Integer id) {
		  return userRepository.findById(id).orElse(null);
	}

	@Override
	public User addUser(User user) throws Exception{
			
			User theUser=this.userRepository.findByUsername(user.getUsername());
			
			if(theUser!=null) {
				System.out.println("This username is already exit");
				throw new Exception("this username  already exist try again");
			}
			
			else {
		       
		        Role role = this.roleRepository.findByRolename(user.getRole().getRolename());

		        if (role == null) {
		            role = this.roleRepository.save(user.getRole());
		        }
		        user.setRole(role);
		        theUser = this.userRepository.save(user);
		    }

		    return theUser;
	}

	@Override
	public User updateUser(Integer id, User user) {
	return userRepository.save(user);
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public void deleteUser(Integer id) {
		userRepository.deleteById(id);
		
	}

}
