package com.ahmedeid.securityandjwt.gym.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ahmedeid.securityandjwt.gym.entities.User;
import com.ahmedeid.securityandjwt.gym.services.UserService;

@Component
public class FirstTimeInitializer implements CommandLineRunner {

	@Autowired
	private UserService userService;

	private static final Logger LOG = LoggerFactory.getLogger(FirstTimeInitializer.class);

	@Override
	public void run(String... args) throws Exception {
		if(this.userService.getAll().isEmpty()) {
			LOG.info("LOG:  we will create new user now ");
			User user = new User("Admin User" , "Admin@gmail.com" , "123456");
			this.userService.saveUser(user);
			LOG.info("LOG:  you have new user ", user);
		} else {
			LOG.info("LOG: we have found some users in DB");
		}

	}

}
