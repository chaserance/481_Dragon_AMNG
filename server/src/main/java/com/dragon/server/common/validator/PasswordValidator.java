package com.dragon.server.common.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private Pattern pattern;
    private Matcher matcher;

    private static final String MEDIUM_PASSWORD_PATTERN = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
    private static final String STRONG_PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*_])(?=.{8,})";

    @Override
    public void initialize(ValidPassword password) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        if(password == null)
            return true;
        return validatePassword(password);
    }

    private boolean validatePassword(String password) {
        pattern = Pattern.compile(STRONG_PASSWORD_PATTERN);
        matcher = pattern.matcher(password);
        return matcher.find();
    }
}
