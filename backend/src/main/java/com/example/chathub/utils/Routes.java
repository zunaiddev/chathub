package com.example.chathub.utils;

import org.springframework.util.AntPathMatcher;

import java.util.Arrays;

public final class Routes {

    private static final String API_PREFIX = "/api";

    private static final String[] PUBLIC_ROUTES = {
            "/auth/**",
            "/health",
            "/actuator/health",
            "/ws/**"
    };

    private static final AntPathMatcher PATH_MATCHER =
            new AntPathMatcher();

    private Routes() {
    }

    public static String[] getPublicRoutes() {
        return PUBLIC_ROUTES.clone();
    }

    public static boolean shouldNotFilter(String uri) {
        return Arrays.stream(PUBLIC_ROUTES)
                .anyMatch(route ->
                        PATH_MATCHER.match(API_PREFIX + route, uri)
                );
    }
}