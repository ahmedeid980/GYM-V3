package com.ahmedeid.sport.gym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ahmedeid.sport.gym.entities.SysExerciseType;

@Repository
public interface SysExerciseTypeRepository extends JpaRepository<SysExerciseType, Integer> {

}
