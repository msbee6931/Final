(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("attendManage");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,570);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_class", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"classPart\" type=\"STRING\" size=\"256\"/><Column id=\"className\" type=\"STRING\" size=\"256\"/><Column id=\"classSeq\" type=\"INT\" size=\"256\"/><Column id=\"classPoint\" type=\"STRING\" size=\"256\"/><Column id=\"proCode\" type=\"STRING\" size=\"256\"/><Column id=\"proName\" type=\"STRING\" size=\"256\"/><Column id=\"dept\" type=\"STRING\" size=\"256\"/><Column id=\"classTime\" type=\"STRING\" size=\"256\"/><Column id=\"classRoom\" type=\"STRING\" size=\"256\"/><Column id=\"limit\" type=\"STRING\" size=\"256\"/><Column id=\"grade\" type=\"STRING\" size=\"256\"/><Column id=\"classGoal\" type=\"STRING\" size=\"256\"/><Column id=\"classMethod\" type=\"STRING\" size=\"256\"/><Column id=\"classEvaluation\" type=\"STRING\" size=\"256\"/><Column id=\"classReferences\" type=\"STRING\" size=\"256\"/><Column id=\"reqState\" type=\"STRING\" size=\"256\"/><Column id=\"rejectMsg\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_stdClass", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"sCode\" type=\"INT\" size=\"256\"/><Column id=\"sName\" type=\"STRING\" size=\"256\"/><Column id=\"classCode\" type=\"INT\" size=\"256\"/><Column id=\"basket\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_attend", this);
            obj._setContents("<ColumnInfo><Column id=\"classCode\" type=\"STRING\" size=\"256\"/><Column id=\"sCode\" type=\"STRING\" size=\"256\"/><Column id=\"sName\" type=\"STRING\" size=\"256\"/><Column id=\"attendDay\" type=\"STRING\" size=\"256\"/><Column id=\"attendState\" type=\"STRING\" size=\"256\"/><Column id=\"absenceReason\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_attendState", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"name\">출석</Col><Col id=\"id\">01</Col></Row><Row><Col id=\"name\">지각</Col><Col id=\"id\">02</Col></Row><Row><Col id=\"name\">결석</Col><Col id=\"id\">03</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","75","67","930","155",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_class");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"83\"/><Column size=\"108\"/><Column size=\"254\"/><Column size=\"67\"/><Column size=\"119\"/><Column size=\"207\"/><Column size=\"105\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"이수구분\"/><Cell col=\"1\" text=\"학과코드\"/><Cell col=\"2\" text=\"과목명\"/><Cell col=\"3\" text=\"학점\"/><Cell col=\"4\" text=\"학과\"/><Cell col=\"5\" text=\"강의시간\"/><Cell col=\"6\" text=\"인원 수\"/></Band><Band id=\"body\"><Cell text=\"bind:classPart\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:classSeq\" textAlign=\"center\" displaytype=\"mask\" maskeditformat=\"########\"/><Cell col=\"2\" text=\"bind:className\" textAlign=\"center\"/><Cell col=\"3\" text=\"bind:classPoint\" textAlign=\"center\"/><Cell col=\"4\" text=\"bind:dept\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:classTime\" textAlign=\"center\"/><Cell col=\"6\" text=\"bind:limit\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","80","20","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("나의 강좌");
            this.addChild(obj.name, obj);

            obj = new Static("sta_label","455","220","190","50",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("학생 리스트");
            this.addChild(obj.name, obj);

            obj = new Combo("co_year","650","27","120","28",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var co_year_innerdataset = new nexacro.NormalDataset("co_year_innerdataset", obj);
            co_year_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">2020</Col><Col id=\"datacolumn\">2020년</Col></Row><Row><Col id=\"codecolumn\">2021</Col><Col id=\"datacolumn\">2021년</Col></Row></Rows>");
            obj.set_innerdataset(co_year_innerdataset);
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Combo("co_semester","780","27","120","28",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var co_semester_innerdataset = new nexacro.NormalDataset("co_semester_innerdataset", obj);
            co_semester_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">1학기</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">2학기</Col></Row></Rows>");
            obj.set_innerdataset(co_semester_innerdataset);
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Button("btnSearch","910","24","90","33",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("검색");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid02","455","260","535","260",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_binddataset("ds_attend");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"94\"/><Column size=\"90\"/><Column size=\"155\"/><Column size=\"110\"/><Column size=\"85\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"학번\"/><Cell col=\"1\" text=\"성명\"/><Cell col=\"2\" text=\"출석일자\"/><Cell col=\"3\" text=\"출석체크\"/><Cell col=\"4\" text=\"사유\"/></Band><Band id=\"body\"><Cell text=\"bind:sCode\" edittype=\"none\" maskeditformat=\"#########\" textAlign=\"center\" displaytype=\"mask\"/><Cell col=\"1\" text=\"bind:sName\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:attendDay\" textAlign=\"center\" displaytype=\"date\"/><Cell col=\"3\" text=\"bind:attendState\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"ds_attendState\" combocodecol=\"id\" combodatacol=\"name\" textAlign=\"center\" calendarbuttonsize=\"30 30\"/><Cell col=\"4\" displaytype=\"buttoncontrol\" edittype=\"button\" text=\"사유\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal","70","260","300","260",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_type("monthonly");
            obj.set_usetrailingday("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave","890","525","100","35",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00","990","260","150","150",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","150","30",null,null,null,null,null,null,this.PopupDiv00.form);
            obj.set_taborder("1");
            obj.set_text("사유");
            this.PopupDiv00.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","0","Static00:0","150","120",null,null,null,null,null,null,this.PopupDiv00.form);
            obj.set_taborder("0");
            this.PopupDiv00.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,570,this,function(p){});
            obj.set_mobileorientation("landscape");
            obj.set_stepcount("0");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("attendManage.xfdl", function() {

        this.attendManage_onload = function(obj,e)
        {
        	var objDate= new Date();
        	if(objDate.getMonth()+1 && objDate.getMonth()+1 < 8){
        		this.co_year.set_text(objDate.getFullYear()+"년");
        		this.co_semester.set_text("1학기");
        		var startTime = objDate.getFullYear()+"0101";
        		var endTime = objDate.getFullYear()+"0731";
        	}else{
        		this.co_year.set_text(objDate.getFullYear()+"년");
        		this.co_semester.set_text("2학기");
        		var startTime = objDate.getFullYear()+"0801";
        		var endTime = objDate.getFullYear()+"1231";
        	}
        	var proCode ="91515073" // 교수코드(로그인)
        	this.transaction(
        				"proClassList"
        				,"/proClassList.nex"
        				,""
        				,"ds_class=out_ds"
        				,"proCode="+proCode +" startTime="+startTime + " endTime="+endTime
        				,"fn_callback"
        			);
        };
        this.Grid00_oncellclick = function(obj,e)
        {
        	var nRow = this.ds_class.rowposition
        	var classCode = this.ds_class.getColumn(nRow,"classSeq");
        	var className = this.ds_class.getColumn(nRow,"className");
        	this.sta_label.set_text("학생리스트(" +className+")");
        	var classTime = this.ds_class.getColumn(nRow,"classTime");
        	var Time = classTime.split("(");

        		this.transaction(
        					"stdListSeq"
        					,"/stdListSeq.nex"
        					,""
        					,"ds_stdClass=out_ds"
        					,"classCode="+classCode
        					,"fn_callback_stdList"
        				);

        };
        this.fn_callback_stdList=function(){
        	var nRow = this.ds_class.rowposition
        	var classTime = this.ds_class.getColumn(nRow,"classTime");
        	var time = classTime.split(")");
        	var day = "";
        	var cal = "";
        	for(var i=0; i<time.length-1; i++){
        		var weeks = time[i].split("("); //요일
        		if(weeks[0] == "일"){day = 0}
        		else if(weeks[0] == "월"){day = 1}
        		else if(weeks[0] == "화"){day = 2}
        		else if(weeks[0] == "수"){day = 3}
        		else if(weeks[0] == "목"){day = 4}
        		else if(weeks[0] == "금"){day = 5}
        		else if(weeks[0] == "토"){day = 6}
        		for(var j=0; j<7; j++){
        			var objDate= new Date();
        			objDate.setDate(objDate.getDate()-j);
        			if(objDate.getDay()==day){
        				var year = objDate.getFullYear().toString();
        				var month = ((objDate.getMonth() + 1) + "").padLeft(2, "0").toString();
        				var date = (objDate.getDate() + "").padLeft(2, "0").toString();
        				cal += year + month + date  +","
        			}
        		}
        	}
        	cal = cal.substring(0,cal.length-1).split(",");
        	var max = cal[0]
        	for(i=0; i<cal.length; i++){
        		if(max < cal[i]){
        			max = cal[i]
        		}
        	}
        	this.cal.set_value(max);
        	this.ds_attend.clearData();
        	if(this.ds_stdClass.getRowCount() > 0){
        		//stdClass에서 classCode로 Attend 테이블에서 목록을 가져옴
        		//Attend Table에서 인원이 0 인경우 insert
        		//Attend Table에서 이미 값이 있을 경우 update
        		//insert하는경우
        		for(var i=0; i<this.ds_stdClass.getRowCount(); i++){
        			var sCode = this.ds_stdClass.getColumn(i,"sCode");
        			var sName = this.ds_stdClass.getColumn(i,"sName");
        			var classCode = this.ds_stdClass.getColumn(i,"classCode");
        			var addRow = this.ds_attend.addRow();
        			this.ds_attend.setColumn(addRow,"classCode",classCode)
        			this.ds_attend.setColumn(addRow,"sCode",sCode);
        			this.ds_attend.setColumn(addRow,"sName",sName);
        			this.ds_attend.setColumn(addRow,"attendDay",this.cal.value);
        		}
        		this.transaction(
        				"attendList"
        				,"/attendList.nex"
        				,"in_ds=ds_attend:U"
        				,"ds_attend=out_ds"
        				,""
        				,"fn_callback"
        			);
        		//update하는경우
        	}
        }



        this.btnSave_onclick = function(obj,e)
        {
        	this.transaction(
        				"attendUpd"
        				,"/attendUpd.nex"
        				,"in_ds=ds_attend:U"
        				,"ds_attend=out_ds"
        				,""
        				,"fn_callback"
        			);
        };

        this.Grid02_oncellclick = function(obj,e)
        {
        	if(e.col == 4){
        	this.PopupDiv00.trackPopupByComponent(obj,obj.getOffsetRight(), obj.getOffsetHeight(), 150, 150)
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.attendManage_onload,this);
            this.Grid00.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
            this.co_year.addEventHandler("onitemchanged",this.Combo01_onitemchanged,this);
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.Grid02.addEventHandler("oncellclick",this.Grid02_oncellclick,this);
            this.cal.addEventHandler("onchanged",this.cal_onchanged,this);
            this.btnSave.addEventHandler("onclick",this.btnSave_onclick,this);
            this.ds_attend.addEventHandler("oncolumnchanged",this.ds_attend_oncolumnchanged,this);
        };

        this.loadIncludeScript("attendManage.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
