package com.ahmedeid.securityandjwt.gym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ahmedeid.securityandjwt.gym.entities.SysGender;

@Repository
public interface SysGenderRepository extends JpaRepository<SysGender, Integer> {

}
