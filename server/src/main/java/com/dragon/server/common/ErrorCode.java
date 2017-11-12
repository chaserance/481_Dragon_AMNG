package com.dragon.server.common;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ErrorCode {
    GLOBAL(0),
    AUTHENTICATION(1),
    JWT_TOKEN_EXPIRED(2),
    ARGUMENT_NOT_VALID(3),
    BIND_EXCEPTION(4),
    TYPE_MISMATCH(5),
    MISSING_SERVLET_REQUEST_PART(6),
    MISSING_SERVLET_REQUEST_PARAM(7),
    ARGUMENT_TYPE_MISMATCH(8),
    CONSTRAIN_VIOLATION(9),
    NO_HANDLER_FOUND(10),
    METHOD_NOT_SUPOORTED(11),
    MEDIA_TYPE_NOT_SUPPORTED(12),
    RESOURCE_NOT_FOUND(13);

    private int errorCode;

    private ErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    @JsonValue
    public int getErrorCode() {
        return errorCode;
    }
}
