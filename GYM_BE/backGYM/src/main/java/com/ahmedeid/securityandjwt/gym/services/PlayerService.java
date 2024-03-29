package com.ahmedeid.securityandjwt.gym.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmedeid.securityandjwt.gym.entities.Player;
import com.ahmedeid.securityandjwt.gym.entities.SysSubtype;
import com.ahmedeid.securityandjwt.gym.repository.PlayerRepository;
import com.ahmedeid.securityandjwt.gym.repository.SysSubTypeRepository;

@Service
public class PlayerService {

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private SysSubTypeRepository sysSubTypeRepository;

	// get all players of list ...
	public List<Player> getAll() {
		return this.playerRepository.findAll();
	}

	// get player by id ...
	public Player getPlayerById(int id) {
		return this.playerRepository.findById(id).get();
	}

	// get player by code ...
	public Player getPlayerByCode(long code) {
		return this.playerRepository.getPlayerByCode(code);
	}

	// get player by code ...
	public Player getPlayerByPlayerName(String playerName) {
		return this.playerRepository.getPlayerByPlayerName(playerName);
	}

	// save or update new player ...
	public Player saveNewPlayer(Player player) {
		return this.playerRepository.save(player);
	}

	// delete player By id ....
	public boolean deletePlayerById(int id) {
		Player player = getPlayerById(id);
		System.out.println(player);
		if (player != null) {
			this.playerRepository.delete(player);
			return true;
		}
		return false;
	}

    public Player changePlayerSubscriptionsStrategy(long subtypeId, long codeId) {

		Player player = this.playerRepository.getPlayerByCode(codeId);
		if (player != null) {
			SysSubtype subtype = this.sysSubTypeRepository.findById((int) subtypeId).orElse(null);

			player.setSysSubtype(subtype);
			return playerRepository.save(player);
		}
		return null;
    }
}
