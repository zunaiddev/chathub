package com.example.chathub.cleanup;

import com.example.chathub.utils.Normalizer;
import tools.jackson.core.JacksonException;
import tools.jackson.core.JsonParser;
import tools.jackson.databind.DeserializationContext;
import tools.jackson.databind.ValueDeserializer;

public class EmailDeserializer extends ValueDeserializer<String> {
    @Override
    public String deserialize(JsonParser p, DeserializationContext ctx) throws JacksonException {
        String value = p.getValueAsString();

        return Normalizer.normalizeEmail(value);
    }
}
