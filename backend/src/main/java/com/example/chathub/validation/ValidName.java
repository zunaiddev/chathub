package com.example.chathub.validation;

import com.example.chathub.cleanup.NameDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.lang.annotation.*;

@JsonDeserialize(using = NameDeserializer.class)
@NotBlank(message = "Name is required")
@Size(min = 3, max = 80, message = "Name must contain between {min} and {max} characters")
@Pattern(regexp = "^[a-zA-Z ]+$", message = "Name must contain only letters and spaces")
@ReportAsSingleViolation
@Constraint(validatedBy = {})
@Target({
        ElementType.FIELD,
        ElementType.PARAMETER,
        ElementType.ANNOTATION_TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidName {
    String message() default "Invalid name";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}