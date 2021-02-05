package kh.spring.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonObject;

import kh.spring.dto.FriendDTO;
import kh.spring.dto.MessageDTO;
import kh.spring.dto.RoomDTO;
import kh.spring.dto.UserDTO;
import kh.spring.service.ChattingService;

@Controller
@RequestMapping("/chatting")
public class ChatController {
	@Autowired
	private HttpSession session;
	@Autowired
	private ChattingService service;
	
	@RequestMapping("chatHome")
	public String chatHome(Model model,HttpServletRequest request) {
		String userId = request.getParameter("userId");
		// 로그인시 저장된 유저 아이디 불러오기
		session.setAttribute("userId",userId);
		
		// 유저 정보
		UserDTO user = service.getUserInfo(userId);
		
		// 친구리스트
		List<FriendDTO> friendList = service.getFriendsList(userId); 
		
		model.addAttribute("user", user);
		model.addAttribute("friendList",friendList);
		
		return "Chat/chatHome";
	}
	
	@RequestMapping("chatList")
	public String chatList(Model model) {
		String userId = (String) session.getAttribute("userId");
		UserDTO user = service.getUserInfo(userId);
		
		// 모든 채팅방 목록 반환
		List<RoomDTO> roomList = service.findAllRoomByUserId(userId);
		model.addAttribute("roomList",roomList);
		model.addAttribute("user",user);
		return "Chat/chatList";
	}
	
	@RequestMapping("chatDetail")
	public String chatDetail(String roomNumber,Model model) {
		String userId = (String) session.getAttribute("userId");
		UserDTO user = service.getUserInfo(userId);
		
		List<MessageDTO> list = service.getChatting(roomNumber);
		
		model.addAttribute("list",list);
		model.addAttribute("userId", userId);
		model.addAttribute("roomNumber",roomNumber);
		return "Chat/chat";
	}
	
	// ----------------------------------------------------------------------- friend	
	@RequestMapping("searchFriend")
	public String searchFriend(String searchId,Model model) {
		String userId = (String) session.getAttribute("userId");
		List<UserDTO> list = service.searchFriend(searchId);
		model.addAttribute("userId", userId);
		model.addAttribute("list",list);
		return "Chat/searchFriend";
	}
	
	@RequestMapping("friendAdd")
	public void friendAdd(String friendId,String friendName,String userName,ServletResponse response) throws Exception{
		String userId = (String) session.getAttribute("userId");
		FriendDTO result = service.isFriendExist(userId,friendId);
		PrintWriter pw = response.getWriter();
		JsonObject obj = new JsonObject();
		if(result!=null) {
			obj.addProperty("msg", "이미 친구인 사용자입니다.");
		}else {
			service.insertFriend(userId,userName,friendId,friendName);
			obj.addProperty("msg", "친구목록에 추가되었습니다.");
		}
		pw.append(obj.toString());
	}

	// ----------------------------------------------------------------------- chat
	
	private final SimpMessagingTemplate template;

	@Autowired
	public ChatController(SimpMessagingTemplate template) {
		this.template = template;
	}

	// 채팅 메세지 전달
	@MessageMapping("chat") // 리퀘스트가 http를 통해 접속하는 경우 쓰임. 웹소켓 접속은 다른 어노테이션
	// @SendTo("/topic") // Proc 메서드 작업이 끝나면 response를 구독하는 사람한테만 메세지 보내는 설정 가능
	public void chat(MessageDTO dto) {
		int result = service.insertMessage(dto.getUserId(),dto.getMessage(),dto.getRoomNumber());
		if(result>0) {
			template.convertAndSend("/topic/chat/"+dto.getRoomNumber(),dto);
		}
	}
	
	@RequestMapping("upload")
	@ResponseBody
	public void upload(MultipartFile file,String roomNumber,String userId) throws Exception{ 
		String realPath = session.getServletContext().getRealPath("files"); File
		filesPath = new File(realPath); if(!filesPath.exists()) {filesPath.mkdir();}
		
		String oriName = file.getOriginalFilename();
		String uId = UUID.randomUUID().toString().replaceAll("-", ""); 
		String savedName = uId + "_" + oriName;
		  
		int result = service.insertChatFile(roomNumber,oriName,savedName,userId);
 
		if(result > 0) { File targetLoc = new
		File(filesPath.getAbsoluteFile()+"/"+savedName);
		FileCopyUtils.copy(file.getBytes(), targetLoc); // in에는 업로드하는 파일의 바이트, out에는 저장할 경로
		
		MessageDTO dto = service.getFile(savedName);
		String time = dto.getUploadDate().toString();
		dto.setUploadDate(time);
		template.convertAndSend("/topic/file/"+roomNumber,dto); 
		 }
	}
	
	@RequestMapping("download")
	@ResponseBody
	public void download(HttpServletResponse resp,MessageDTO dto) throws Exception{		
		String filePath = session.getServletContext().getRealPath("files");
		File targetFile = new File(filePath+"/"+dto.getSavedName()); 
		
		if(targetFile.exists() && targetFile.isFile()) {
			
			resp.setContentType("application/octet-stream; charset=utf8");
			// 파일의 내용 형식을 바꿔주는 것. 기본값은 text/html이다.
			// 여기서 보내려는건 파일의 내용이고 이것이 html로 랜더링 되면 안되니 꼭 타입을 바꿔줘야함
			resp.setContentLength((int)targetFile.length());
			String oriName = new String(dto.getOriName().getBytes("UTF-8"), "ISO-8859-1");
			dto.setOriName(oriName);
			resp.setHeader("Content-Disposition","attachment; filename=\""+dto.getOriName()+"\"");
			// 파일을 다운로드할때 하단에 뜨는 곳에 나오는 정보(헤더 정보가 나옴)
			
			FileInputStream fis = new FileInputStream(targetFile);
			// targetFile을 ram으로 불러오기 위한 통로
			ServletOutputStream sos = resp.getOutputStream();
			// resp가 데이터를 들고 클라이언트에게 가는 통로
			FileCopyUtils.copy(fis,sos);
			fis.close();
			
			sos.flush(); // fis의 데이터가 담긴 sos통로를 보내는 것
			sos.close();
			// fis에서 나오는 데이터를 sos에 복사해라
		}
	}
	
	// ----------------------------------------------------------------------- Room
	
	// 채팅방 생성
	@RequestMapping("roomCreate")
	public void createRoom(String roomNumber,String roomName) {
		int result = service.insertRoom(roomNumber,roomName);
		if(result>0) {
			RoomDTO dto = service.findRoomByRoomNumber(roomNumber);
			template.convertAndSend("/topic/roomCreate",dto);
		}
	}

	// 특정 채팅방 조회
	@RequestMapping("roomCheck")
	public String roomInfo(String userId,String friendId,String userName,String friendName,Model model) {
		RoomDTO dto = service.findRoomById(userId, friendId);
		
		if(dto == null) {
			// 채팅방이 없을시 채팅방 생성
			String roomNumber = userId+"_"+friendId;
			String roomName = userName+"와 "+friendName+"의 채팅방";
			int result = service.insertRoom(roomNumber,roomName);
			List<MessageDTO> list = service.getChatting(roomNumber);
			
			model.addAttribute("list",list);
			model.addAttribute("userId", userId);
			model.addAttribute("roomNumber",roomNumber);
		}else {
			// 채팅방이 있을시
			String roomNumber = dto.getRoomNumber();
			List<MessageDTO> list = service.getChatting(roomNumber);
			
			model.addAttribute("list",list);
			model.addAttribute("userId", userId);
			model.addAttribute("roomNumber",roomNumber);
		}

		return "Chat/chat";
	}
	
	private static JSONObject JsonToObjectParser(String jsonStr) {
		JSONParser parser = new JSONParser();
		JSONObject obj = null;
		try {
			obj = (JSONObject)parser.parse(jsonStr);
		}catch(ParseException e) {
			e.printStackTrace();
		}
		return obj;
		// json 형태의 문자열을 SimpleJson의 parser를 이용하여 JSONObject로 파싱처리
	}
	
	@ExceptionHandler
	public String error(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
