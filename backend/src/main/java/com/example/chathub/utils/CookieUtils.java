package com.example.chathub.utils;

import jakarta.servlet.http.HttpServletResponse;

import java.time.Duration;

public class CookieUtils {
    public static void setCookie(HttpServletResponse response, String token) {
        response.addHeader(
                "Set-Cookie",
                "refreshToken=" + token
                        + "; HttpOnly"
                        + "; Secure"
                        + "; Path=/"
                        + "; Max-Age=" + Duration.ofDays(30).getSeconds()
                        + "; SameSite=None"
        );
    }

    public static void removeCookie(HttpServletResponse response) {
        response.addHeader(
                "Set-Cookie",
                "refreshToken=" + null
                        + "; HttpOnly"
                        + "; Secure"
                        + "; Path=/"
                        + "; Max-Age=" + 0
                        + "; SameSite=None"
        );
    }
}
