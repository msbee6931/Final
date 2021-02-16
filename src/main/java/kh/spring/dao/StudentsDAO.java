package kh.spring.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.StudentsDTO;

@Repository
public class StudentsDAO {

	@Autowired
	private SqlSession session;
	
	public StudentsDTO selectStudentsByS_Seq(String s_seq) {
		return session.selectOne("Students.selectStudentsByS_Seq",s_seq);
	}
	
	public StudentsDTO selectOneStd(int sCode) {
		return session.selectOne("Students.selectOneStd", sCode);
	}
	
	public int updateStdAbs(int sCode) {
		return session.update("Students.updateStdAbs", sCode);
	}
	public int updateStdRest(int sCode) {
		return session.update("Students.updateStdRest", sCode);
	}
	
}
