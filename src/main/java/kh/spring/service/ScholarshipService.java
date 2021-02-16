package kh.spring.service;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import kh.spring.dao.ScholarshipDAO;
import kh.spring.dto.ReqSchFileDTO;
import kh.spring.dto.ReqScholarDTO;
import kh.spring.dto.ScholarshipDTO;

@Service
public class ScholarshipService {
	
	@Autowired
	ScholarshipDAO sDao;
	
	//장학금 입력 
	public int insertScholar(List<ScholarshipDTO> list) {
		return sDao.insertScholar(list);
	}
	
	//장학금 요청 파일 업로드
	public int insertReqSchFile(ReqSchFileDTO dto) {
		return sDao.insertReqSchFile(dto);
	}
	//장학금 요청 내용
	public int insertReqScholar(ReqScholarDTO dto) {
		return sDao.insertReqScholar(dto);
	}
	
	public int selectLastSeq() {
		return sDao.selectLastSeq();
	}
	
	public List<ReqScholarDTO> selectReqScholar() {
		return sDao.selectReqScholar();
	}
	
	public ReqScholarDTO selectSeqReqScholar(int seq) {
		return sDao.selectSeqReqScholar(seq);
	}
	
	public List<ReqSchFileDTO> selectReqSchFile(int seq){
		return sDao.selectReqSchFile(seq);
	}
	
	public int selectCountFile(int seq) {
		return sDao.selectCountFile(seq);
	}

	public File getCompressZipFile(ArrayList arrSaved, String filePath, String compressName) throws Exception {

		  String path = filePath;
		  String files[] = new String[arrSaved.size()];		  
		  File destination = new File(path);
		  
		  for(int i=0;i<arrSaved.size();i++) {
		    files[i] = (String)arrSaved.get(i);
		  }
		  
		  //buffer size
		  int size = 1024;
		  byte[] buf = new byte[size];
		  String outZipNm = path +File.separator+ compressName +".zip";
		  
		  File file = new File(outZipNm);
		   
		  FileInputStream fis = null;
		  ZipArchiveOutputStream zos = null;
		  BufferedInputStream bis = null;
		   
		  try {
		    // Zip 파일생성
		    zos = new ZipArchiveOutputStream(new BufferedOutputStream(new FileOutputStream(outZipNm))); 
		    for( int i=0; i < files.length; i++ ){
		      //encoding 설정
		      zos.setEncoding("UTF-8");
		       
		      //buffer에 해당파일의 stream을 입력한다.
		      fis = new FileInputStream(path +"/"+ files[i]);
		      bis = new BufferedInputStream(fis,size);
		       
		      //zip에 넣을 다음 entry 를 가져온다.
		      zos.putArchiveEntry(new ZipArchiveEntry(files[i].substring(33)));   // saved 내임을 원래이름으로 바꾸기 위에 uuid 앞의 33개를 빼고 출력              
		       
		      //준비된 버퍼에서 집출력스트림으로 write 한다.
		      int len;
		      while((len = bis.read(buf,0,size)) != -1){
		        zos.write(buf,0,len);
		      }
		       
		      bis.close();
		      fis.close();
		      zos.closeArchiveEntry();

		    }
		    zos.close();

		  } catch (Exception e) {
		    e.printStackTrace();
		  }finally{
		    if( zos != null ){  zos.close();  }
		    if( fis != null ){  fis.close();  }
		    if( bis != null ){  bis.close();  }
		  }
		  
		  return file;
		}
	


	public ScholarshipDTO selectDTOByStd_Code(int std_code) {
		return sDao.selectDTOByStd_Code(std_code);
	}
	
	public List<ReqScholarDTO> selectOneReqScholar(int stdCode) {
		return sDao.selectOneReqScholar(stdCode);
	}
	
	public int checkValueReqScholar(int seq) {
		return sDao.checkValueReqScholar(seq);
	}
}
