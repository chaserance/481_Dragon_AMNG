package com.dragon.server.service;

import com.dragon.server.entity.Child;
import com.dragon.server.entity.EducationalPerformance;
import com.dragon.server.entity.Session;
import com.dragon.server.entity.User;
import com.dragon.server.repository.ChildRepository;
import com.dragon.server.repository.EducationalPerformanceRepository;
import com.dragon.server.repository.SessionRepository;
import com.dragon.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("SecurityServiceImpl")
public class SecurityServiceImpl implements SecurityService {

    private ChildRepository childRepository;
    private UserRepository userRepository;
    private EducationalPerformanceRepository performanceRepository;
    private SessionRepository sessionRepository;

    @Autowired
    public SecurityServiceImpl(ChildRepository childRepository, UserRepository userRepository, EducationalPerformanceRepository performanceRepository, SessionRepository sessionRepository) {
        this.childRepository = childRepository;
        this.userRepository = userRepository;
        this.performanceRepository = performanceRepository;
        this.sessionRepository = sessionRepository;
    }

    @Override
    public boolean canCreateNewPerformance(Long childId, String username) {
        Child child = childRepository.findOne(childId);
        User parent;
        if(child != null && (parent = child.getUser()) != null) {
            return parent.getUsername().equals(username);
        }
        return false;
    }

    @Override
    public boolean canUpdateCurrentPerformance(Long childId, Long sessionId, String username) {
        EducationalPerformance performance = performanceRepository.findByPkChildIdAndPkSessionId(childId, sessionId);
        Session session = sessionRepository.findOne(sessionId);
        User teacher;
        if(performance != null & session != null && (teacher = session.getTeacher()) != null) {
            return teacher.getUsername().equals(username);
        }
        return false;
    }
}
