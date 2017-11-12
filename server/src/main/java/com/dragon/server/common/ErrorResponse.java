package com.dragon.server.common;

import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class ErrorResponse {
    // HTTP Response Status Code
    private final HttpStatus status;

    // General Error message
    private final String message;

    // Error code
    private final ErrorCode errorCode;

    private List<String> errors;

    private final Date timestamp;

    protected ErrorResponse(final String message, final ErrorCode errorCode, HttpStatus status, List<String> errors) {
        this.message = message;
        this.errorCode = errorCode;
        this.status = status;
        this.errors = errors;
        this.timestamp = new Date();
    }

    protected ErrorResponse(final String message, final ErrorCode errorCode, HttpStatus status, String errors) {
        this.message = message;
        this.errorCode = errorCode;
        this.status = status;
        this.errors = Arrays.asList(errors);
        this.timestamp = new Date();
    }

    public static ErrorResponse of(final String message, final ErrorCode errorCode, HttpStatus status, String error) {
        return new ErrorResponse(message, errorCode, status, error);
    }

    public static ErrorResponse of(final String message, final ErrorCode errorCode, HttpStatus status, List<String> errors) {
        return new ErrorResponse(message, errorCode, status, errors);
    }

    public static ErrorResponse of(final String message, HttpStatus status, String error) {
        return new ErrorResponse(message, ErrorCode.GLOBAL, status, error);
    }

    public static ErrorResponse of(final String message, HttpStatus status, List<String> errors) {
        return new ErrorResponse(message, ErrorCode.GLOBAL, status, errors);
    }

    public static ErrorResponse of(final String message, final ErrorCode errorCode, HttpStatus status) {
        return new ErrorResponse(message, errorCode, status, "N/A");
    }

    public Integer getStatusValue() {
        return status.value();
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
