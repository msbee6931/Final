package kh.spring.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroFileResult;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro.uiadapter17.spring.core.util.CharsetUtil;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.tx.PlatformType;

import kh.spring.dto.ReqSchFileDTO;
import kh.spring.dto.ReqScholarDTO;
import kh.spring.dto.ScholarshipDTO;
import kh.spring.dto.TuitionDTO;
import kh.spring.service.ScholarshipService;

@Controller
@RequestMapping("/scholarship")
public class ScholarshipController {

	private Logger logger = LoggerFactory.getLogger(ScholarshipController.class);

	@Autowired
	private HttpSession session;

	@Autowired
	ScholarshipService sService;

	//관리자_장학금 입력
	@RequestMapping("insert.scholarship")
	public NexacroResult insert(@ParamDataSet(name="in_ds")List<ScholarshipDTO> list) {
		System.out.println("장학금 입력 컨트롤러 확인");
		NexacroResult nr = new NexacroResult();
		int result = sService.insertScholar(list);
		return nr;
	}


	//학생_장학금 신청내용  입력
	@RequestMapping("uploadReqScholar.scholarship")
	public NexacroResult uploadReqScholar(@ParamDataSet(name="in_ds")ReqScholarDTO dto) throws Exception{
		System.out.println("장학금 요청 컨트롤러 확인");

		int sResult = sService.insertReqScholar(dto);

		NexacroResult nr = new NexacroResult();
		return nr;
	}

	@RequestMapping("uploadReqSchFile.scholarship")
	public NexacroResult uploadReqSchFile(HttpServletRequest request, HttpServletResponse response) throws Exception{
		System.out.println("장학금 요청 컨트롤러 확인");

		int selectLastSeq = sService.selectLastSeq(); 
		System.out.println("parentSeq확인 : "+selectLastSeq);

		if(!(request instanceof MultipartHttpServletRequest)) {
			if(logger.isDebugEnabled()) {
				logger.debug("Request is not a MultipartHttpServletRequest");
			}
			return new NexacroResult();
		}

		MultipartHttpServletRequest multipartRequest = 
				(MultipartHttpServletRequest) request;

		// parameter and multipart parameter
		Enumeration<String> parameterNames = multipartRequest.getParameterNames();

		// files..
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();

		String realPath = session.getServletContext().getRealPath("ScholarshipFiles");
		File filesPath = new File(realPath); 
		if(!filesPath.exists()) {
			filesPath.mkdir();
		}


		Set<String> keySet = fileMap.keySet();
		for(String name: keySet) {
			MultipartFile multipartFile = fileMap.get(name);
			String originalFileName = multipartFile.getOriginalFilename();
			String uid = UUID.randomUUID().toString().replaceAll("-", "");
			String savedFileName = uid + "_" +originalFileName;


			ReqSchFileDTO fDto = new ReqSchFileDTO("0",0,selectLastSeq,originalFileName,savedFileName, multipartFile.getSize()); 
			int result = sService.insertReqSchFile(fDto);
			//DB에 저장이 되었을 경우 파일을 복사 저장하라는 조건문
			if(result > 0) {
				File targetLoc = new File(filesPath.getAbsolutePath()+"/"+savedFileName);
				FileCopyUtils.copy(multipartFile.getBytes(), targetLoc);
			}

			// upload some logic…

			if(logger.isDebugEnabled()) {
				logger.debug("uploaded file write success. file={}", 
						originalFileName);
			}

		}

		return new NexacroResult();
	}

	//관리자_장학금 신청 관리 목록 조회
	@RequestMapping("selectReqScholar.scholarship")
	public NexacroResult selectReqScholar() {
		NexacroResult nr = new NexacroResult();

		List<ReqScholarDTO> list = sService.selectReqScholar();
		nr.addDataSet("out_ds",list);
		return nr;
	}

	//관리자_장학금 신청 단일 목록 조회
	@RequestMapping("selectSeqReqScholar.scholarship")
	public NexacroResult selectSeqReqScholar(@ParamVariable(name="seq")int seq) {
		System.out.println("장학금 신청 단일목록 조회 현재 seq :  "+seq);

		NexacroResult nr = new NexacroResult();

		ReqScholarDTO dto = sService.selectSeqReqScholar(seq);
		List<ReqSchFileDTO> fDto = sService.selectReqSchFile(seq); 
		nr.addDataSet("out_ds",dto);
		nr.addDataSet("out_fDs", fDto);
		return nr;
	}



	//학생 장학금 요청 관리자 쪽 파일 다운로드
	@RequestMapping(value = "downReqSchFile.scholarship")
	public NexacroFileResult downReqSchFile(HttpServletRequest request) throws Exception {
		System.out.println("다운로드 확인");
		String filePath = session.getServletContext().getRealPath("ScholarshipFiles"); //현재 파일이 존재하는 폴더 경로 가져오기
		File targetFile = null; //실제 파일 취급
		String tranName =""; //다운받을 파일에 입힐 이름


		int seq = Integer.parseInt(request.getParameter("seq")); // 부모 고유 번호 받아오기
		int countFile = sService.selectCountFile(seq); // 해당 게시물에 총 첨부된 파일 갯수

		ArrayList arrSaved = new ArrayList(); //저장된 이름
		//그중 다운로드 될 파일 갯수 및 이름 조회
		for(int i=0;i<countFile;i++) {
			String downSFile  = request.getParameter("savedFileName'"+i+"'"); // 넥사에서 setPostData로 보낸 데이터
			arrSaved.add(i, downSFile);
		}

		ArrayList arrOrg = new ArrayList(); // 원래 이름
		//그중 다운로드 될 파일 갯수 및 이름 조회
		for(int i=0;i<countFile;i++) {
			String downOFile  = request.getParameter("fileName'"+i+"'"); // 넥사에서 setPostData로 보낸 데이터
			arrOrg.add(i, downOFile);
		}


		for(int i=0; i<arrSaved.size();i++) {
			//파일이 2개 이상이면 압축파일로 저장한다.
			if(arrSaved.size()>1) {
    
				String uid = UUID.randomUUID().toString().replaceAll("-", "");
			    targetFile = sService.getCompressZipFile(arrSaved, filePath, "compressZip_"+uid);	    
			    tranName = seq+"번_장학금_요청글_첨부파일.zip";

			} else {
				targetFile = new File(filePath+"/"+arrSaved.get(i));
				tranName =(String)arrOrg.get(i);
			}
		}

		NexacroFileResult nfr = new NexacroFileResult(targetFile);
		nfr.setOriginalName(tranName);
		return nfr;
	}    






}
