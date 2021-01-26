package kh.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.spring.dao.ScholarshipDAO;
import kh.spring.dto.ScholarshipDTO;

@Service
public class ScholarshipService {

	@Autowired
	private ScholarshipDAO dao;

	public ScholarshipDTO selectDTOByStd_Code(int std_code) {
		return dao.selectDTOByStd_Code(std_code);
	}
}
