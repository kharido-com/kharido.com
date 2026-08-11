package com.example.demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.security.JwtCookieUtil;
import com.example.demo.security.JwtService;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final JwtCookieUtil jwtCookieUtil;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            JwtCookieUtil jwtCookieUtil) {

        this.authService = authService;
        this.jwtService = jwtService;
        this.jwtCookieUtil = jwtCookieUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        User user = authService.login(request);

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().getRoleName()
        );

        ResponseCookie cookie =
                jwtCookieUtil.createJwtCookie(token);

        LoginResponse response =
                new LoginResponse(
                        "Login successful",
                        user.getUsername(),
                        user.getRole().getRoleName()
                );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        ResponseCookie cookie =
                jwtCookieUtil.deleteJwtCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logout Successful");
    }
}