package kh.spring.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.ChatFileDTO;
import kh.spring.dto.FriendDTO;
import kh.spring.dto.MessageDTO;
import kh.spring.dto.RoomDTO;
import kh.spring.dto.UserDTO;

@Repository
public class ChattingDAO {
	@Autowired
	private SqlSession session;
	
	// User
	public UserDTO getUserInfo(String userId) {
		return  session.selectOne("chatting.getUserInfo", userId);
	}
	
	public List<FriendDTO> getFriendsList(String userId){
		return session.selectList("chatting.getFriendsList", userId);
	}
	
	// Friend
	public List<UserDTO> searchFriend(String searchId) {
		return session.selectList("chatting.searchFriend", searchId);
	}
	
	public FriendDTO isFriendExist(String userId, String friendId) {
		Map<String,String> param = new HashMap<>();
		param.put("userId", userId);
		param.put("friendId", friendId);
		return session.selectOne("chatting.isFriendExist", param);
	}

	public int insertFriend(String userId, String userName, String friendId, String friendName) {
		Map<String,String> param = new HashMap<>();
		param.put("userId", userId);
		param.put("userName", userName);
		param.put("friendId", friendId);
		param.put("friendName", friendName);
		return session.insert("chatting.insertFriend",param);
	}

	// Chat
	public int insertMessage(String userId, String message, String roomNumber) {
		Map<String,String> param = new HashMap<>();
		param.put("userId", userId);
		param.put("message", message);
		param.put("roomNumber", roomNumber);
		return session.insert("chatting.insertMessage", param);
	}
	
	public List<MessageDTO> getChatting(String roomNumber) {
		return session.selectList("chatting.getChatting",roomNumber);
	}
	
	public int insertChatFile(String roomNumber, String oriName, String savedName,String userId) {
		Map<String,String> param = new HashMap<>();
		param.put("userId", userId);
		param.put("roomNumber", roomNumber);
		param.put("oriName", oriName);
		param.put("savedName", savedName);
		return session.insert("chatting.insertChatFile",param);
	}
	

	public ChatFileDTO getFile(String savedName) {
		return session.selectOne("chatting.getFile", savedName);
	}
	
	// Room
	public List<RoomDTO> findAllRoomByUserId(String userId) {
		return session.selectList("chatting.findAllRoomByUserId",userId);
	}
	
	public int insertRoom(String roomNumber,String roomName) {
		Map<String,String> param = new HashMap<>();
		param.put("roomNumber", roomNumber);
		param.put("roomName", roomName);
		return session.insert("chatting.insertRoom",param);
	}
	
	public RoomDTO findRoomByRoomNumber(String roomNumber) {
		return session.selectOne("chatting.findRoomByRoomNumber", roomNumber);
	}

	public RoomDTO findRoomById(String userId,String friendId) {
		Map<String,String> param = new HashMap<>();
		param.put("userId", userId);
		param.put("friendId", friendId);		
		return session.selectOne("chatting.findRoomById",param);
	}

}
