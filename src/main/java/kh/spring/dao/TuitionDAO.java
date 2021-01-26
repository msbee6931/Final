package kh.spring.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.TuitionDTO;

@Repository
public class TuitionDAO {

	@Autowired
	private SqlSession session;
	
	public TuitionDTO selectByStd_code(String std_code) {
		return session.selectOne("Tuition.selectByStd_code",std_code);
	}
}
