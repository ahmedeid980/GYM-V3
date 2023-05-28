package com.ahmedeid.securityandjwt.gym.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmedeid.securityandjwt.gym.entities.SysGender;
import com.ahmedeid.securityandjwt.gym.entities.SysSubtype;
import com.ahmedeid.securityandjwt.gym.repository.SysGenderRepository;
import com.ahmedeid.securityandjwt.gym.repository.SysSubTypeRepository;

@Service
public class SysGenderService {

	@Autowired
	private SysGenderRepository sysGenderRepository;

	// get all SysGender of list ...
	public List<SysGender> getAll() {
		return this.sysGenderRepository.findAll();
	}

	// get SysGender by id ...
	public SysGender getSysGenderById(int id) {
		return this.sysGenderRepository.findById(id).get();
	}

	// save or update new SysGender ...
	public SysGender saveNewSysGender(SysGender sysGender) {
		return this.sysGenderRepository.save(sysGender);
	}

	// delete SysGender By id ....
	public boolean deleteSysGenderById(int id) {
		boolean status = false;
		SysGender sysGender = getSysGenderById(id);
		if (sysGender != null) {
			this.sysGenderRepository.delete(sysGender);
			status = true;
		}
		return status;
	}

}
