package kh.spring.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.spring.dto.ClassDTO;
import kh.spring.dto.ClassScheduleDTO;

@Repository
public class ClassDAO {

	@Autowired
	private SqlSession session;
	
	public int classInsert(ClassDTO dto) {
		return session.insert("Class.classInsert",dto);
	}
	public int classScheduleInsert(ClassScheduleDTO dto) {
		return session.insert("Class.classScheduleInsert",dto);
	}
	public int classUpdate(ClassDTO dto) {
		return session.update("Class.classUpdate",dto);
	}
	public int classScheduleUpdate(ClassScheduleDTO dto) {
		return session.update("Class.classScheduleUpdate",dto);
	}
	public List<ClassDTO> classReqList(){
		return session.selectList("Class.classReqList");
	}
	public List<ClassDTO> classListProCode(String proCode){
		return session.selectList("Class.classListProCode",proCode);
	}
	public List<ClassDTO> classList(){
		return session.selectList("Class.classList");
	}
	public int classDel(List<ClassDTO> list) {
		return session.delete("Class.classDel",list);
	}
	public int scheduleDel(List<ClassDTO> list) {
		return session.delete("Class.scheduleDel",list);
	}
	public int reqUpdAtoDR(List<ClassDTO> list) {
		return session.update("Class.reqUpdAtoDR",list);
	}
	public int reqUpdARtoA(List<ClassDTO> list) {
		return session.update("Class.reqUpdARtoA",list);
	}
	public int reqUpdDRtoDC(List<ClassDTO> list) {
		return session.update("Class.reqUpdDRtoDC",list);
	}
	public List<ClassDTO>classListSeq(int classSeq){
		return session.selectList("Class.classListSeq", classSeq);
	}
	public List<ClassScheduleDTO> classScheduleSeq(int classSeq){
		return session.selectList("Class.classScheduleSeq", classSeq);
	}
	public List<ClassDTO> classReqListA(){
		return session.selectList("Class.classReqListA");
	}
	public int rejectMsgInsert(List<ClassDTO> list,String rejectMsg) {
		Map<String, Object> param = new HashMap<>();
		param.put("list", list);
		param.put("rejectMsg", rejectMsg);
		return session.update("Class.rejectMsgInsert",param);
	}
	
}
