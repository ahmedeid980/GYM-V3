package com.ahmedeid.securityandjwt.gym.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ahmedeid.securityandjwt.gym.entities.Player;
import com.ahmedeid.securityandjwt.gym.entities.SysExerciseType;
import com.ahmedeid.securityandjwt.gym.entities.SysGender;
import com.ahmedeid.securityandjwt.gym.entities.SysSubtype;
import com.ahmedeid.securityandjwt.gym.entities.User;
import com.ahmedeid.securityandjwt.gym.manager.IntegrationManager;
import com.ahmedeid.securityandjwt.gym.repository.HQLDaoService;
import com.ahmedeid.securityandjwt.gym.security.TokenUtil;
import com.ahmedeid.securityandjwt.gym.services.PlayerService;
import com.ahmedeid.securityandjwt.gym.services.SysExerciseTypeService;
import com.ahmedeid.securityandjwt.gym.services.SysGenderService;
import com.ahmedeid.securityandjwt.gym.services.SysSubTypeService;
import com.ahmedeid.securityandjwt.gym.services.UserService;
import com.ahmedeid.securityandjwt.gym.uibean.PlayerUIBean;
import com.ahmedeid.securityandjwt.gym.uibean.Resubscription;
import com.ahmedeid.securityandjwt.gym.uibean.UserUIBean;
import com.ahmedeid.securityandjwt.gym.wrapper.WrapperManager;

@CrossOrigin
@RestController
@RequestMapping(value = "/serviceIntegration")
public class ServiceIntegration {

	@Value("${player.image.path}")
	private String USER_IMAGE;

	@Autowired
	private UserService userService;

	@Autowired
	private SysGenderService sysGenderService;

	@Autowired
	private HQLDaoService hqlDaoService;

	@Autowired
	private SysExerciseTypeService sysExerciseTypeService;

	@Autowired
	private SysSubTypeService sysSubTypeService;

	@Autowired
	private PlayerService playerService;

	@Autowired
	private TokenUtil tokenUtil;

	@GetMapping({ "", "/" })
	public List<User> getAllUser() {
		return userService.getAll();
	}

	@PostMapping({ "/checkAdminThenGetAllUsers" })
	public List<User> getAllUserByCheckAdmin(@RequestBody String token) {
		String userName = tokenUtil.getUserNameFromToken(token);
		User userDetails = (User) userService.loadUserByUsername(userName);
		System.out.println(userDetails);
		if (userDetails.getIsAdmin() != 0) {
			return userService.getAll();
		}
		List<User> users = new ArrayList<User>();
		users.add(userService.getUserById(userDetails.getId()));
		return users;

	}

	@PostMapping(value = "/registerUserAdmin")
	public User register(@RequestBody UserUIBean userUI) {

		User newUser = new User();
		newUser.setEmail(userUI.getEmail());
		newUser.setUserName(userUI.getUsername());
		newUser.setPassword(userUI.getPassword());
		newUser.setIsAdmin(1);

		User saveUser = userService.saveUser(newUser);
		return saveUser;

	}

	// get all gender lookup
	@GetMapping(value = "/getGenderLookup")
	public List<SysGender> getGenderLookup() {
		return this.sysGenderService.getAll();
	}

	// get all subtype lookup
	@GetMapping(value = "/getSubtypeLookup")
	public List<SysSubtype> getSubtypeLookup() {
		return this.sysSubTypeService.getAll();
	}

	// get all exercise type lookup
	@GetMapping(value = "/getExerciseLookup")
	public List<SysExerciseType> getExerciseLookup() {
		return this.sysExerciseTypeService.getAll();
	}

	// save new player
	@PostMapping(value = "/addNewPlayer/{userAdminId}")
	public Player addNewPlayer(@RequestBody PlayerUIBean player, @PathVariable int userAdminId) {
		WrapperManager wrapperManager = new WrapperManager();
		Player persistPlayer = new Player();
		persistPlayer = wrapperManager.playerBeanToPlayerEntity(player);

		User user = this.userService.getUserById(userAdminId);
		if (user != null) {
			persistPlayer.setDateModify(new Date());
			persistPlayer.setCode((System.currentTimeMillis() + 12) + 3000);
			persistPlayer.setSubscriptionNo(player.getSubscriptionNo() + 1);
			persistPlayer.setPlayerImage("player.jpg");
			persistPlayer.setUser(user);

			if (player.getSysExerciseType() != 0) {
				SysExerciseType sysExerciseType = new SysExerciseType();
				sysExerciseType = this.sysExerciseTypeService.getSysExerciseTypeById(player.getSysExerciseType());
				persistPlayer.setSysExerciseType(sysExerciseType);
			}

			if (player.getSysGender() != 0) {
				SysGender sysGender = new SysGender();
				sysGender = this.sysGenderService.getSysGenderById(player.getSysGender());
				persistPlayer.setSysGender(sysGender);
			}

			if (player.getSysSubtype() != 0) {
				SysSubtype subtype = new SysSubtype();
				subtype = this.sysSubTypeService.getSysSubtypeById(player.getSysSubtype());
				persistPlayer.setSysSubtype(subtype);
				if (player.getSysSubtype() == 2) {
					persistPlayer.setHulfMonthNo(14);
				}
			}

			return this.playerService.saveNewPlayer(persistPlayer);
		}
		return null;

	}

	// get player by code
	@GetMapping(value = "getPlayerByCode/{code}")
	public Player getPlayerByCode(@PathVariable long code) {

		if (code != 0) {
			Player player = this.playerService.getPlayerByCode(code);
			if (player != null) {
				return player;
			}
		}

		return null;

	}

	// get player by code and player name
	@GetMapping(value = "getPlayerByCodeOrPlayerName/{codeOrPlayerName}")
	public Player getPlayerByCodeOrPlayerName(@PathVariable String codeOrPlayerName) {

		try {
			Player player = null;
			System.out.println("codeOrPlayerName: " + codeOrPlayerName);
			if (codeOrPlayerName != null && codeOrPlayerName.matches("[0-9]+")) {
				player = new Player();
				player = this.playerService.getPlayerByCode(Long.parseLong(codeOrPlayerName));
				if (player != null) {
					return player;
				}
			} else if (codeOrPlayerName != null) {
				player = new Player();
				player = this.playerService.getPlayerByPlayerName(codeOrPlayerName);
				if (player != null) {
					return player;
				}
			}
		} catch (NumberFormatException ex) { // handle your exception
			ex.printStackTrace();
		}

		return null;

	}

	// update player image
	@PostMapping(value = "updatePlayerImage")
	public boolean updatePlayerImage(@RequestParam("code") String code, @RequestParam("file") MultipartFile file) {

		boolean status = false;

		IntegrationManager iteIntegrationManager = new IntegrationManager();

		String fileName = iteIntegrationManager.updateImage(file, USER_IMAGE);
		if (fileName != null) {
			status = this.hqlDaoService.updatePlayerImageByCode(fileName, Long.parseLong(code));
		}

		return status;
	}

	// update player
	@PutMapping(value = "/updatePlayer/{code}")
	public Player updatePlayer(@RequestBody PlayerUIBean player, @PathVariable long code) {
		WrapperManager wrapperManager = new WrapperManager();
		Player persistPlayer = new Player();
		persistPlayer = wrapperManager.playerBeanToPlayerEntity(player);

		Player PlayerToUpdate = this.playerService.getPlayerByCode(code);
		if (PlayerToUpdate != null && (PlayerToUpdate.getId() == player.getId())) {
			persistPlayer.setDateModify(PlayerToUpdate.getDateModify());
			persistPlayer.setCode(PlayerToUpdate.getCode());
			persistPlayer.setSubscriptionNo(PlayerToUpdate.getSubscriptionNo());
			persistPlayer.setPlayerImage(PlayerToUpdate.getPlayerImage());
			persistPlayer.setUser(PlayerToUpdate.getUser());

			if (player.getSysExerciseType() != 0) {
				SysExerciseType sysExerciseType = new SysExerciseType();
				sysExerciseType = this.sysExerciseTypeService.getSysExerciseTypeById(player.getSysExerciseType());
				persistPlayer.setSysExerciseType(sysExerciseType);
			}

			if (player.getSysGender() != 0) {
				SysGender sysGender = new SysGender();
				sysGender = this.sysGenderService.getSysGenderById(player.getSysGender());
				persistPlayer.setSysGender(sysGender);
			}

			if (player.getSysSubtype() != 0) {
				SysSubtype subtype = new SysSubtype();
				subtype = this.sysSubTypeService.getSysSubtypeById(player.getSysSubtype());
				persistPlayer.setSysSubtype(subtype);
				if (player.getSysSubtype() == 2) {
					persistPlayer.setHulfMonthNo(PlayerToUpdate.getHulfMonthNo());
				}
			}

			return this.playerService.saveNewPlayer(persistPlayer);

		}

		return null;

	}

	// new subscription for player
	@PutMapping(value = "/renewPlayerSubscription/{code}")
	public boolean renewPlayerSubscription(@PathVariable long code, @RequestBody Resubscription resubscription) {
		boolean status = false;
		Player player = this.playerService.getPlayerByCode(code);
		if (resubscription != null && player != null) {
			int newSubscription = player.getSubscriptionNo() + 1;
			status = this.hqlDaoService.newSubscription(resubscription, code, newSubscription);
		}

		return status;
	}

	// new subscription for player
	@PutMapping(value = "/updatePlayerHulfMonthNOByCode/{code}")
	public boolean updatePlayerHulfMonthNOByCode(@PathVariable long code, @RequestBody int hulfMonthNO) {
		boolean status = false;
		Player player = this.playerService.getPlayerByCode(code);
		if (hulfMonthNO != 0 && player != null) {
			status = this.hqlDaoService.updatePlayerHulfMonthNOByCode(hulfMonthNO, code);
		}

		return status;
	}

	@PostMapping(value = "checkPasswordValidation/{userId}")
	public boolean checkPasswordValidation(@PathVariable int userId, @RequestBody String password) {

		boolean status = false;
		if (userId != 0 && password != null) {
			User user = this.userService.getUserById(userId);
			if (user != null) {
				status = this.userService.checkOldPassword(password, user.getPassword());
				return status;
			}
		}
		return status;
	}

	@PostMapping(value = "getplayerListOfInSubscriptionOrOut/{statusId}")
	public List<Player> getplayerListOfInSubscriptionOrOut(@PathVariable int statusId) {
		List<Player> playerSubscriptionOrNot = new ArrayList<Player>();
		IntegrationManager integrationManager = new IntegrationManager();
		boolean status = false;

		// get playerList
		List<Player> playerList = this.playerService.getAll();
		if (statusId > 0) {
			for (Player player : playerList) {
				if (player.getSysSubtype().getId() == 1)
					status = integrationManager.checkPalyerInSubscriptionOrNot(player.getDateModify(), 1, 0);

				else if (player.getSysSubtype().getId() == 3)
					status = integrationManager.checkPalyerInSubscriptionOrNot(player.getDateModify(), 2, 0);

				else if (player.getSysSubtype().getId() == 4)
					status = integrationManager.checkPalyerInSubscriptionOrNot(player.getDateModify(), 3, 0);

				else if (player.getSysSubtype().getId() == 5)
					status = integrationManager.checkPalyerInSubscriptionOrNot(player.getDateModify(), 6, 0);

				else if (player.getSysSubtype().getId() == 6)
					status = integrationManager.checkPalyerInSubscriptionOrNot(player.getDateModify(), 0, 1);

				if (statusId == 1) {
					if (status)
						playerSubscriptionOrNot.add(player);
				} else {
					if (!status)
						playerSubscriptionOrNot.add(player);
				}

			}
		}

		return playerSubscriptionOrNot;
	}

	// update player amount rest to 0
	@PostMapping(value = "/updatePlayerAmountRestByCode/{code}")
	public boolean updatePlayerAmountRestByCode(@PathVariable long code) {
		boolean status = false;
		Player player = this.playerService.getPlayerByCode(code);
		if (player != null) {
			status = this.hqlDaoService.updatePlayerAmountRestByCode(code);
		}

		return status;
	}
	
	// update player amount rest to 0
		@PostMapping(value = "/getPlayerByIdOrCode/{code}")
		public Player getPlayerByIdOrCode(@PathVariable long code) {
			Player player = this.playerService.getPlayerByCode(code);
			if (player != null) {
				return player;
			}

			return player;
		}

}
