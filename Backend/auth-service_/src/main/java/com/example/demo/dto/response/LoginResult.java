package com.example.demo.dto.response;

public class LoginResult {

    private LoginResponse response;
    private String token;

    public LoginResult(LoginResponse response, String token) {
        this.response = response;
        this.token = token;
    }

    public LoginResponse getResponse() {
        return response;
    }

    public String getToken() {
        return token;
    }
}