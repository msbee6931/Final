package kh.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.spring.dao.RequestBoardDAO;

@Service
public class RequestBoardService {

	@Autowired
	private RequestBoardDAO dao;
	
}
