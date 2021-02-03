(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("scheduler_popup");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(400,300);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsType", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">01</Col><Col id=\"value\">공지</Col></Row><Row><Col id=\"code\">02</Col><Col id=\"value\">보고</Col></Row><Row><Col id=\"code\">03</Col><Col id=\"value\">팀일정</Col></Row><Row><Col id=\"code\">04</Col><Col id=\"value\">개인일정</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","10","10","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("제목");
            this.addChild(obj.name, obj);

            obj = new Edit("edtTitle","70","10","320","20",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","10","40","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("일자");
            this.addChild(obj.name, obj);

            obj = new Calendar("calSDate","70","40","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","10","70","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("일정구분");
            this.addChild(obj.name, obj);

            obj = new Combo("cmbType","70","70","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_innerdataset("dsType");
            obj.set_codecolumn("code");
            obj.set_datacolumn("value");
            obj.set_text("공지");
            obj.set_value("01");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","10","100","40","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("내용");
            this.addChild(obj.name, obj);

            obj = new TextArea("teaContent","10","130","380","120",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Button("btnOk","113","259","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("확인");
            this.addChild(obj.name, obj);

            obj = new Button("btnCancle","203","259","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("취소");
            this.addChild(obj.name, obj);

            obj = new Calendar("calEDate","230","40","130","20",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01","210","40","10","20",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("~");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",400,300,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("schedulerv2_popup.xfdl", function() {

        this.scheduler_popup_onload = function(obj,e)
        {
        	var objFrame = this.getOwnerFrame();

        	this.popuptype = objFrame.popuptype;

        	if(this.popuptype=="modify")
        	{
        		this.scheduleId = objFrame.scheduleid;
        		this.edtTitle.set_value(objFrame.title);
        		this.calSDate.set_value(objFrame.sdate);
        		this.calEDate.set_value(objFrame.edate);
        		this.cmbType.set_value(objFrame.type);
        		this.teaContent.set_value(objFrame.content);
        	}else if(this.popuptype=="new")
        	{
        		if(objFrame.sdate)
        		{
        			this.calSDate.set_value(objFrame.sdate);
        			this.calEDate.set_value(objFrame.sdate);
        		}
        	}
        };

        this.btnOk_onclick = function(obj,e)
        {
        	var objReturn;

        	objReturn = {
        			"popuptype" : this.popuptype,
        			"id" : this.scheduleId,
        			"sdate" : this.calSDate.value,
        			"edate" : this.calEDate.value,
        			"type" : this.cmbType.value,
        			"title" : this.edtTitle.value,
        			"content" : this.teaContent.value
        			};
        	this.close(JSON.stringify(objReturn, null, "\t")); // json 형식 오브젝트 전송
        };

        this.btnCancle_onclick = function(obj,e)
        {
        	this.close();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.scheduler_popup_onload,this);
            this.btnOk.addEventHandler("onclick",this.btnOk_onclick,this);
            this.btnCancle.addEventHandler("onclick",this.btnCancle_onclick,this);
        };

        this.loadIncludeScript("schedulerv2_popup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
