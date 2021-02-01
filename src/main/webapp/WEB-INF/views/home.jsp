<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<input type=button id=enroll value=재학증명서>
<input type=button id=graduate value=졸업증명서>
<input type=button id=payment value= "납부 영수증">
<input type=button id=transcript value=성적증명서>
<input type=button id=free value=자유게시판>

<!-- 채팅을 위해 임시 아이디 생성 -->
<input id="userId" type="text" placeholder="채팅을 위한 임시아이디 입력하고 버튼클릭시 채팅으로 이동">
<input type="button" value="send" id="sendBtn">
</body>
<script>
	document.getElementById("enroll").onclick=function(){
		location.href="/certification/enrollment"
	}
	document.getElementById("graduate").onclick=function(){
		location.href="/certification/graduate"
	}
	document.getElementById("payment").onclick=function(){
		location.href="/certification/payment"
	}
	document.getElementById("transcript").onclick=function(){
		location.href="/certification/transcript"
	}
	document.getElementById("free").onclick=function(){
		location.href="/free/boardList"
	}
	
	document.getElementById("sendBtn").onclick = function(){
		let userId = document.getElementById("userId").value;
		location.href="/chatting/chatHome?userId="+userId;
	}
</script>
</html>