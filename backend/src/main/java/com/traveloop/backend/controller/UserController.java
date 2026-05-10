package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.UserProfileRequestDTO;
import com.traveloop.backend.dto.UserProfileResponseDTO;
import com.traveloop.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/me")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getProfile(Authentication authentication) {
        UserProfileResponseDTO response = userService.getUserProfile(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile retrieved successfully", response));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> updateProfile(
            @Valid @RequestBody UserProfileRequestDTO request,
            Authentication authentication) {
        UserProfileResponseDTO response = userService.updateUserProfile(authentication.getName(), request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated successfully", response));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAccount(Authentication authentication) {
        userService.deleteUserAccount(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Account deleted successfully", null));
    }
}
