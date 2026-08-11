package com.kharido.businessservice.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String username = null;

        Cookie[] cookies = request.getCookies();

        System.out.println("========== JWT FILTER ==========");

        if (cookies == null) {
            System.out.println("No Cookies");
        } else {

            for (Cookie cookie : cookies) {

                System.out.println(cookie.getName() + " = " + cookie.getValue());

                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            System.out.println("JWT NOT FOUND");
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("Token Received");

        try {

            boolean valid = jwtService.isTokenValid(token);

            System.out.println("Token Valid = " + valid);

            if (!valid) {
                filterChain.doFilter(request, response);
                return;
            }

            username = jwtService.extractUsername(token);

            System.out.println("Username = " + username);

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            System.out.println("Loaded User = " + userDetails.getUsername());
            System.out.println("Authorities = " + userDetails.getAuthorities());

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication = "
                    + SecurityContextHolder.getContext().getAuthentication());

        } catch (Exception e) {

            e.printStackTrace();
        }

        System.out.println("================================");

        filterChain.doFilter(request, response);
    }
}