package kh.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import kh.spring.dto.FacultyDTO;
import kh.spring.dto.FreeBoardDTO;
import kh.spring.dto.ProfessorDTO;
import kh.spring.dto.RequestBoardDTO;
import kh.spring.dto.StudentsDTO;
import kh.spring.service.AdminService;
import kh.spring.service.FreeBoardService;
import kh.spring.service.RequestBoardService;
import kh.spring.util.EncryptUtils;

@Controller
public class AdminController {
	
	@Autowired
	private AdminService aService;
	
	@Autowired
	private RequestBoardService RBservice;
	
	@Autowired
	private FreeBoardService FBservice;
	//students
	@RequestMapping("studentslist.nex")
	public NexacroResult studentsList() {
		NexacroResult nr = new NexacroResult();
		List<StudentsDTO> list = aService.getliststu();
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("deleteStudent.nex")
	public NexacroResult deletestudent(@ParamDataSet(name="in_ds")List<StudentsDTO> list) {
		System.out.println("도착여부");
		NexacroResult nr = new NexacroResult();
		int result = aService.deletestu(list);
		return nr;
	}
	@RequestMapping("updateStudent.nex")
	public NexacroResult updateStudent(@ParamDataSet(name="in_ds")List<StudentsDTO> list) {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		
		int result = aService.updatestu(list);
		return nr;
	}
	@RequestMapping("insertStudent.nex")
	public NexacroResult insertStudent(@ParamDataSet(name="in_ds")List<StudentsDTO> list) {
		System.out.println("도착");
		String pw; String Spw = null;
		for(int i =0; i < list.size(); i++) {
			pw = list.get(i).getPw();
			Spw = EncryptUtils.getSHA256(pw);
			list.get(i).setPw(Spw);
		}
		NexacroResult nr = new NexacroResult();
		int result = aService.insertstu(list);
		return nr;
		
		//professor
	}
	@RequestMapping("professorList.nex")
	public NexacroResult professorList() {
		NexacroResult nr = new NexacroResult();
		List<ProfessorDTO> list = aService.getlistPro();
		nr.addDataSet("out_ds", list);
		return nr;
	}
	@RequestMapping("updateProfessor.nex")
	public NexacroResult updateProfessor(@ParamDataSet(name="in_ds")List<ProfessorDTO> list) {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		int result = aService.updatePro(list);
		return nr;
	}
	@RequestMapping("deleteProfessor.nex")
	public NexacroResult deleteProfessor(@ParamDataSet(name="in_ds")List<ProfessorDTO> list) {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		int result = aService.deletePro(list);
		return nr;
	}
	@RequestMapping("insertProfessor.nex")
	public NexacroResult insertProfessor(@ParamDataSet(name="in_ds")List<ProfessorDTO> list) {
		System.out.println("도착");
		String pw; String Spw = null;
		for(int i =0; i < list.size(); i++) {
			pw = list.get(i).getPw();
			Spw = EncryptUtils.getSHA256(pw);
			list.get(i).setPw(Spw);
		}
		NexacroResult nr = new NexacroResult();
		int result = aService.insertPro(list);
		return nr;
	}
	//faculty
	
	@RequestMapping("facultylist.nex")
	public NexacroResult facultylist() {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		List<FacultyDTO> list = aService.getlistFac();
		nr.addDataSet("out_ds", list);
		return nr;
	}
	@RequestMapping("deleteFaculty.nex")
	public NexacroResult deleteFaculty(@ParamDataSet(name="in_ds")List<FacultyDTO> list) {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		int result = aService.deleteFac(list);
		return nr;
	}
	@RequestMapping("updateFaculty.nex")
	public NexacroResult updateFaculty(@ParamDataSet(name="in_ds") List<FacultyDTO> list) {
		System.out.println("도착");
		NexacroResult nr = new NexacroResult();
		int result = aService.updateFac(list);
		return nr;
	}
	@RequestMapping("insertFaculty.nex")
	public NexacroResult insertFaculty(@ParamDataSet(name="in_ds") List<FacultyDTO> list) {
		NexacroResult nr = new NexacroResult();
		int result = aService.insertFac(list);
		return nr;
	}

	
	
	@RequestMapping("ReplyUpd.nex")
	public NexacroResult updReply(@ParamDataSet(name="in_ds")RequestBoardDTO dto) {
		//-- login session update 이후 바꿔 줘야함
		String id= "0101005";
		
		NexacroResult nr = new NexacroResult();
		RBservice.updateReply(dto);
		List<RequestBoardDTO> list = RBservice.selectAll();
		nr.addDataSet("out_ds",list);		
		
		return nr;

	}
	
	@RequestMapping("RBLoad.nex")
	public NexacroResult RBNexLoad() {
		//-- login session update 이후 바꿔 줘야함
		String id= "0101005";
		NexacroResult nr = new NexacroResult();
		List<RequestBoardDTO> list = RBservice.selectAll();
		nr.addDataSet("out_ds",list);
		return nr;

	}	
	
	@RequestMapping("RBDel.nex")
	public NexacroResult RBNexDel(@ParamDataSet(name="in_ds")List<RequestBoardDTO> list) {
		NexacroResult nr = new NexacroResult();
		RBservice.deleteList(list);
		return nr;
	}
	
	@RequestMapping("FBLoad.nex")
	public NexacroResult FBNexLoad() throws Exception {
		//-- login session update 이후 바꿔 줘야함
		String id= "0101005";
		NexacroResult nr = new NexacroResult();
		int cpage = 1;
		List<FreeBoardDTO> list = FBservice.listByCpage(cpage);
		nr.addDataSet("out_ds",list);
		return nr;

	}
	
	@RequestMapping("FBDel.nex")
	public NexacroResult FBNexDel(@ParamDataSet(name="in_ds")List<FreeBoardDTO> list) {
		NexacroResult nr = new NexacroResult();
		FBservice.deleteList(list);
		return nr;
	}
	
	@ExceptionHandler
	public String exceptionhandler(Exception e){
		e.printStackTrace();
		return "error";
	}

	
	

}
