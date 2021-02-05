<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Chat</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.3.0/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://kit.fontawesome.com/a24c081181.js" crossorigin="anonymous"></script>
<style>
	*{
		box-sizing: border-box;
		padding: 0px;
		margin: 0px;
	}
	.container>div{
		border: 1px solid black;
	}
	.contents .me{
		text-align: right;
	}
	.contents .others{
		text-align: left;
	}
	.etc{
		display: flex;
		justify-content: space-around;
	}
</style>
</head>
<body>
	<div class="container">
		<input type="text" id="userId" value="${userId }">
		<input type="text" id="roomNumber" value="${roomNumber }">
		<div class="contents">
			<c:if test="${list != null }">
				<c:forEach var="dto" items="${list}">
					<c:choose>
						<c:when test="${dto.getUserId() == userId}">
							<div class="me">${dto.getMessage() }</div>
						</c:when>
						<c:otherwise>
							<div class="others">${dto.getUserId() } : ${dto.getMessage() }</div>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</c:if>
		</div>
		<div class="etc">
			<div id="fileWrapper">
				<i class="far fa-file-alt" id="fileIcon"></i>
				<form name="signform" id="signform" method="POST" ENCTYPE="multipart/form-data" action="">
    				<input type="file" id="file" name="file" style="display:none;" onchange="upload()" >
				</form>	
			</div>
			<div id="img"><i class="far fa-file-image"></i></div>
			<div id="codeblock"><i class="fas fa-code"></i></div>
		</div>
		<div class="sendMsg">
			<input type="text" id="message">
			<button id="send">Send</button>
		</div>
	</div>
	
	<script>
		var socket = new SockJS("/wechat"); // 엔드포인트 주소 넣기
		var client = Stomp.over(socket); // 연결 이후 작업 처리하는 코드
		
		client.connect({},function(resp){ // {}는 헤더정보 없으면  빈 칸
			console.log(resp);
			var roomNumber = $("#roomNumber").val();
			client.subscribe("/topic/chat/"+roomNumber,function(msg){ // 구독할 url 넣기
				var result = JSON.parse(msg.body);
				if(result.userId == $("#userId").val()){
					$(".contents").append("<p class='me'>"+result.message+"</p>");
				}else{
					$(".contents").append("<p class='others'>"+result.userId+" : "+result.message+"</p>");
				}
			});
			client.subscribe("/topic/file/"+roomNumber,function(msg){ // 구독할 url 넣기
				var result = JSON.parse(msg.body);
				if(result.userId == $("#userId").val()){
					$(".contents").append("<p class='me'><a href='/chatting/download?seq="+result.seq+"&oriName="+result.oriName+"&savedName="+result.savedName+"&roomNumber="+result.roomNumber+"&uploadDate="+result.uploadDate+"'>"+result.oriName+"</a></p>");
				}else{
					$(".contents").append("<p class='others'><a href='/chatting/download?seq="+result.seq+"&oriName="+result.oriName+"&savedName="+result.savedName+"&roomNumber="+result.roomNumber+"&uploadDate="+result.uploadDate+"'>"+result.oriName+"</a></p>");
				}
			});
		});
		
		$("#send").on("click",function(){
			var userId = $("#userId").val();
			var msg = $("#message").val();
			var roomNumber = $("#roomNumber").val();
			$("#message").val("");
			client.send("/app/chat",{},JSON.stringify({userId:userId,message:msg,roomNumber:roomNumber})); // 세번째 인자값은 보내려는 메세지(String 혹은 json 형태로)
		});
		
		$("#fileIcon").on("click",function(){
			 $('#file').click();
		});
		
		function upload(){
			var roomNumber = $("#roomNumber").val();
			var userId = $("#userId").val();
			var formData = new FormData($("#signform")[0]);
			formData.append("file", $("#file")[0].files[0]);
			
			$.ajax({
				type: 'POST', 
				url: '/chatting/upload?roomNumber='+roomNumber+'&userId='+userId, 
				processData: false, // 필수 
				contentType: false, // 필수 
				data: formData, 
				success: function(data) { console.log("success!")}
			});
		}
		
		$(document).on("click","#download",function(){
			var savedName = $(this).children(".savedName").val();
			console.log(savedName);
			$.ajax({
				type: 'POST', 
				url: '/chatting/download',
				data: {savedName: savedName}, 
				success: function(data) { console.log("success!")}
			});
		});
	</script>
</body>
</html>