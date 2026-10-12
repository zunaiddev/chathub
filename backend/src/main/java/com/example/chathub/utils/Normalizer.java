package com.example.chathub.utils;

import java.util.Arrays;
import java.util.Locale;
import java.util.stream.Collectors;

public class Normalizer {
    private Normalizer() {
    }

    public static String normalizeName(String name) {
        if (name == null || name.isBlank()) {
            return name;
        }

        return Arrays.stream(name.trim().split("\\s+"))
                .map(word -> word.substring(0, 1).toUpperCase()
                        + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    public static String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            return email;
        }

        return email.trim().toLowerCase(Locale.ROOT);
    }
}