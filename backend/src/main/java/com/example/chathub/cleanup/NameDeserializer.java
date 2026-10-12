package com.example.chathub.cleanup;

import com.example.chathub.utils.Normalizer;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class NameDeserializer extends JsonDeserializer<String> {
    @Override
    public String deserialize(JsonParser p, DeserializationContext ctx) throws IOException, JacksonException {
        String value = p.getValueAsString();

        return Normalizer.normalizeName(value);
    }
}
