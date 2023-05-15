package com.ahmedeid.sport.gym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ahmedeid.sport.gym.entities.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer>{
	
	public Player getPlayerByCode(long code);
	public Player getPlayerByPlayerName(String playerName);
	
}
