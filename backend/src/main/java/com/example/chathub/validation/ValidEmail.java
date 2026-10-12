package com.example.chathub.validation;

import com.example.chathub.cleanup.EmailDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.lang.annotation.*;

@JsonDeserialize(using = EmailDeserializer.class)
@NotBlank(message = "Email is required")
@Email(message = "Please provide a valid email address")
@Constraint(validatedBy = {})
@Target({
        ElementType.FIELD,
        ElementType.PARAMETER,
        ElementType.ANNOTATION_TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidEmail {

    String message() default "Invalid email address";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}