package kh.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import kh.spring.dto.GradeDTO;
import kh.spring.service.GradeService;

@Controller
public class GradeController {

	@Autowired
	private GradeService service;
	
	@RequestMapping("/stdGrade.nex")
	public NexacroResult stdGrade(@ParamDataSet(name="in_ds")GradeDTO dto) {
		NexacroResult nr = new NexacroResult();
		dto = service.stdGrade(dto);
		nr.addDataSet("out_ds",dto);
		return nr;
	}
	@RequestMapping("/stdGradeInsert.nex")
	public NexacroResult stdGradeInsert(@ParamDataSet(name="in_ds")GradeDTO dto) {
		NexacroResult nr = new NexacroResult();
		service.stdGradeInsert(dto);
		List<GradeDTO> list = service.stdGradeList(dto);
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("/stdGradeList.nex")
	public NexacroResult stdGradeList(@ParamVariable(name="classCode")int classCode) {
		NexacroResult nr = new NexacroResult();
		GradeDTO dto = new GradeDTO();
		dto.setClassCode(classCode);
		List<GradeDTO> list = service.stdGradeList(dto);
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("/stdGradeUpd.nex")
	public NexacroResult stdGradeUpd(@ParamDataSet(name="in_ds")List<GradeDTO> list) {
		NexacroResult nr = new NexacroResult();
		for(GradeDTO dto : list) {
			service.stdGradeUpd(dto);
		}
		return nr;
	}
}
