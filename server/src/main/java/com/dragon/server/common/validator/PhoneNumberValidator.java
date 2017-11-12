package com.dragon.server.common.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {

    private Pattern pattern;
    private Matcher matcher;
    private static final String EMAIL_PATTERN = "^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$";

    @Override
    public void initialize(ValidPhoneNumber constraintAnnotation) {
    }
    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context){
        if(phoneNumber == null)
            return true;
        return (validatePhoneNumber(phoneNumber));
    }

    private boolean validatePhoneNumber(String phoneNumber) {
        pattern = Pattern.compile(EMAIL_PATTERN);
        matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }
}
