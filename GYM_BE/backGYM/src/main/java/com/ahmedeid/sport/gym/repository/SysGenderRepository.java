package com.ahmedeid.sport.gym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ahmedeid.sport.gym.entities.SysGender;

@Repository
public interface SysGenderRepository extends JpaRepository<SysGender, Integer> {

}
