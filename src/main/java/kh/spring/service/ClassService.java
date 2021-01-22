package kh.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.spring.dao.ClassDAO;
import kh.spring.dto.ClassDTO;
import kh.spring.dto.ClassScheduleDTO;

@Service
public class ClassService {
	@Autowired
	private ClassDAO dao;
	
	public int classInsert(ClassDTO dto) {
		return dao.classInsert(dto);
	}
	public int classScheduleInsert(ClassScheduleDTO dto) {
		return dao.classScheduleInsert(dto);
	}
	public int classUpdate(ClassDTO dto) {
		return dao.classUpdate(dto);
	}
	public int classScheduleUpdate(ClassScheduleDTO dto) {
		return dao.classScheduleUpdate(dto);
	}
	public List<ClassDTO> classReqList(){
		return dao.classReqList();
	}
	public List<ClassDTO> classListProCode(String proCode){
		return dao.classListProCode(proCode);
	}
	public List<ClassDTO> classList(){
		return dao.classList();
	}
	public int classDel(List<ClassDTO> list) {
		return dao.classDel(list);
	}
	public int scheduleDel(List<ClassDTO> list) {
		return dao.scheduleDel(list);
	}
	public int reqUpdAtoDR(List<ClassDTO> list) {
		return dao.reqUpdAtoDR(list);
	}
	public int reqUpdARtoA(List<ClassDTO> list) {
		return dao.reqUpdARtoA(list);
	}
	public int reqUpdDRtoDC(List<ClassDTO> list) {
		return dao.reqUpdDRtoDC(list);
	}
	public List<ClassDTO>classListSeq(int classSeq){
		return dao.classListSeq(classSeq);
	}
	public List<ClassScheduleDTO> classScheduleSeq(int classSeq){
		return dao.classScheduleSeq(classSeq);
	}
	public List<ClassDTO> classReqListA(){
		return dao.classReqListA();
	}
	public int rejectMsgInsert(List<ClassDTO> list,String rejectMsg) {
		return dao.rejectMsgInsert(list,rejectMsg);
	}
}
