<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Search Friend</title>
<style>
	.searchOutput .profile{
		display: flex;
	}
</style>
</head>
<body>
	<div class="container">
		<div class="searchOutput">
			<c:choose>
				<c:when test="${list !=null}">
					<c:forEach var="dto" items="${list }">
						<c:if test="${dto.getUserId() != userId }">
							<div class="profile">
							<div>이미지</div>
							<div class="friendId">${dto.getUserId() }</div>
							<div class="friendName">${dto.getUserName() }</div>
							<input type="button" class="add" value="+">
							</div>
						</c:if>
					</c:forEach>
				</c:when>
				<c:otherwise>검색결과가 없습니다.</c:otherwise>
			</c:choose>
		</div>
	</div>
	
	<script>
		$(document).on("click",".add",function(){
			var parent = $(this).parent();
			var friendId = parent.children(".friendId").text();
			var friendName = parent.children(".friendName").text();
			var userName = $("#userName").text();
			$.ajax({
				url: "/chatting/friendAdd",
				type: "get",
				data: {friendId:friendId,friendName:friendName,userName:userName},
				dataType: "json"
			}).done(function(resp){
				alert(resp.msg);
			});
		});
	</script>
</body>
</html>