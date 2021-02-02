<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<style>
	/* COMMON */
	*{
		box-sizing: border-box;
		padding: 0px;
		margin: 0px;
	}
	/* CONTAINER */
	.container{
		display: flex;
	}
	/* Profile */
	.profile{
		padding: 10px;	
	}
	.friend,
	.myProfile {
		display: flex;
		margin: 6px 0px;
		align-items: center;
	}
	.profileImg{
		padding-right: 6px;
	}
	.friendName {
		cursor: pointer;
	}
</style>
</head>
<body>
	<div class="container">
		<div class="profile">
			<div class="myProfile">
				<div class="profileImg user">이미지</div>
				<input type="hidden" id="userId" value=${user.getUserId() }>
				<div id="userName">${user.getUserName() }</div>
			</div>
			<div class="otherProfile">
				<c:choose>
					<c:when test="${friendList != null }">
						<c:forEach var="dto" items="${friendList }">
							<div class="friend">
								<div class="profileImg other">이미지</div>
								<div class="friendName">${dto.getFriendName() }</div>
								<input type="hidden" value="${dto.getFriendId() }" class="friendId">				
							</div>
						</c:forEach>
					</c:when>
					<c:otherwise>
						<div>친구가 없습니다!</div>
					</c:otherwise>
				</c:choose>
			</div>
			<div class="btn">
				<div class="searchInput">
					<input type="text" id="inputTxt" palceholder="검색할 친구의 아이디를 입력해주세요.">
					<input type="button" id="inputBtn" value="검색">
				</div>
				<div id="goChatList">chatList</div>
			</div>
		</div>
		<div id="main"></div>
	</div>
	
	<script>
	$(document).on("dblclick",".friend",function(){
		var userId = $("#userId").val();
		var friendId = $(this).children(".friendId").val();
		var userName = $("#userName").text();
		var friendName = $(this).children(".friendName").text();
		// console.log(userId + ":" + userName + ":" + friendId + ":" + friendName);
		// location.href="/chatting/roomCheck?userId="+userId+"&friendId="+friendId+"&userName="+userName+"&friendName="+friendName;
		$("#main").load("roomCheck?userId="+userId+"&friendId="+friendId+"&userName="+userName+"&friendName="+friendName);
	 });
	
	$("#inputBtn").on("click",function(){
		var searchId = $("#inputTxt").val();
		$("#main").load("searchFriend?searchId="+searchId);
	});
	
	$("#goChatList").on("click",function(){
		$("#main").load("chatList");
	});
	
	</script>
</body>
</html>