package com.quizhire.quizhire.services;

import java.util.List;
import com.quizhire.quizhire.models.User;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User addUser(User user) throws Exception;
    User updateUser(Integer id, User user);
    User findByUsername(String username);
    User findByEmail(String email);
    void deleteUser(Integer id);

}
