package com.quizhire.quizhire.controllers;

import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizhire.quizhire.Exception.UserWithSameUsernameFoundException;
import com.quizhire.quizhire.models.User;
import com.quizhire.quizhire.services.UserService;



@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestParam("cv") MultipartFile cv, @RequestParam("user") String userJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            User existingUser = userService.findByUsername(user.getUsername());
            if (existingUser != null) {
                throw new UserWithSameUsernameFoundException(user.getUsername());
            }

            if (cv != null && !cv.isEmpty()) {
                String base64Cv = Base64.getEncoder().encodeToString(cv.getBytes());
                user.setCv(base64Cv);
            }

            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            User newUser = userService.addUser(user);
            return ResponseEntity.ok(newUser);
        } catch (UserWithSameUsernameFoundException e) {
            return ResponseEntity.status(409).body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/users/{id}/update-info")
    public ResponseEntity<User> updateUserInfo(@PathVariable Integer id,
                                                @RequestPart(value = "cv", required = false) MultipartFile cv,
                                                @RequestPart("user") String userJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            User userUpdates = objectMapper.readValue(userJson, User.class);

            User existingUser = userService.getUserById(id);
            if (existingUser == null) {
                return ResponseEntity.notFound().build();
            }
                existingUser.setUsername(userUpdates.getUsername());
            
                existingUser.setEmail(userUpdates.getEmail());
            
                existingUser.setPhone(userUpdates.getPhone());
            
                existingUser.setEnabled(userUpdates.isEnabled());
            
            
                existingUser.setLocked(userUpdates.isLocked());
            
            if (cv != null && !cv.isEmpty()) {
                String base64Cv = Base64.getEncoder().encodeToString(cv.getBytes());
                existingUser.setCv(base64Cv);
            }

            User updatedUser = userService.updateUser(id, existingUser);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PostMapping("/users/{id}/update-password")
    public ResponseEntity<Map<String, String>> updatePassword(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        try {
            String newPassword = request.get("newPassword");
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(id, user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Mot de passe mis à jour avec succès.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Erreur lors de la mise à jour du mot de passe."));
        }
    }


    @DeleteMapping("/users/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/user/username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/users/user/email/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOpt = Optional.ofNullable(userService.findByEmail(email));

        Map<String, String> response = new HashMap<>();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String newPassword = generateRandomPassword();
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user.getId(), user); // Correction: Update instead of addUser

            try {
                sendEmail(email, newPassword);
                response.put("message", "Un email contenant le nouveau mot de passe a été envoyé.");
                return ResponseEntity.ok(response);
            } catch (MessagingException e) {
                response.put("message", "Erreur lors de l'envoi de l'email.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        } else {
            response.put("message", "Email non trouvé.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    private String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        Random rnd = new Random();
        while (password.length() < 10) { // Longueur du mot de passe
            int index = (int) (rnd.nextFloat() * chars.length());
            password.append(chars.charAt(index));
        }
        return password.toString();
    }

    private void sendEmail(String to, String newPassword) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject("Réinitialisation de votre mot de passe");
        helper.setText("Votre nouveau mot de passe est : " + newPassword);

        mailSender.send(message);
    }
}
