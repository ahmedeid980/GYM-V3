package com.ahmedeid.sport.gym.utils;

import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;

public class Test {

	public static void main(String[] args) {

		Date newDate = DateUtils.addMonths(new Date(), 2);
		System.out.println(newDate);
		Date date = new Date();
		
		if(date.compareTo(newDate) > 0) {
			System.out.println("today is bigger than date come");
		} else {
			System.out.println("player is still in subscription");
		}
	}

}
