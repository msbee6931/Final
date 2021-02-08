package kh.spring.dto;

public class StudentClassDTO {

	private int sCode;
	private int classCode;
	private String basket;
	private String reg_date;
	public StudentClassDTO() {}
	public StudentClassDTO(int sCode, int classCode, String basket, String reg_date) {
		this.sCode = sCode;
		this.classCode = classCode;
		this.basket = basket;
		this.reg_date = reg_date;
	}
	public int getsCode() {
		return sCode;
	}
	public void setsCode(int sCode) {
		this.sCode = sCode;
	}
	public int getClassCode() {
		return classCode;
	}
	public void setClassCode(int classCode) {
		this.classCode = classCode;
	}
	public String getBasket() {
		return basket;
	}
	public void setBasket(String basket) {
		this.basket = basket;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	
	
	
}
