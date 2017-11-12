package com.dragon.server.repository;

import com.dragon.server.entity.EducationalPerformance;
import com.dragon.server.entity.EducationalPerformancePk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationalPerformanceRepository extends JpaRepository<EducationalPerformance, EducationalPerformancePk> {
}
