package kh.spring.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kh.spring.dto.StudentsDTO;
import kh.spring.service.StudentsService;

@Controller
@RequestMapping("/certification")
public class CertificationController {

	@Autowired
	private StudentsService Sservice;

	@Autowired
	private HttpSession session;


	@RequestMapping("enrollment")
	public String enrollmnet(Model model) {
		//String s_seq = (String)session.getAttribute("id");

		//합치면 지울내용
		String s_seq = "2201001";


		StudentsDTO dto = Sservice.selectStudentsByS_Seq(s_seq);
		String seq =Integer.toString(dto.getS_seq());

		//--s_seq 분해
		String s_id = seq.substring(0,2);
		String s_part = seq.substring(2,4);
		String s_num = seq.substring(4);


		//--s_part 정의

		String part = "";
		if(s_part.contentEquals("01")) {
			part = "컴퓨터 공학";
		}

		//-오늘날짜 출력하기
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy년 MM월 dd일");
		Date time = new Date();
		String sysdate = format.format(time);

		//--학기 정의
		String semester = null;
		SimpleDateFormat format2 = new SimpleDateFormat ( "MM");
		Date time2 = new Date();
		int month = Integer.parseInt(format2.format(time2));
		if(month>=03 && month<=07) {
			semester="1학기";
		}else {
			semester="2학기";
		}

		//-- 생년월일 포맷 맞추기
		String birth = dto.getBirth().substring(2,4)+dto.getBirth().substring(5,7)+dto.getBirth().substring(8,10);

		model.addAttribute("dto",dto);
		model.addAttribute("birth",birth);
		model.addAttribute("semester",semester);
		model.addAttribute("sysdate",sysdate);
		model.addAttribute("s_id",s_id);
		model.addAttribute("part",part);
		model.addAttribute("s_num",s_num);


		return "Certification/enrollmentCertification";
	}
	@RequestMapping("graduate")
	public String graduate(Model model){
		//String s_seq = (String)session.getAttribute("id");

		//합치면 지울내용
		String s_seq = "2201001";


		StudentsDTO dto = Sservice.selectStudentsByS_Seq(s_seq);
		String seq =Integer.toString(dto.getS_seq());

		//--s_seq 분해
		String s_id = seq.substring(0,2);
		String s_part = seq.substring(2,4);
		String s_num = seq.substring(4);


		//--s_part 정의

		String part = "";
		if(s_part.contentEquals("01")) {
			part = "컴퓨터 공학";
		}

		//-- 생년월일 포맷 맞추기
		String birth = dto.getBirth().substring(2,4)+dto.getBirth().substring(5,7)+dto.getBirth().substring(8,10);

		//-오늘날짜 출력하기
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy년 MM월 dd일");
		Date time = new Date();
		String sysdate = format.format(time);

		model.addAttribute("dto",dto);
		model.addAttribute("birth",birth);
		model.addAttribute("part",part);
		model.addAttribute("sysdate",sysdate);
		return "Certification/graduateCertification";
	}
	@RequestMapping("payment")
	public String payment(Model model) {
		//String s_seq = (String)session.getAttribute("id");

		//합치면 지울내용
		String s_seq = "2201001";


		StudentsDTO dto = Sservice.selectStudentsByS_Seq(s_seq);
		String seq =Integer.toString(dto.getS_seq());

		//--s_seq 분해
		String s_id = seq.substring(0,2);
		String s_part = seq.substring(2,4);
		String s_num = seq.substring(4);


		//--s_part 정의

		String part = "";
		if(s_part.contentEquals("01")) {
			part = "컴퓨터 공학";
		}

		//-오늘날짜 출력하기
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy년 MM월 dd일");
		Date time = new Date();
		String sysdate = format.format(time);

		//--학기 정의
		String semester = null;
		SimpleDateFormat format2 = new SimpleDateFormat ( "MM");
		Date time2 = new Date();
		int month = Integer.parseInt(format2.format(time2));
		if(month>=03 && month<=07) {
			semester="1학기";
		}else {
			semester="2학기";
		}

		//-- 생년월일 포맷 맞추기
		String birth = dto.getBirth().substring(2,4)+dto.getBirth().substring(5,7)+dto.getBirth().substring(8,10);

		model.addAttribute("dto",dto);
		model.addAttribute("semester",semester);
		model.addAttribute("part",part);
		model.addAttribute("sysdate",sysdate);
		model.addAttribute("birth",birth);
		return "Certification/receipt";
	}
	@RequestMapping("transcript")
	public String transcript(Model model) {
		//String s_seq = (String)session.getAttribute("id");

		//합치면 지울내용
		String s_seq = "2201001";

		StudentsDTO dto = Sservice.selectStudentsByS_Seq(s_seq);
		String seq =Integer.toString(dto.getS_seq());

		//--s_seq 분해
		String s_id = seq.substring(0,2);
		String s_part = seq.substring(2,4);
		String s_num = seq.substring(4);


		//--s_part 정의

		String part = "";
		if(s_part.contentEquals("01")) {
			part = "컴퓨터 공학";
		}

		//-- 생년월일 포맷 맞추기
		String birth = dto.getBirth().substring(2,4)+dto.getBirth().substring(5,7)+dto.getBirth().substring(8,10);

		model.addAttribute("s_id",s_id);
		model.addAttribute("dto",dto);
		model.addAttribute("part",part);
		model.addAttribute("birth",birth);
		return "Certification/transcript";
	}

}
