(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("timeSchule");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,520);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
<<<<<<< HEAD
            obj = new Dataset("ds_stdTimeTable", this);
            obj._setContents("<ColumnInfo><Column id=\"sCode\" type=\"INT\" size=\"256\"/><Column id=\"classCode\" type=\"INT\" size=\"256\"/><Column id=\"time\" type=\"STRING\" size=\"256\"/><Column id=\"mon\" type=\"STRING\" size=\"256\"/><Column id=\"tue\" type=\"STRING\" size=\"256\"/><Column id=\"wed\" type=\"STRING\" size=\"256\"/><Column id=\"thu\" type=\"STRING\" size=\"256\"/><Column id=\"fri\" type=\"STRING\" size=\"256\"/><Column id=\"sat\" type=\"STRING\" size=\"256\"/><Column id=\"sun\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
=======
            obj = new Dataset("Dataset00", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"contents\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">1</Col><Col id=\"name\">알리스타</Col><Col id=\"contents\">서폿</Col></Row><Row><Col id=\"code\">2</Col><Col id=\"name\">아리</Col><Col id=\"contents\">미드</Col></Row><Row><Col id=\"code\">3</Col><Col id=\"name\">가렌</Col><Col id=\"contents\">탑</Col></Row></Rows>");
>>>>>>> 7ce2599a794fe466239a9559360b91ad0143a96b
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","0","0","29",null,null,"0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","30","9","200","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("시간표 조회");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","80","0","800","10",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","1050","0","30",null,null,"0",null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01_00","100","490","800","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

<<<<<<< HEAD
            obj = new Grid("Grid00","140","60","800","400",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_stdTimeTable");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"105\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"31\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\" text=\"월요일\"/><Cell col=\"2\" text=\"화요일\"/><Cell col=\"3\" text=\"수요일\"/><Cell col=\"4\" text=\"목요일\"/><Cell col=\"5\" text=\"금요일\"/><Cell col=\"6\" text=\"토요일\"/><Cell col=\"7\" text=\"일요일\" wordWrap=\"english\"/></Band><Band id=\"body\"><Cell text=\"bind:time\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:mon\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"2\" text=\"bind:tue\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"3\" text=\"bind:wed\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"4\" text=\"bind:thu\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"5\" text=\"bind:fri\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"6\" text=\"bind:sat\" textAlign=\"center\" wordWrap=\"english\"/><Cell col=\"7\" text=\"bind:sun\" textAlign=\"center\"/></Band></Format></Formats>");
=======
            obj = new Graphics("Graphics00","55","200","955","265",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_border("1px solid #c1c1c1");
>>>>>>> 7ce2599a794fe466239a9559360b91ad0143a96b
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,520,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("timeSchule.xfdl", function() {

        this.timeSchule_onload = function(obj,e)
        {
<<<<<<< HEAD
        	var sCode = "12345"; // 로그인시 학번 받아와야 함 ------강제로 끼워넣기

        	//1~8월까지 나누고 8~12월 나누기
        	var objDate= new Date();
        	if(objDate.getMonth()+1 && objDate.getMonth()+1 < 8){
        		var startTime = objDate.getFullYear()+"0101"; // ex20210101
        		var endTime = objDate.getFullYear()+"0731"; //ex20210731
        	}else{
        		var startTime = objDate.getFullYear()+"0801";
        		var endTime = objDate.getFullYear()+"1231";
        	}

        	this.transaction(
        		"stdTimeTableList"
        		,"/stdTimeTableList.nex"
        		,""
        		,"ds_stdTimeTable=out_ds"
        		,"sCode="+sCode + " startTime="+startTime+" endTime="+endTime
        		,"fn_callback_TimeTable"
        	);
        };



        //데이터셋 수신 완료 시 실행할 콜백 함수
        this.fn_callback_TimeTable=function()
        {

=======
            var objGRect = new nexacro.GraphicsRect();
            this.Graphics00.addChild( "GraphicsRect00", objGRect );
            objGRect.set_x(50);
            objGRect.set_y(50);
            objGRect.set_width(50);
            objGRect.set_height(50);
            objGRect.set_strokepen("1px solid red");
        	this.Graphics00.redraw();

        	this.Graphics00.set_background("#ffffaa");


        	var objGText = new nexacro.GraphicsText();
        	this.Graphics00.addChild( "GraphicsText00", objGText );
            objGText.set_x(50);
            objGText.set_y(50);
            objGText.set_color('red');
            objGText.set_font('8pt/normal Verdana');
            objGText.set_text('과연 그래픽으로 만들수 있을까?');
        	this.Graphics00.redraw();
>>>>>>> 7ce2599a794fe466239a9559360b91ad0143a96b
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.timeSchule_onload,this);
        };

        this.loadIncludeScript("timeSchule.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
