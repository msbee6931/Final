package kh.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import kh.spring.dto.ClassDTO;
import kh.spring.dto.ClassScheduleDTO;
import kh.spring.service.ClassService;

@Controller
public class ClassController {

	@Autowired
	private ClassService service;
	@RequestMapping("/classInfo.nex")
	public NexacroResult classInfo(@ParamDataSet(name="in_ds1", required=false)ClassDTO dto, @ParamDataSet(name="in_ds2", required=false)ClassScheduleDTO dto2) {
		NexacroResult nr = new NexacroResult();
		System.out.println(dto.getClassPart());
		service.classInsert(dto);
		service.classScheduleInsert(dto2);
		return nr;
	}

	@RequestMapping("/classInfoUpd.nex")
	public NexacroResult classInfoUpd(@ParamDataSet(name="in_ds1", required=false)ClassDTO dto,@ParamDataSet(name="in_ds2", required=false)ClassScheduleDTO dto2) {
		NexacroResult nr = new NexacroResult();
		service.classUpdate(dto);
		System.out.println(dto.getClassSeq() + dto.getClassGoal());
		service.classScheduleUpdate(dto2);
		System.out.println(dto2.getWeek1());
		return nr;
	}

	@RequestMapping("classList.nex")
	public NexacroResult classList() {
		NexacroResult nr = new NexacroResult();
		List<ClassDTO> list = service.classList();
		nr.addDataSet("out_ds",list);
		return nr;
	}
	
	@RequestMapping("/classReqList.nex")
	public NexacroResult classReqList() {
		NexacroResult nr = new NexacroResult();
		List<ClassDTO> list = service.classReqList();
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("/classListProCode.nex")
	public NexacroResult classListProCode(@ParamVariable(name="proCode")String proCode) {
		NexacroResult nr = new NexacroResult();
		List<ClassDTO> list = service.classListProCode(proCode);
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("/classDel.nex")
	public NexacroResult classDel(@ParamDataSet(name="in_ds")List<ClassDTO> list) {
		NexacroResult nr = new NexacroResult();
		service.classDel(list);
		service.scheduleDel(list);
		return nr;
	}
	@RequestMapping("/reqUpdAtoDR.nex")
	public NexacroResult reqUpdAtoDR(@ParamDataSet(name="in_ds")List<ClassDTO> list) {
		NexacroResult nr = new NexacroResult();
		service.reqUpdAtoDR(list);
		return nr;
	}
	@RequestMapping("/reqUpdARtoA.nex")
	public NexacroResult reqUpdARtoA(@ParamDataSet(name="in_ds")List<ClassDTO> list) {
		NexacroResult nr = new NexacroResult();
		service.reqUpdARtoA(list);
		return nr;
	}
	@RequestMapping("/reqUpdDRtoDC.nex")
	public NexacroResult reqUpdDRtoDC(@ParamDataSet(name="in_ds")List<ClassDTO> list) {
		NexacroResult nr = new NexacroResult();
		service.reqUpdDRtoDC(list);
		return nr;
	}
	@RequestMapping("/classListSeq.nex")
	public NexacroResult classListSeq(@ParamVariable(name="classSeq")int classSeq) {
		NexacroResult nr = new NexacroResult();
		List<ClassDTO> list1 = service.classListSeq(classSeq);
		List<ClassScheduleDTO> list2 = service.classScheduleSeq(classSeq);
		nr.addDataSet("out_ds",list1);
		nr.addDataSet("out_ds2",list2);
		return nr;
	}
	@RequestMapping("/classReqListA.nex")
	public NexacroResult classReqListA() {
		NexacroResult nr = new NexacroResult();
		List<ClassDTO> list = service.classReqListA();
		nr.addDataSet("out_ds",list);
		return nr;
	}
	@RequestMapping("/rejectMsgInsert.nex")
	public NexacroResult rejectMsgInsert(@ParamDataSet(name="in_ds")List<ClassDTO> list,@ParamVariable(name="msg")String rejectMsg) {
		NexacroResult nr = new NexacroResult();
		System.out.println(rejectMsg);
		service.rejectMsgInsert(list,rejectMsg);
		return nr;
	}
}
