package com.example.demo.security;

import java.time.Duration;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class JwtCookieUtil {

    private static final String COOKIE_NAME = "jwt";
    private static final long COOKIE_MAX_AGE = Duration.ofHours(24).getSeconds();

    public ResponseCookie createJwtCookie(String token) {

        return ResponseCookie.from(COOKIE_NAME, token)
                .httpOnly(true)
                .secure(false)          // Change to true in production (HTTPS)
                .sameSite("Lax")        // Use "None" with HTTPS if frontend/backend are on different domains
                .path("/")
                .maxAge(COOKIE_MAX_AGE)
                .build();
    }

    public ResponseCookie deleteJwtCookie() {

        return ResponseCookie.from(COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
    }
}