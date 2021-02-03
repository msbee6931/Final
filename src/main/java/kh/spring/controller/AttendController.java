package kh.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import kh.spring.dto.AttendDTO;
import kh.spring.service.AttendService;

@Controller
public class AttendController {

	@Autowired
	private AttendService service;

	@RequestMapping("attendList.nex")
	public NexacroResult attendList(@ParamDataSet(name="in_ds")List<AttendDTO> list) {
		NexacroResult nr = new NexacroResult();
		AttendDTO dto = new AttendDTO();
		String attendDay = list.get(0).getAttendDay();
		int classCode = list.get(0).getClassCode();
		dto.setAttendDay(attendDay);
		dto.setClassCode(classCode);
		List<AttendDTO> list2 = service.attendListDay(dto);
		if(list2.size() > 0) {
			for(int i=0; i<list2.size(); i++) {
				for(int j=list.size()-1; j>=0; j--) {
					if(list.get(j).getsCode()==list2.get(i).getsCode()) {
						list.remove(j);
					}
				}
			}
		}
		if(list.size()>0) {
			service.attendInsert(list);
		}
		list2 = service.attendListDay(dto);
		nr.addDataSet("out_ds",list2);
		System.out.println(list2.size());
		return nr;
	}
	@RequestMapping("/attendUpd.nex")
	public NexacroResult attendUpd(@ParamDataSet(name="in_ds")List<AttendDTO> list) {
		NexacroResult nr = new NexacroResult();	
		AttendDTO dto = new AttendDTO();
		String attendDay = list.get(0).getAttendDay();
		int classCode = list.get(0).getClassCode();
		dto.setAttendDay(attendDay);
		dto.setClassCode(classCode);
		for(AttendDTO dto2 : list) {
			service.attendUpd(dto2);
		}
		list = service.attendListDay(dto);
		nr.addDataSet("out_ds",list);
		return nr;
	}
}
