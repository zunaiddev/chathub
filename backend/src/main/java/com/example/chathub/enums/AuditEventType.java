package com.example.chathub.enums;

public enum AuditEventType {
    USER_LOGIN,
    USER_LOGOUT,
    LOGIN_FAILED,
    TOKEN_REFRESHED,
    PASSWORD_CHANGED,

    USER_CREATED,
    USER_UPDATED,
    USER_DELETED,

    ACCESS_DENIED,
    ROLE_ASSIGNED,
    USER_REGISTERED, ROLE_REMOVED
}