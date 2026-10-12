package com.example.chathub.utils;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;

public class Utils {
    public static void setError(HttpServletResponse res, HttpStatus status, String message, ErrorCode code) throws IOException {
        res.setStatus(status.value());
        res.setContentType("application/json");

        PrintWriter writer = res.getWriter();
        ObjectMapper mapper = new ObjectMapper();

        writer.write(mapper.writeValueAsString(new ErrorResponse(message, code)));
        writer.flush();
    }

    public static void setError(HttpServletResponse res, HttpStatus status, String message) throws IOException {
        Utils.setError(res, status, message, ErrorCode.UNAUTHORISED);
    }
}
