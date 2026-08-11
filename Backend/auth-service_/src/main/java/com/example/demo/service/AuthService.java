package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.entity.User;

public interface AuthService {

    User login(LoginRequest request);

}