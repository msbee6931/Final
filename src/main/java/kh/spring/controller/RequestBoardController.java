package kh.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kh.spring.service.RequestBoardService;

@Controller
public class RequestBoardController {
	
	@Autowired
	private RequestBoardService RBservice;
}
