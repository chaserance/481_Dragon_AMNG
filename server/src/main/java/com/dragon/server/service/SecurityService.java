package com.dragon.server.service;

public interface SecurityService {

    boolean canCreateNewPerformance(Long childId, String username);

    boolean canUpdateCurrentPerformance(Long childId, Long sessionId, String username);
}
