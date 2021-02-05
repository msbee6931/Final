package kh.spring.dto;

import java.sql.Date;

public class ChatFileDTO {
	private int seq;
	private String roomNumber;
	private String oriName;
	private String savedName;
	private String uploadDate;
	private String userId;
	
	public ChatFileDTO() {}
	public ChatFileDTO(int seq, String roomNumber, String oriName, String savedName, String uploadDate, String userId) {
		super();
		this.seq = seq;
		this.roomNumber = roomNumber;
		this.oriName = oriName;
		this.savedName = savedName;
		this.uploadDate = uploadDate;
		this.userId = userId;
	}
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public String getOriName() {
		return oriName;
	}
	public void setOriName(String oriName) {
		this.oriName = oriName;
	}
	public String getSavedName() {
		return savedName;
	}
	public void setSavedName(String savedName) {
		this.savedName = savedName;
	}
	public String getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}

}
