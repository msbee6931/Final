//XJS=lib_schedulerv2.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        /**
        * @description 	    	: 스케줄러 초기화 함수
        * @param objGraphics  	: 스케줄러 설정할 Graphics Component
        * @param objConfig   	: 초기화 설정 값
        * @return           	: 없음
        */
        this.gfnInitScheduler = function(objGraphics, objConfig)
        {
        	//Graphics 컴포넌트에 config 정보 추가
        	objGraphics.config = objConfig;

        	//스케줄러 설정 함수 호출
        	this.gfnSetScheduler(objGraphics);

        }

        /**
        * @description 	    	: 스케줄러 설정 함수
        * @param objGraphics  	: 스케줄러 설정할 Graphics Component
        * @param objDate	   	: 설정할 일자 오브젝트
        * @return           	: 없음
        */
        this.gfnSetScheduler = function(objGraphics, objDate)
        {
        	var i, j;

        	var nRightGap = 0;
        	var nBottomGap = 0;

        	//스케줄러 설정 정보 가져오기
        	var objConfig = objGraphics.config;

        	var objWeek;
        	var objWeekText;
        	var objWeekGroup;

        	//요일 영역 설정정보 가져오기
        	var objWeekConfig = objConfig.week;

        	//요일 영역 배경 설정 정보 가져오기
        	var objWeekRectProp = objWeekConfig.graphicsrect;

        	//요일 영역 텍스트 설정 정보 가져오기
        	var objWeekTextProp = objWeekConfig.graphicstext;

        	//요일 표현 텍스트 리스트 가져오기
        	var arrWeekFormat = objWeekConfig.weekformat;

        	//요일영역 Left 좌표 초기화
        	var nWeekGroupLeft = 0;

        	//요일영역 Top 좌표 초기화
        	var nWeekGroupTop = 0;

        	//요일영역 Width 값 초기화
        	//(스케줄러 Width를 7로 나눠서 사용)
        	var nWeekGroupWidth = nexacro.floor(objGraphics.getOffsetWidth()/7);

        	//요일영역 Height 값 가져오기
        	var nWeekGroupHeight = objWeekConfig.height;

        	//일자 영역 오브젝트
        	var objDay;

        	//일자 영역 텍스트 오브젝트
        	var objDayText;

        	//일자 그룹 영역 오브젝트
        	var objDayGroup;

        	//일정 그룹 영역 오브젝트
        	var objScheduleGroup;

        	//일자 영역 설정 정보 가져오기
        	var objDayConfig = objConfig.day;

        	//일자 영역 배경 설정 정보 가져오기
        	var objDayRectProp = objDayConfig.graphicsrect;

        	//일자 영역 텍스트 설정 정보 가져오기
        	var objDayTextProp = objDayConfig.graphicstext;

        	//일자 영역 Left 좌표 초기화
        	var nDayGroupLeft = 0;

        	//일자 영역 Top 좌표 초기화
        	var nDayGroupTop = 0;

        	//일자 Left 좌표 초기화
        	var nDayLeft = 0;

        	//일자 Top 좌표 초기화
        	var nDayTop = 0;

        	//일자 Width 값 초기화(요일영역과 동일)
        	var nDayWidth = nWeekGroupWidth;

        	//일자 Height 값
        	var nDayHeight;

        	//스케줄러 상에 일자 위치를 설정하기 위한 변수
        	var nDayPos;

        	//일자의 전체 값(yyyyMMdd)
        	var sFullDate;

        	//텍스트 색상 값
        	var sTextColor;

        	//GraphicsGroup Property를 설정하기 위한 변수
        	var objProperties;

        	//파라미터로 넘어온 일자 오브젝트가 없을 경우
        	if(!objDate)
        	{
        		//스케줄러에 설정된 표현일자가 없을 경우
        		//오늘날짜 기준으로 설정
        		if(!objGraphics.config.date)
        		{
        			objDate = new Date();
        			objGraphics.config.date = objDate;
        			objGraphics.config.todate = objDate;
        		}
        		//스케줄러에 설정된 포현일자가 있을 경우
        		else
        		{
        			//스케줄러의 표현일자로 설정
        			objDate = objGraphics.config.date;
        		}
        	}

        	//설정할 년월 값 가져오기
        	var sYearMonth = this.gfnGetMaskFormatDateToString(objDate, "yyyyMM");

        	//설정할 년월의 시작일자 설정하기
        	var sFirstDate = sYearMonth + "01";

        	//시작일자를 Date 오브젝트로 만들기
        	var objFirstDate = this.gfnStrToDate(sFirstDate);

        	//시작일자의 요일 값 가져오기(0~6)
        	var nFirstDay = objFirstDate.getDay();

        	//스케줄러에 표현될 주(Week) 갯수
        	var nWeekCount = this.gfnGetCountWeeksInMonth(sYearMonth);

        	//시작일자를 설정값 현재 표현일자에 설정하기
        	objConfig.date = objFirstDate;

        	//Graphics 컴포넌트 초기화
        	objGraphics.clear();

        	//요일 영역 GraphicsGroup 오브젝트 만들기
        	objProperties = { "x" : nWeekGroupLeft, "y" : nWeekGroupTop };
        	objWeekGroup = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        	for(i=0;i<7;i++)
        	{
        		//마지막 요일일 경우
        		if(i==6)
        		{
        			//Graphics 컴포넌트 Right와 마지막 요일 영역의 Width를 맞추기 위한 계산
        			//Graphics 컴포넌트 Width - 마지막 요일의 Right - 요일의 Border값(1px)
        			nRightGap = objGraphics.getOffsetWidth() - (nWeekGroupLeft+nWeekGroupWidth) - 1;
        		}

        		//요일 배경의 Left 좌표 설정
        		objWeekRectProp.x = nWeekGroupLeft;

        		//요일 배경의 Top 좌표 설정
        		objWeekRectProp.y = nWeekGroupTop;

        		//요일 배경의 Width값 설정
        		objWeekRectProp.width = nWeekGroupWidth + nRightGap;

        		//요일 배경의 Height값 설정
        		objWeekRectProp.height = nWeekGroupHeight;

        		//요일 배경 오브젝트 만들기
        		objWeek = this.gfnSetGraphicProperties("GraphicsRect", objWeekRectProp);

        		//요일 그룹에 요일 배경 추가
        		objWeekGroup.addChild("week_"+i, objWeek);

        		//요일 텍스트 Left 좌표 설정
        		//중앙에 표시될 수 있도록 Center 좌표값 구하기
        		objWeekTextProp.x = nWeekGroupLeft + nWeekGroupWidth/2;

        		//요일 텍스트 Top 좌표 설정
        		//중앙에 표시될 수 있도록 Center 좌표값 구하기
        		objWeekTextProp.y = nWeekGroupTop + nWeekGroupHeight/2;

        		//요일 텍스트의 텍스트 설정
        		objWeekTextProp.text = arrWeekFormat[i];

        		//요일 텍스트 오브젝트 만들기
        		objWeekText = this.gfnSetGraphicProperties("GraphicsText", objWeekTextProp);

        		//요일 그룹에 요일 텍스트 오브젝트 추가
        		objWeekGroup.addChild("week_"+i+"_text", objWeekText);

        		//다음 요일의 Left 좌표 설정
        		nWeekGroupLeft += nWeekGroupWidth;
        	}

        	//요일 그룹을 Graphics 컴포넌트에 추가
        	objGraphics.addChild("weekgroup", objWeekGroup);

        	//일자 영역의 Top 좌표 설정
        	nDayGroupTop = nWeekGroupTop + nWeekGroupHeight;

        	//일자 영역 GraphicsGroup 오브젝트 만들기
        	objProperties = { "x" : nDayGroupLeft, "y" : nDayGroupTop };
        	objDayGroup = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        	//일정 영역 GraphicsGroup 오브젝트 만들기
        	objProperties = { "x" : nDayGroupLeft, "y" : nDayGroupTop };
        	objScheduleGroup = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        	//일자 Top 좌표 설정
        	nDayTop = 0;

        	//일자 Width 값 설정
        	nDayWidth = nWeekGroupWidth;

        	//일자 Height 값 설정
        	//(Graphics 컴포넌트의 Height - 요일영역의 Height)/ 표현될 주(Week) 갯수
        	nDayHeight = nexacro.floor((objGraphics.getOffsetHeight()-nWeekGroupHeight)/nWeekCount);

        	for(i=0;i<nWeekCount;i++)
        	{
        		//일자 Left 초기화
        		nDayLeft = 0;

        		//주차별 마지막 일자 오른쪽 여백 값 초기화
        		nRightGap = 0;

        		//마지막주차일 경우
        		if(i==nWeekCount-1)
        		{
        			//Graphics 컴포넌트 Bottom와 마지막 주차 영역의 Height를 맞추기 위한 계산
        			//Graphics 컴포넌트 Height - 마지막 주차의 Bottom - 일자의 Border값(1px)
        			nBottomGap = objGraphics.getOffsetHeight() - (nDayGroupTop + nDayTop + nDayHeight) - 1;
        		}

        		for(j=0;j<7;j++)
        		{
        			//설정할 일자의 위치값
        			//이전월의 일자, 다음월의 일자를 처리하기 위함
        			nDayPos = (i*7) + j - nFirstDay;

        			//설정할 일자 계산
        			objDate = this.gfnAddDate(objFirstDate, nDayPos);

        			//설정할 일자의 전체 값(yyyyMMdd)
        			sFullDate = this.gfnGetMaskFormatDateToString(objDate, "yyyyMMdd");

        			//마지막 요일에 해당하는 일자일 경우
        			if(j==6)
        			{
        				//Graphics 컴포넌트 Right와 마지막 요일 영역의 Width를 맞추기 위한 계산
        				//Graphics 컴포넌트 Width - 마지막 요일의 Right - 요일의 Border값(1px)
        				nRightGap = objGraphics.getOffsetWidth() - (nDayLeft+nDayWidth) - 1;
        			}

        			//일자 GraphicsGroup 오브젝트 만들기
        			objProperties = {
        								"x" : nDayLeft, "y" : nDayTop
        							};
        			objDay = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        			//일자 배경의 Width값 설정
        			objDayRectProp.width = nDayWidth + nRightGap;

        			//일자 배경의 Height값 설정
        			objDayRectProp.height = nDayHeight + nBottomGap;

        			//일자 배경 오브젝트 만들기
        			objDayBg = this.gfnSetGraphicProperties("GraphicsRect", objDayRectProp);

        			//일자 GraphicsGroup에 일자 배경 오브젝트 추가
        			objDay.addChild("day_bg", objDayBg);

        			//일자 텍스트 색상 가져오기
        			//일요일, 토요일, 이전월 or 이후월 일자, 현재월 일자
        			if(objDate.getMonth()!=objFirstDate.getMonth())sTextColor = objConfig.day.textcolor_disable;
        			else if(objDate.getDay()==0)sTextColor = objConfig.day.textcolor_sun;
        			else if(objDate.getDay()==6)sTextColor = objConfig.day.textcolor_sat;
        			else sTextColor = objConfig.day.textcolor;

        			//일자 텍스트 Left 좌표 설정(일자 영역 기준 오른쪽 정렬로 보이도록 설정)
        			//일자 배경 Width - 패딩(5px)
        			objDayTextProp.x = nDayWidth - 5;

        			//일자 텍스트 Top 좌표 설정
        			//패딩(5px)
        			objDayTextProp.y = 5;

        			//일자 텍스트의 텍스트 값 설정
        			objDayTextProp.text = objDate.getDate();

        			//일자 텍스트 색상 설정
        			objDayTextProp.color = sTextColor;

        			//일자 텍스트 오브젝트 만들기
        			objDayText = this.gfnSetGraphicProperties("GraphicsText", objDayTextProp);

        			//일자 GraphicGroup에 일자 텍스트 오브젝트 추가
        			objDay.addChild("day_text", objDayText);

        			//일자 그룹에 일자 오브젝트 추가
        			objDayGroup.addChild("day_"+sFullDate, objDay);

        			//다음 일자의 Left 좌표 값 설정
        			nDayLeft += nDayWidth;
        		}

        		//다음 일자의 Top 좌표 값 설정
        		nDayTop += nDayHeight;
        	}

        	//일자 그룹을 Graphics 컴포넌트에 추가
        	objGraphics.addChild("daygroup", objDayGroup);

        	//일정 그룹을 Graphics 컴포넌트에 추가
        	objGraphics.addChild("schedulegroup", objScheduleGroup);

        	//Graphics 컴포넌트 다시그리기
        	objGraphics.redraw();

        	//스케줄 조회 함수 호출
        	this.gfnLoadScheduler(objGraphics);
        }

        /**
        * @description 	    	: 스케줄 조회 함수
        * @param objGraphics  	: 설정할 Graphics Component
        * @return           	: 없음
        */
        this.gfnLoadScheduler = function(objGraphics)
        {
        	var i;

        	//스케줄러 설정 정보 가져오기
        	var objConfig = objGraphics.config;

        	//스케줄러와 연결된 데이터셋 가져오기
        	var objDs = objConfig.binddataset;

        	//일정 ID
        	var sId;

        	//일정 일자
        	var sSDate;

        	//일정 일자
        	var sEDate;

        	//일정 타이틀
        	var sTitle;

        	//일정 타입
        	var sType;

        	//현재 일자
        	var sTargetDate;

        	//일자 오브젝트
        	var objDay;

        	//일자 그룹 오브젝트 가져오기
        	var objDayGroup = objGraphics.getObjectByID("daygroup").getObjects();

        	var objScheduleGroup = objGraphics.getObjectByID("schedulegroup");

        	//일정 설정 정보 가져오기
        	var objScheduleConfig = objConfig.schedule;

        	//일정 타입별 배경색 정보 가져오기
        	var objScheduleType = objScheduleConfig.type;

        	//일정 배경 속성 정보
        	var objScheduleRectProp;

        	//일정 텍스트 속성 정보
        	var objScheduleTextProp;

        	var objSchedule;
        	var objSchedules;
        	var objScheduleBg;
        	var objScheduleText;

        	//일정 Left 좌표 초기화
        	var nLeft = 0;

        	//일정 Top 좌표 초기화 값
        	var nTopDef = objConfig.week.height;

        	//일정 Top 좌표 초기화
        	var nTop = 0;

        	var nWidth;

        	//일정 Height 값 초기화
        	var nHeight = objScheduleConfig.height;

        	//일정 Gap 값 초기화
        	var nGap = objScheduleConfig.gap;

        	var nDayWidth;
        	var nDayHeight;

        	//스케줄러에 표현된 일자 갯수(이전, 이후 월 일자 포함
        	var nDayCount = objDayGroup.length;

        	//스케줄 갯수
        	var nScheduleCount;

        	//성능향상을 위해 데이터셋 Enable Event False 시작
        	objDs.set_enableevent(false);

        	//스케줄러 시작일자 구하기
        	var sStartDate = objDayGroup[0].id.split("_")[1];

        	//스케줄러 종료일자 구하기
        	var sEndDate = objDayGroup[objDayGroup.length-1].id.split("_")[1];

        	//일정 그룹 영역 초기화
        	objScheduleGroup.clear();

        	//현재 스케줄러 기간에 포함된 일정 데이터 가져오기
        	objDs.filter("!((sdate<'"+sStartDate+"'&&edate<'"+sStartDate+"')||"+"(sdate>'"+sEndDate+"'&&edate>'"+sEndDate+"'))");

        	for(i=0;i<objDs.rowcount;i++)
        	{
        		//일정 데이터 가져오기
        		sSeq=onjDs.getColumn(i,"seq");
        		sId = objDs.getColumn(i, "id");
        		sSDate = objDs.getColumn(i, "sdate");
        		sEDate = objDs.getColumn(i, "edate");
        		sTitle = objDs.getColumn(i, "title");
        		sType = objDs.getColumn(i, "type");

        		//일정의 시작일이 현재 스케줄러 시작일 보다 클경우
        		//스케줄러 시작일로 설정
        		if(sSDate<sStartDate)sSDate = sStartDate;

        		//일정의 종료일이 현재 스케줄러 종료일 보다 클경우
        		//스케줄러 종료일로 설정
        		if(sEDate>sEndDate)sEDate = sEndDate;

        		//일정의 기간 구하기
        		var nDays = this.gfnGetDiffDay(sSDate, sEDate)+1;

        		//시작일의 일자 오브젝트 가져오기
        		objSDay = objGraphics.getObjectByID("day_"+sSDate);

        		//일정의 기간만큼 Loop 실행
        		for(var j=0;j<nDays;j++)
        		{
        			//현재 Loop 일자 가져오기
        			sEDate = this.gfnAddDate(sSDate, j);

        			//현재 Loop 일자의 일자 오브젝트 가져오기
        			objEDay = objGraphics.getObjectByID("day_"+sEDate);

        			//현재 Loop 일자가 현재 주차의 마지막 일자일 경우
        			//또는 일정의 마지막 일자일 경우
        			//시작일자부터 현재 일자까지 일정 오브젝트 만들기
        			if((objEDay.getRect().left+objEDay.getRect().width) == objGraphics.getOffsetWidth()||j==nDays-1)
        			{
        				//일정 배경 정보 가져오기
        				objScheduleRectProp = objScheduleConfig.graphicsrect;

        				//일정 텍스트 정보 가져오기
        				objScheduleTextProp = objScheduleConfig.graphicstext;

        				//시작일자의 Left값 가져오기(Border처리를 위해 +1)
        				nLeft = objSDay.getRect().left + 1;

        				//일정표현이 가능한 Top값 구하는 함수 호출
        				nTop = this.gfnGetScheduleTop(objGraphics, objSDay, objEDay);

        				//일정을 표현할 수 있을 경우
        				if(nTop!=-1)
        				{
        					//일정의 Width값 구하기
        					//마지막일자 Left + Width - 시작일자 Left - (Border처리를 위한 -1)
        					nWidth = objEDay.getRect().left + objEDay.getRect().width - nLeft - 1;

        					//일정의 Left, Top, Width, Height값 설정
        					objScheduleRectProp.x = nLeft;
        					objScheduleRectProp.y = nTop;
        					objScheduleRectProp.width = nWidth;
        					objScheduleRectProp.height = nHeight;

        					//일정 타입에 따른 일정 배경의 FillStyle 값 설정
        					objScheduleRectProp.fillstyle = objScheduleType[sType];

        					//일정 배경 오브젝트 만들기
        					objScheduleBg = this.gfnSetGraphicProperties("GraphicsRect", objScheduleRectProp);

        					//일정에 일정 배경 오브젝트 추가
        					objScheduleGroup.addChild("schedule_"+sId+"_bg_"+j, objScheduleBg);

        					//일정 텍스트 Left 좌표 설정
        					objScheduleTextProp.x = nLeft + 5;

        					//일정 텍스트 Top 좌표 설정
        					objScheduleTextProp.y = nTop + nHeight/2;

        					//일정 텍스트의 텍스트 값 설정
        					objScheduleTextProp.text = sTitle;

        					//일정 텍스트 오브젝트 만들기
        					objScheduleText = this.gfnSetGraphicProperties("GraphicsText", objScheduleTextProp);

        					//일정에 일정 텍스트 오브젝트 추가
        					objScheduleGroup.addChild("schedule_"+sId+"_text_"+j, objScheduleText);
        				}
        				//일정을 표현할 수 없을 경우 More버튼 만들기
        				else
        				{
        					//More버튼 만들기 함수 호출
        					this.gfnLoadMore(objGraphics, objSDay, objEDay);
        				}

        				//현재 Loop 일자의 다음일자(다음 주차의 시작일)를 시작일자 오브젝트로 설정
        				objSDay = objGraphics.getObjectByID("day_"+this.gfnAddDate(sSDate, j+1));
        			}
        		}

        		//Graphics 컴포넌트 다시그리기
        		objGraphics.redraw();
        	}

        	//성능향상을 위해 데이터셋 Enable Event False 종료
        	objDs.set_enableevent(true);

        }

        /**
        * @description 	    	: More버튼 만들기 함수
        * @param objGraphics  	: 설정할 Graphics Component
        * @param objSDay  		: More버튼을 만들기 시작할 일자 오브젝트
        * @param objEDay  		: More버튼을 만들기 종료할 일자 오브젝트
        * @return           	: 없음
        */
        this.gfnLoadMore = function(objGraphics, objSDay, objEDay)
        {
        	//스케줄러 설정 정보 가져오기
        	var objConfig = objGraphics.config;

        	//더보기 설정 정보 가져오기
        	var objMoreConfig = objConfig.more;

        	//더보기 배경 속성 정보
        	var objMoreRectProp;

        	//더보기 텍스트 속성 정보
        	var objMoreTextProp;

        	//더보기 Height 값 가져오기
        	var nMoreHeight = objMoreConfig.height;

        	//일정 Top 좌표 초기화 값
        	var nTopDef = objConfig.week.height;

        	//시작일자 가져오기
        	var sSDate = objSDay.id.split("_")[1];

        	//종료일자 가져오기
        	var sEDate = objEDay.id.split("_")[1];

        	//일정의 기간 구하기
        	var nDays = this.gfnGetDiffDay(sSDate, sEDate)+1;

        	//현재 일자
        	var sTargetDate;

        	//현재 일자 오브젝트
        	var objTargetDay;

        	//위치 정보 오브젝트
        	var objRect;

        	var nX, nY, nWidth, nHeight;

        	//일정 그룹 오브젝트 가져오기
        	var objScheduleGroup = objGraphics.getObjectByID("schedulegroup");

        	//현재 기간 만큼 Loop 실행
        	for(var i=0;i<nDays;i++)
        	{
        		//현재 Loop 일자 구하기
        		sTargetDate = this.gfnAddDate(sSDate, i);

        		//현재 일자에 해당하는 More버튼이 없으면 생성
        		if(!objGraphics.getObjectByID("more_"+sTargetDate))
        		{

        			//현재 Loop 일자 오브젝트 가져오기
        			objTargetDay = objGraphics.getObjectByID("day_"+sTargetDate);

        			//현재 Loop 일자 오브젝트의 위치값 구하기
        			objRect = objTargetDay.getRect();

        			nX = objRect.left;
        			nY = objRect.top + objRect.height - nMoreHeight - nTopDef - 1;
        			nMoreWidth = objRect.width - 1;

        			//더보기 배경 속성 정보 가져오기
        			objMoreRectProp = objMoreConfig.graphicsrect;

        			//더보기 텍스트 속성 정보 가져오기
        			objMoreTextProp = objMoreConfig.graphicstext;

        			//더보기 GraphicsGroup 오브젝트 만들기
        			objProperties = {
        								"x" : nX, "y" : nY
        							};

        			objMore = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        			//더보기 배경 Width 값 설정
        			objMoreRectProp.width = nMoreWidth;

        			//더보기 배경 Height 값 설정
        			objMoreRectProp.height = nMoreHeight;

        			//더보기 배경 오브젝트 만들기
        			objScheduleBg = this.gfnSetGraphicProperties("GraphicsRect", objMoreRectProp);

        			//더보기에 더보기 배경 오브젝트 추가
        			objMore.addChild("more_bg", objScheduleBg);

        			//더보기 텍스트 Left 좌표 설정
        			objMoreTextProp.x = 5;

        			//더보기 텍스트 Top 좌표 설정
        			objMoreTextProp.y = nMoreHeight/2;

        			//더보기 텍스트 오브젝트 만들기
        			objScheduleText = this.gfnSetGraphicProperties("GraphicsText", objMoreTextProp);

        			//더보기에 더보기 텍스트 오브젝트 추가
        			objMore.addChild("more_text", objScheduleText);

        			//일자에 더보기 오브젝트 추가
        			objScheduleGroup.addChild("more_"+sTargetDate, objMore);
        		}
        	}
        }

        /**
        * @description 	    	: 더보기 일정 팝업 함수
        * @param objGraphics  	: 설정할 Graphics Component
        * @param objHitTest  	: 선택된 Graphic 오브젝트
        * @return           	: 없음
        */
        this.gfnLoadSchedulePop = function(objGraphics, objHitTest)
        {
        	//더보기 오브젝트 가져오기
        	var objMore = objHitTest.parent;

        	if(!objMore)return;

        	//일자영역 오브젝트 가져오기
        	var objTargetDay = objGraphics.getObjectByID("day_"+objMore.id.split("_")[1]);

        	if(!objTargetDay)return;

        	//일자영역 텍스트 오브젝트 가져오기
        	var objDayText = objTargetDay.getObjectByID("day_text");

        	//일자영역 위치정보 가져오기
        	var objRect = objTargetDay.getRect();

        	//더보기 팝업의 위치정보 만들기
        	var nDayLeft = objRect.left - 10;
        	var nDayTop = objRect.top - 10 - 20;
        	var nDayWidth = objRect.width + 20;
        	var nDayHeight = objRect.height + 20;

        	//설정정보 가져오기
        	var objConfig = objGraphics.config;

        	//일자 영역 설정 정보 가져오기
        	var objDayConfig = objConfig.day;

        	//일자 영역 배경 설정 정보 가져오기
        	var objDayRectProp = objDayConfig.graphicsrect;

        	//일자 영역 텍스트 설정 정보 가져오기
        	var objDayTextProp = objDayConfig.graphicstext;

        	//일정 그룹 오브젝트 가져오기
        	var objScheduleGroup = objGraphics.getObjectByID("schedulegroup");

        	//일자 GraphicsGroup 오브젝트 만들기
        	objProperties = {
        						"x" : nDayLeft, "y" : nDayTop
        					};
        	objDay = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        	//일자 배경의 Width값 설정
        	objDayRectProp.width = nDayWidth;

        	//일자 배경의 Height값 설정
        	objDayRectProp.height = nDayHeight;

        	//일자 배경 오브젝트 만들기
        	objDayBg = this.gfnSetGraphicProperties("GraphicsRect", objDayRectProp);

        	//일자 GraphicsGroup에 일자 배경 오브젝트 추가
        	objDay.addChild("day_bg", objDayBg);

        	//일자 텍스트 Left 좌표 설정(일자 영역 기준 오른쪽 정렬로 보이도록 설정)
        	//일자 배경 Width - 패딩(5px)
        	objDayTextProp.x = nDayWidth - 5;

        	//일자 텍스트 Top 좌표 설정
        	//패딩(5px)
        	objDayTextProp.y = 5;

        	//일자 텍스트의 텍스트 값 설정
        	objDayTextProp.text = objDayText.text;

        	//일자 텍스트 색상 설정
        	objDayTextProp.color = objDayText.color;

        	//일자 텍스트 오브젝트 만들기
        	objDayText = this.gfnSetGraphicProperties("GraphicsText", objDayTextProp);

        	//일자 GraphicGroup에 일자 텍스트 오브젝트 추가
        	objDay.addChild("day_text", objDayText);

        	//일자 그룹에 일자 오브젝트 추가
        	objScheduleGroup.addChild("schedulepop", objDay);

        	//해당일자의 일정 만들기 함수 호출
        	this.fnLoadScheduleByDay(objGraphics, objTargetDay);

        	//스케줄러 다시그리기
        	objGraphics.redraw();
        }

        /**
        * @description 	    	: 해당일자의 일정 만들기 함수
        * @param objGraphics  	: 설정할 Graphics Component
        * @param objHitTest  	: 해당일자 오브젝트
        * @return           	: 없음
        */
        this.fnLoadScheduleByDay = function(objGraphics, objTargetDay)
        {

        	//스케줄러 설정 정보 가져오기
        	var objConfig = objGraphics.config;

        	//스케줄러와 연결된 데이터셋 가져오기
        	var objDs = objConfig.binddataset;

        	//일정 Top 좌표 초기화 값
        	var nTopDef = objConfig.week.height;

        	//일정 설정 정보 가져오기
        	var objScheduleConfig = objConfig.schedule;

        	//일정 타입별 배경색 정보 가져오기
        	var objScheduleType = objScheduleConfig.type;

        	//일정 배경 속성 정보
        	var objScheduleRectProp;

        	//일정 텍스트 속성 정보
        	var objScheduleTextProp;

        	//일정 Gap 값 초기화
        	var nGap = objScheduleConfig.gap;

        	//일정 ID
        	var sId;

        	//일정 일자
        	var sSDate;

        	//일정 일자
        	var sEDate;

        	//일정 타이틀
        	var sTitle;

        	//일정 타입
        	var sType;

        	// 현재 일자 가져오기
        	var sDate = objTargetDay.id.split("_")[1];

        	//일정 그룹 오브젝트 가져오기
        	var objSchedulePop = objGraphics.getObjectByID("schedulepop");

        	//일정 위치 정보 설정
        	var nLeft;
        	var nTop = nTopDef;
        	var nWidth = objSchedulePop.getRect().width;
        	var nHeight = objScheduleConfig.height;

        	//현재 일자에 해당하는 일정 정보 가져오기
        	objDs.filter("!((sdate<'"+sDate+"'&&edate<'"+sDate+"')||"+"(sdate>'"+sDate+"'&&edate>'"+sDate+"'))");

        	//일정의 갯수만큼 Loop
        	for(var i=0;i<objDs.rowcount;i++)
        	{
        		//일정 배경 정보 가져오기
        		objScheduleRectProp = objScheduleConfig.graphicsrect;

        		//일정 텍스트 정보 가져오기
        		objScheduleTextProp = objScheduleConfig.graphicstext;

        		//일정 데이터 가져오기
        		sId = objDs.getColumn(i, "id");
        		sSDate = objDs.getColumn(i, "sdate");
        		sEDate = objDs.getColumn(i, "edate");
        		sTitle = objDs.getColumn(i, "title");
        		sType = objDs.getColumn(i, "type");

        		//일정 GraphicsGroup 오브젝트 만들기
        		objProperties = {
        						"x" : 0, "y" : nTop + nGap
        				};

        		objSchedule = this.gfnSetGraphicProperties("GraphicsGroup", objProperties);

        		//일정 배경 오브젝트 만들기 함수 호출
        		objScheduleBg = this.gfnLoadScheduleBg(sDate, sSDate, sEDate, nWidth, nHeight, objScheduleType[sType], objScheduleRectProp);

        		//일정에 일정 배경 오브젝트 추가
        		objSchedule.addChild("schedule_"+sId+"_bg", objScheduleBg);

        		//일정 텍스트 Left 좌표 설정
        		objScheduleTextProp.x = 15;

        		//일정 텍스트 Top 좌표 설정
        		objScheduleTextProp.y = nHeight/2;

        		//일정 텍스트의 텍스트 값 설정
        		objScheduleTextProp.text = sTitle;

        		//일정 텍스트 오브젝트 만들기
        		objScheduleText = this.gfnSetGraphicProperties("GraphicsText", objScheduleTextProp);

        		//일정에 일정 텍스트 오브젝트 추가
        		objSchedule.addChild("schedule_"+sId+"_text", objScheduleText);

        		//일자에 일정 오브젝트 추가
        		objSchedulePop.addChild(sId, objSchedule);

        		//다음 일정의 Top 좌표 설정
        		nTop = objSchedule.y+objScheduleRectProp.height;
        	}

        	//일정 팝업 배경 오브젝트 가져오기
        	var objPopBg = objSchedulePop.getObjectByID("day_bg");

        	//배경오브젝트가 일정 오브젝트들 보다 작을 경우
        	//일정 오브젝트에 맞춰 사이즈 변경
        	if(objPopBg.height < nTop + nGap)objPopBg.set_height(nTop + nGap);

        	//일정팝업이 스케줄러 보다 좌측에 표현될 경우 Left 0으로 보정
        	if(objSchedulePop.x<0)objSchedulePop.set_x(0);

        	//일정 팝업이 스케줄러보다 우측에 표현될 경우 Right 0으로 보정
        	if(nexacro.toNumber(objSchedulePop.x) + nexacro.toNumber(objPopBg.width) > objGraphics.getOffsetWidth())objSchedulePop.set_x(objGraphics.getOffsetWidth() - objPopBg.width-1);

        	//일정 팝업이 스케줄러보다 하단에 표현될 경우 Bottom 0으로 보정
        	if((nexacro.toNumber(objSchedulePop.y) + nexacro.toNumber(objPopBg.height)) + nTopDef > objGraphics.getOffsetHeight())objSchedulePop.set_y(objGraphics.getOffsetHeight() - objPopBg.height - nTopDef - 1);
        }

        /**
        * @description 	    			: 일정 배경 오브젝트 만들기 함수
        * @param sDate		  			: 일정 팝업 일자
        * @param sSDate  				: 일정 시작 일자
        * @param sEDate  				: 일정 종료 일자
        * @param nWidth  				: 일정 팝업 Width
        * @param nHeight  				: 일정 height
        * @param sFillStyle  			: 일정 FillStyle
        * @param objScheduleRectProp	: 일정 배경 설정 값
        * @return objScheduleBg			: 일정 배경 오브젝트
        */

        this.gfnLoadScheduleBg = function(sDate, sSDate, sEDate, nWidth, nHeight, sFillStyle, objScheduleRectProp)
        {
        	//일정 배경 x, y 초기화
        	objScheduleRectProp.x = 0;
        	objScheduleRectProp.y = 0;

        	//일정 배경 FillStyle 적용
        	objScheduleRectProp.fillstyle = sFillStyle;

        	//일정 배경 오브젝트 만들기
        	var objScheduleBg = this.gfnSetGraphicProperties("GraphicsPath", objScheduleRectProp);

        	//일정 시작일자가 일정 팝업 일자보다 작을 경우
        	if(this.gfnGetDiffDay(sDate, sSDate)!=0)
        	{
        		// < 모양 만들기
        		objScheduleBg.moveTo(10, nHeight);
        		objScheduleBg.lineTo(0, nHeight/2);
        		objScheduleBg.lineTo(10, 0);
        	}
        	//일정 시작일자와 일정 팝업일자가 동일할 경우
        	else
        	{
        		// | 모양 만들기
        		objScheduleBg.moveTo(10, nHeight);
        		objScheduleBg.lineTo(10, 0);
        	}

        	objScheduleBg.lineTo(nWidth-10, 0);

        	//일정 종료일자가 일정 팝업 일자보다 클 경우
        	if(this.gfnGetDiffDay(sDate, sEDate)!=0)
        	{
        		// > 모양 만들기
        		objScheduleBg.lineTo(nWidth-3, nHeight/2);
        		objScheduleBg.lineTo(nWidth-10, nHeight);
        	}
        	//일정 종료일자가 일정 팝업 일자와 같을 경우
        	else
        	{
        		// | 모양 만들기
        		objScheduleBg.lineTo(nWidth-10, nHeight);
        	}

        	objScheduleBg.lineTo(10, nHeight);

        	//일정 배경 오브젝트 리턴
        	return objScheduleBg;
        }

        /**
        * @description 	    			: 일정표현이 가능한 Top값 구하는 함수
        * @param objGraphics  			: 설정할 Graphics Component
        * @param objSDay  				: 시작 일자 오브젝트
        * @param objEDay  				: 종료 일자 오브젝트
        * @return nTargetTop			: Top 좌표 값
        */
        this.gfnGetScheduleTop = function(objGraphics, objSDay, objEDay)
        {
        	//스케줄러 설정 정보 가져오기
        	var objConfig = objGraphics.config;

        	//일정 설정 정보 가져오기
        	var objScheduleConfig = objConfig.schedule;

        	//일정 Top 좌표 초기화 값
        	var nTopDef = objConfig.week.height;

        	//일정 Gap 값 초기화
        	var nGap = objScheduleConfig.gap;

        	//일정 Height 값 초기화
        	var nHeight = objScheduleConfig.height;

        	//더보기 설정 정보 가져오기
        	var objMoreConfig = objConfig.more;

        	//더보기 Height 값 가져오기
        	var nMoreHeight = objMoreConfig.height;

        	//시작일자 가져오기
        	var sSDate = objSDay.id.split("_")[1];

        	//종료일자 가져오기
        	var sEDate = objEDay.id.split("_")[1];

        	//현재 일자
        	var sTargetDate;

        	//현재 일자 오브젝트
        	var objTargetDay;

        	//현재 타겟 일정 오브젝트
        	var objTargetSchedule;

        	//일정의 기간 구하기
        	var nDays = this.gfnGetDiffDay(sSDate, sEDate)+1;

        	var objRect;
        	var nLeft;
        	var nTop = 0;
        	var nTargetTop;
        	var nWidth;
        	var nHeight;
        	var nX, nY;

        	var bChk = true;

        	while(1)
        	{
        		bChk = true;

        		//기간 만큼 Loop
        		for(var i=0;i<nDays;i++)
        		{
        			//현재 Loop 일자 가져오기
        			sTargetDate = this.gfnAddDate(sSDate, i);

        			//현재 Loop 일자 오브젝트 가져오기
        			objTargetDay = objGraphics.getObjectByID("day_"+sTargetDate);

        			//현재 Loop 일자 오브젝트의 위치 정보 가져오기
        			objRect = objTargetDay.getRect();

        			//HitTest할 좌표값 구하기
        			//해당 일자 일정영역에 일정 오브젝트가 있는지 여부 확인
        			nX = objRect.left + (objRect.width/2);
        			nY = objRect.top + nTopDef + nGap + nTop;
        			objTargetSchedule = objGraphics.hitTest(nX, nY);

        			//해당좌표에 일정이 있으면 false
        			if(objTargetSchedule)if(objTargetSchedule.id.split("_")[0]=="schedule")bChk = false;
        		}

        		//다음 체크할 Top 좌표값 설정
        		nTop = nTop + 20 + nGap;

        		//다음 HitTest할 nX좌표값이 더보기버튼 표현위치보다 클 경우
        		//return -1하여 더보기 버튼 생성
        		if((nY+nHeight)>objRect.top + objRect.height - nMoreHeight)return -1;

        		//모든위치에 일정을 표현할 수 있으면 Break
        		if(bChk==true)break;
        	}

        	nTargetTop = nY - nTopDef;

        	return nTargetTop;
        }

        /**
        * @description 	    	: 해당 월의 주(Week) 갯수 구하는 함수
        * @param sYearMonth  	: 확인할 년월 텍스트(202006)
        * @return           	: 주(Week) 갯수
        */
        this.gfnGetCountWeeksInMonth = function(sYearMonth)
        {

            var nYear = nexacro.toNumber(sYearMonth.substr(0, 4));
        	var nMonth = nexacro.toNumber(sYearMonth.substr(4, 2));

            var objFirstOfMonth = new Date(nYear, nMonth-1, 1);
            var objLastOfMonth = new Date(nYear, nMonth, 0);

            var nDays = objFirstOfMonth.getDay() + objLastOfMonth.getDate();

            return nexacro.ceil( nDays / 7);
        }

        /**
        * @description 	    : Graphics 하위 오브젝트 생성 및 속성 설정 함수
        * @param sCompId  	: 오브젝트 명
        * @param jsnProps   : 오브젝트 속성 값
        * @return           : Graphics 하위 오브젝트
        */
        this.gfnSetGraphicProperties = function(sCompId, jsnProps)
        {
        	//Graphics 하위 오브젝트 생성
        	var objComp = new nexacro[sCompId];
        	var objFunc;
        	var sProp;

        	//설정정보를 오브젝트의 속성으로 설정
        	for(sProp in jsnProps)
        	{
        		//속성 설정함수 가져오기
        		objFunc = objComp["set_"+sProp];

        		if(objFunc)
        		{
        			//속성 설정함수 실행
        			objFunc.call(objComp, jsnProps[sProp]);
        		}
        	}

        	//생성된 Graphics 하위 오브젝트 리턴
        	return objComp;
        }
        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
