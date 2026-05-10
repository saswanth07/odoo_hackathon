package com.traveloop.backend.service;

import com.traveloop.backend.dto.UserProfileRequestDTO;
import com.traveloop.backend.dto.UserProfileResponseDTO;
import com.traveloop.backend.dto.UserRequestDTO;
import com.traveloop.backend.dto.UserResponseDTO;
import com.traveloop.backend.entity.User;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO createUser(UserRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        if (request.getIsAdmin() != null && request.getIsAdmin()) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    public UserProfileResponseDTO getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapToProfileResponse(user);
    }

    public UserProfileResponseDTO updateUserProfile(String currentEmail, UserProfileRequestDTO request) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + currentEmail));

        user.setName(request.getName());
        if (!currentEmail.equals(request.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email already in use");
            }
            user.setEmail(request.getEmail());
        }
        user.setProfilePhotoUrl(request.getProfilePhotoUrl());
        user.setLanguagePreference(request.getLanguagePreference());

        User updatedUser = userRepository.save(user);
        return mapToProfileResponse(updatedUser);
    }

    public void deleteUserAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        userRepository.delete(user);
    }

    private UserProfileResponseDTO mapToProfileResponse(User user) {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setProfilePhotoUrl(user.getProfilePhotoUrl());
        dto.setLanguagePreference(user.getLanguagePreference());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    private UserResponseDTO mapToResponse(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setRole(user.getRole());
        return dto;
    }
}
