package com.ahmedeid.securityandjwt.gym.manager;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

public class IntegrationManager { 
	
	public String updateImage(MultipartFile file, String USER_IMAGE) {
		
		try {
			
			String fileName = file.getOriginalFilename();
			String extention = fileName.substring(fileName.lastIndexOf("."));
			
			Date date = new Date();
			fileName = date.getTime() + extention ;
			
			String filePath = USER_IMAGE + "\\" + fileName;
			
			if(filePath != null && !filePath.equals("")) {
				byte[] bytes = file.getBytes();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(
						new File(USER_IMAGE + File.separator + fileName)));
				stream.write(bytes);
				stream.flush();
				stream.close();
				
				return fileName;
			}
			
		} catch(Exception ex) {
			
		}
		return null;
		
	}
	
	public boolean checkPalyerInSubscriptionOrNot(Date userSubscriptionDate, int monthUse, int yearUse) {
		Date comparingWithTodayDate = new Date();
		if(monthUse > 0) {
			Date newUserSubscriptionDate = DateUtils.addMonths(userSubscriptionDate, monthUse);
			if(newUserSubscriptionDate.compareTo(comparingWithTodayDate) > 0)
				return true;
		} else if(yearUse > 0){
			Date newUserSubscriptionDate = DateUtils.addYears(userSubscriptionDate, yearUse);
			if(newUserSubscriptionDate.compareTo(comparingWithTodayDate) > 0)
				return true;
		}
		
		return false;
	}

}
