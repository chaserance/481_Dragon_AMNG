package com.dragon.server.repository;

import com.dragon.server.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface BillRepository extends JpaRepository<Bill, Long> {

    @RestResource(exported = false)
    @Override
    Page<Bill> findAll(Pageable pageable);

    @RestResource(exported = false)
    @Override
    <S extends Bill> S save(S s);

    @RestResource(exported = false)
    @Override
    Bill findOne(Long aLong);

    @RestResource(exported = false)
    @Override
    boolean exists(Long aLong);

    // @RestResource(exported = false)
    @Override
    long count();

    @RestResource(exported = false)
    @Override
    void delete(Long aLong);

    @RestResource(exported = false)
    @Override
    void delete(Bill bill);

    @RestResource(exported = false)
    @Override
    void delete(Iterable<? extends Bill> iterable);

    @RestResource(exported = false)
    @Override
    void deleteAll();
}
