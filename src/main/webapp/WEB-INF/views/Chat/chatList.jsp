<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Chat List</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<style>
	tr, td{
		border: 1px solid black;
	}
	#enter{
		cursor: pointer;
	}
</style>
</head>
<body>
	<div class="container">
		<table>
		<th>채팅방</th>
			<th>${user.getUserName() }</th>
			<c:choose>
				<c:when test="${roomList != null }">
					<c:forEach var="dto" items="${roomList}">
						<tr class="enter">
							<td>이미지</td>
							<td class="roomNumber">${dto.getRoomNumber() }</td>
							<td class="roomName">${dto.getRoomName() }</td>
						</tr>
					</c:forEach>
				</c:when>
				<c:otherwise>채팅방이 없습니다.</c:otherwise>
			</c:choose>
		</table>
	</div>
	
	<script>
		$(document).on("click",".enter",function(){
			var roomNumber = $(this).children(".roomNumber").text();
			location.href="/chatting/chatDetail?roomNumber="+roomNumber;
			//$("#main").load("chatDetail?roomNumber="+roomNumber);
		});
	</script>
</body>
</html>