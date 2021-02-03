package kh.spring.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.AttendDTO;

@Repository
public class AttendDAO {

	@Autowired
	private SqlSession session;
	
	public List<AttendDTO> attendListDay(AttendDTO dto){
		return session.selectList("Attend.attendListDay",dto);
	}
	public int attendInsert(List<AttendDTO> list) {
		return session.insert("Attend.attendInsert",list);
	}
	public int attendUpd(AttendDTO dto) {
		return session.update("Attend.attendUpd",dto);
	}
}
