package com.dragon.server.repository;

import com.dragon.server.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="result_array")
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
