package kh.spring.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.ScholarshipDTO;

@Repository
public class ScholarshipDAO {

	@Autowired
	private SqlSession session;
	
	public ScholarshipDTO selectDTOByStd_Code(int std_code) {
		return session.selectOne("Scholarship.selectDTOByStd_Code",std_code);
	}
}
