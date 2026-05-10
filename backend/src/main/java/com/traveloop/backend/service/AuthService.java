package com.traveloop.backend.service;

import com.traveloop.backend.dto.LoginRequestDTO;
import com.traveloop.backend.dto.LoginResponseDTO;
import com.traveloop.backend.dto.UserResponseDTO;
import com.traveloop.backend.entity.User;
import com.traveloop.backend.exception.UnauthorizedException;
import com.traveloop.backend.repository.UserRepository;
import com.traveloop.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UnauthorizedException("User not found"));

            UserResponseDTO userResponse = new UserResponseDTO();
            userResponse.setId(user.getId());
            userResponse.setName(user.getName());
            userResponse.setEmail(user.getEmail());
            userResponse.setCreatedAt(user.getCreatedAt());

            return new LoginResponseDTO(token, userResponse);
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }
}
