package com.ahmedeid.securityandjwt.gym.repository;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.Transaction;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ahmedeid.securityandjwt.gym.entities.Player;
import com.ahmedeid.securityandjwt.gym.uibean.Resubscription;

@Repository
@Transactional
public class HQLDaoService {

	@Autowired
	private EntityManager entityManager;

	public boolean updatePassword(String password, int id) {

		Session session = entityManager.unwrap(Session.class);
		boolean status = false;

		Query updateuserPassword = session.createQuery("update User u set u.password= : password "
				+ " where u.id= :id");

		updateuserPassword.setParameter("password", password);
		updateuserPassword.setParameter("id", id);
		
		int resultStatus = updateuserPassword.executeUpdate();

		if (resultStatus != 0) {
			status = true;
			entityManager.close();
			session.close();
		}
		return status;

	}

	public boolean updatePlayerImageByCode(String playerImage, long code) {

		boolean status = false;
		Session session = entityManager.unwrap(Session.class);

		Query updatePlayerImage = session
				.createQuery("update Player p set p.playerImage= :playerImage " + "where p.code= :code");

		updatePlayerImage.setParameter("playerImage", playerImage);
		updatePlayerImage.setParameter("code", code);

		int resultStatus = updatePlayerImage.executeUpdate();
		if (resultStatus != 0) {
			status = true;
			entityManager.close();
			session.close();
		}
		return status;
	}
	
	public boolean newSubscription(Resubscription resubscription, long code, int newSubscription) {
		
		int amountPaid = resubscription.getAmountPaid();
		int amountRest = resubscription.getAmountRest();
		Date subscriptionDate = resubscription.getModifiedDate();
		boolean status = false;
		Session session = entityManager.unwrap(Session.class);

		Query updatePlayerImage = session
				.createQuery("update Player p set p.amountPaid= :amountPaid , p.amountRest= :amountRest " 
							+ ", p.subscriptionNo= :newSubscription , p.dateModify= :subscriptionDate "
							+ " , p.hulfMonthNo=15 where p.code= :code");

		updatePlayerImage.setParameter("amountPaid", amountPaid);
		updatePlayerImage.setParameter("amountRest", amountRest);
		updatePlayerImage.setParameter("newSubscription", newSubscription);
		updatePlayerImage.setParameter("subscriptionDate", subscriptionDate);
		updatePlayerImage.setParameter("code", code);

		int resultStatus = updatePlayerImage.executeUpdate();
		if (resultStatus != 0) {
			status = true;
			entityManager.close();
			session.close();
		}
		return status;
	}
	
	public boolean updatePlayerHulfMonthNOByCode(int hulfMonthNO, long code) {

		boolean status = false;
		Session session = entityManager.unwrap(Session.class);

		Query updatePlayerImage = session
				.createQuery("update Player p set p.hulfMonthNo= :hulfMonthNO " + "where p.code= :code");

		updatePlayerImage.setParameter("hulfMonthNO", hulfMonthNO);
		updatePlayerImage.setParameter("code", code);

		int resultStatus = updatePlayerImage.executeUpdate();
		if (resultStatus != 0) {
			status = true;
			entityManager.close();
			session.close();
		}
		return status;
	}
	
	public boolean updatePlayerAmountRestByCode(long code) {

		Session session = entityManager.unwrap(Session.class);
		boolean status = false;

		Query updatePlayerImage = session
				.createQuery("update Player p set p.amountRest= 0 " + "where p.code= :code");

		updatePlayerImage.setParameter("code", code);

		int resultStatus = updatePlayerImage.executeUpdate();
		if (resultStatus != 0) {
			status = true;
			entityManager.close();
			session.close();
		}
		return status;
	}
	
//	public List<Player> getInvoiceResultCompanyByCompanyId(int companyId) {
//
//		Session session = entityManager.unwrap(Session.class);
//		Query userSQL = session.createQuery("from Player p where  p.code= :code and p.playerQuit = 1");
//		
//		userSQL.setParameter("companyId", companyId);
//
//		List<Player> playerList = userSQL.list();
//
//		return playerList;
//
//	}

}
