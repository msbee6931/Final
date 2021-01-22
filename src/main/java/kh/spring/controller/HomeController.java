package kh.spring.controller;


import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {
	

	
	@RequestMapping("/")
	public String home() throws Exception{
		
		return "home";
	}
	@RequestMapping("/nex")
	public String Nex() {
		return "redirect:/nex/index.html";
	}
		@ExceptionHandler
		public String ExceptionHandler(Exception e) {
			e.printStackTrace();
			return "error";
		}
	

	
}
