package kh.spring.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kh.spring.dto.ScholarshipDTO;
import kh.spring.dto.StudentsDTO;
import kh.spring.dto.TuitionDTO;
import kh.spring.service.ScholarshipService;
import kh.spring.service.StudentsService;
import kh.spring.service.TuitionService;

@Controller
@RequestMapping("/certification")
public class CertificationController {

	@Autowired
	private StudentsService Sservice;

	@Autowired
	private TuitionService Tservice;
	
	@Autowired
	private ScholarshipService Scservice;
	
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

		//-- 납부관련 dto 불러오기
		TuitionDTO dto2 = Tservice.selectByStd_code(s_seq);
		
		//-- 입학금 + 수업료 더한 합계 만들기
		int sum1=dto2.getT_enter()+dto2.getT_class();
		
		//-- 생년월일 포맷 맞추기
				String t_date = dto2.getT_date().substring(0,4)+"년 "+dto2.getT_date().substring(5,7)+"월 "+dto2.getT_date().substring(8,10)+"일";
			
		//장학금 총액 구하기
				ScholarshipDTO dto3 = Scservice.selectDTOByStd_Code(dto.getS_seq());
				int scholarship = dto3.getSsum();
				
		// 청구 총액 구하기
				
				int finalsum = dto2.getTsum()-scholarship;
		
		model.addAttribute("finalsum",finalsum);
		model.addAttribute("scholarship",scholarship);		
		model.addAttribute("sum1",sum1);
		model.addAttribute("t_date",t_date);
		model.addAttribute("dto2",dto2);
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
		
		//--seq받은걸로 dto 찾기
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
