package kh.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.spring.dao.TuitionDAO;
import kh.spring.dto.TuitionDTO;

@Service
public class TuitionService {
	
	@Autowired
	private TuitionDAO dao;
	
	public TuitionDTO selectByStd_code(String std_code) {
		return dao.selectByStd_code(std_code);
	}
}
