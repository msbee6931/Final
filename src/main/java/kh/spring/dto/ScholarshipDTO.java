package kh.spring.dto;

public class ScholarshipDTO {

	private int std_code;
	private int s_kind;
	private int s_rec;
	private int s_spt;
	private int s_etc;
	private int ssum;
	private String s_date;
	public int getStd_code() {
		return std_code;
	}
	public void setStd_code(int std_code) {
		this.std_code = std_code;
	}
	public int getS_kind() {
		return s_kind;
	}
	public void setS_kind(int s_kind) {
		this.s_kind = s_kind;
	}
	public int getS_rec() {
		return s_rec;
	}
	public void setS_rec(int s_rec) {
		this.s_rec = s_rec;
	}
	public int getS_spt() {
		return s_spt;
	}
	public void setS_spt(int s_spt) {
		this.s_spt = s_spt;
	}
	public int getS_etc() {
		return s_etc;
	}
	public void setS_etc(int s_etc) {
		this.s_etc = s_etc;
	}
	public int getSsum() {
		return ssum;
	}
	public void setSsum(int ssum) {
		this.ssum = ssum;
	}
	public String getS_date() {
		return s_date;
	}
	public void setS_date(String s_date) {
		this.s_date = s_date;
	}
	public ScholarshipDTO(int std_code, int s_kind, int s_rec, int s_spt, int s_etc, int ssum, String s_date) {
		super();
		this.std_code = std_code;
		this.s_kind = s_kind;
		this.s_rec = s_rec;
		this.s_spt = s_spt;
		this.s_etc = s_etc;
		this.ssum = ssum;
		this.s_date = s_date;
	}
	public ScholarshipDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
