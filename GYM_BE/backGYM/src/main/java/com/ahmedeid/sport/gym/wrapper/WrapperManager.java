package com.ahmedeid.sport.gym.wrapper;

import com.ahmedeid.sport.gym.entities.Player;
import com.ahmedeid.sport.gym.uibean.PlayerUIBean;

public class WrapperManager {

	public Player playerBeanToPlayerEntity(PlayerUIBean playerUIBean) {
		Player player = new Player();

		if (playerUIBean != null) {
			
			if (playerUIBean != null && playerUIBean.getId() != 0) {
				player.setId(playerUIBean.getId());
			}

			if (playerUIBean.getAddress() != null && !playerUIBean.getAddress().equals("")) {
				player.setAddress(playerUIBean.getAddress());
			}

			if (playerUIBean.getAmountPaid() != 0) {
				player.setAmountPaid(playerUIBean.getAmountPaid());
			}

			if (playerUIBean.getCardNumber() != null && !playerUIBean.getCardNumber().equals("")) {
				player.setCardNumber(playerUIBean.getCardNumber());
			}

			if (playerUIBean.getPassportNumber() != null && !playerUIBean.getPassportNumber().equals("")) {
				player.setPassportNumber(playerUIBean.getPassportNumber());
			}

			if (playerUIBean.getPhone() != null && !playerUIBean.getPhone().equals("")) {
				player.setPhone(playerUIBean.getPhone());
			}

			if (playerUIBean.getPlayerChampionships() != null && !playerUIBean.getPlayerChampionships().equals("")) {
				player.setPlayerChampionships(playerUIBean.getPlayerChampionships());
			}

			if (playerUIBean.getPlayerName() != null && !playerUIBean.getPlayerName().equals("")) {
				player.setPlayerName(playerUIBean.getPlayerName());
			}

			if (playerUIBean.getHeight() != 0) {
				player.setHeight(playerUIBean.getHeight());
			}

			if (playerUIBean.getWeight() != 0) {
				player.setWeight(playerUIBean.getWeight());
			}

			if (playerUIBean.getAge() != 0) {
				player.setAge(playerUIBean.getAge());
			}
			
			if (playerUIBean.getAmountRest() != 0) {
				player.setAmountRest(playerUIBean.getAmountRest());
			}

		}

		return player;
	}

}
