(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptSchedule_insert_pop");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(400,300);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("deptSchedule_ds", this);
            obj._setContents("<ColumnInfo><Column id=\"seq\" type=\"STRING\" size=\"256\"/><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"writer\" type=\"STRING\" size=\"256\"/><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"sDate\" type=\"STRING\" size=\"256\"/><Column id=\"eDate\" type=\"STRING\" size=\"256\"/><Column id=\"schDate\" type=\"STRING\" size=\"256\"/><Column id=\"schDay\" type=\"STRING\" size=\"256\"/><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"content\" type=\"STRING\" size=\"256\"/><Column id=\"writeDate\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ScheduleCode_ds", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">01</Col><Col id=\"name\">[공지]</Col></Row><Row><Col id=\"code\">02</Col><Col id=\"name\">[학과]</Col></Row><Row><Col id=\"code\">03</Col><Col id=\"name\">[개인]</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","10","10","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("제목");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_title","70","10","320","20",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","10","40","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("일자");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_sDate","70","40","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","10","70","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("일정구분");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_code","70","70","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_innerdataset("ScheduleCode_ds");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_text("공지");
            obj.set_value("01");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","10","100","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("내용");
            this.addChild(obj.name, obj);

            obj = new TextArea("tea_content","10","130","380","120",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_eDate","230","40","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01","210","40","10","20",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("~");
            this.addChild(obj.name, obj);

            obj = new Button("btn_ok","113","259","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("확인");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancle","203","259","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("취소");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",400,300,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("deptSchedule_insert_pop.xfdl", function() {

        this.btn_cancle_onclick = function(obj,e)
        {
        	this.close();
        };



        this.btn_ok_onclick = function(obj,e)
        {
        	var title = this.edt_title.value;
        	var sDate = nexacro.toNumber(this.cal_sDate.value);
        	var eDate = this.cal_eDate.value;
        	var code = this.cmb_code.value;
        	var content = this.tea_content.value;


        	// 날짜간 차이 계산하기하기
        	var fromDate = new Date();
            var toDate = new Date();
            var calDate;
            var day = 1000*60*60*24;

            fromDate.setFullYear(this.cal_sDate.getYear());
            fromDate.setMonth(this.cal_sDate.getMonth()-1);
            fromDate.setDate(this.cal_sDate.getDay());

            toDate.setFullYear(this.cal_eDate.getYear());
            toDate.setMonth(this.cal_eDate.getMonth()-1);
            toDate.setDate(this.cal_eDate.getDay());

            calDate = fromDate.getTime() - toDate.getTime();

            var leng = Math.abs(calDate/day); // 실제 날짜 간 차이
        	var seq  = nexacro.round(Math.random()*10000, 0); // 랜덤으로 seq 숫자 부여


        	for(var i=0; i<(leng+1);i++){
        		var nRow = this.deptSchedule_ds.addRow();
        		var schDate = (sDate+i);

        	//나중에 로그인 처리시 아이디 값도 넣어줘야 함.
        	this.deptSchedule_ds.setColumn(nRow,"seq",seq);
        	this.deptSchedule_ds.setColumn(nRow,"title",title);
        	this.deptSchedule_ds.setColumn(nRow,"sDate",sDate);
        	this.deptSchedule_ds.setColumn(nRow,"eDate",eDate);
        	this.deptSchedule_ds.setColumn(nRow,"schDate",schDate);
        	this.deptSchedule_ds.setColumn(nRow,"schDay",schDate.toString().substr(6,2));
        	this.deptSchedule_ds.setColumn(nRow,"code",code);
        	this.deptSchedule_ds.setColumn(nRow,"content",content);
        	}



        	this.transaction(
        		"insertDeptScheule",//id
        		"/schedule/insertDeptScheule",//url (절대경로)
        		"in_ds=deptSchedule_ds:U",//in_ds:U
        		"",//()_out_ds
        		"seq='"+seq+"'",//argument
        		"fn_callback"
        		)

        	var suc = "succes!";

        	this.close(suc);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btn_ok.addEventHandler("onclick",this.btn_ok_onclick,this);
            this.btn_cancle.addEventHandler("onclick",this.btn_cancle_onclick,this);
        };

        this.loadIncludeScript("deptSchedule_insert_pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
