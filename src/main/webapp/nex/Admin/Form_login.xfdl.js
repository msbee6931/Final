(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_login");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_radio", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"date\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">1</Col><Col id=\"date\">학생</Col></Row><Row><Col id=\"code\">2</Col><Col id=\"date\">교수</Col></Row><Row><Col id=\"code\">3</Col><Col id=\"date\">관리자</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_login", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"pw\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("loginForm","385","155","580","350",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Div00");
            obj.set_border("1px solid #c1c1c1");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","80","111","55","30",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("0");
            obj.set_text("ID");
            this.loginForm.addChild(obj.name, obj);

            obj = new Static("Static00_00","79","172","55","30",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("1");
            obj.set_text("PW");
            this.loginForm.addChild(obj.name, obj);

            obj = new Edit("edt_id","160","115","300","30",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("2");
            this.loginForm.addChild(obj.name, obj);

            obj = new Edit("edt_pw","160","174","300","30",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("3");
            this.loginForm.addChild(obj.name, obj);

            obj = new Button("btn_login","481","116","85","90",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("4");
            obj.set_text("로그인");
            this.loginForm.addChild(obj.name, obj);

            obj = new Radio("rad_chk","85","240","400","30",null,null,null,null,null,null,this.loginForm.form);
            obj.set_taborder("5");
            obj.set_innerdataset("ds_radio");
            obj.set_codecolumn("code");
            obj.set_datacolumn("date");
            obj.set_rowcount("1");
            this.loginForm.addChild(obj.name, obj);

            obj = new Button("Button00","390","60","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("학생");
            this.addChild(obj.name, obj);

            obj = new Button("Button00_00","531","60","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("교수");
            this.addChild(obj.name, obj);

            obj = new Button("Button00_01","670","60","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("관리자");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_login.xfdl", function() {
        this.objApp = nexacro.getApplication();

        this.fn_callback = function(id,ErrorCode,ErrorMsg){	//콜백함수
        	trace(id);
        	trace(ErrorMsg);
        	trace(ErrorCode);
        }


        this.Button00_onclick = function(obj,e)
        {

        	this.objApp.mainframe.VFrameSet00.TopFrame.set_formurl("Student::Form_Top.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.LeftFrame.set_formurl("Student::Form_Left.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.ChildFrame00.set_formurl("Student::Form_Mdi.xfdl");
        	this.objApp.mainframe.VFrameSet00.BottomFrame.set_formurl("Student::Form_Bottom.xfdl");
        	this.objApp.mainframe.VFrameSet00.set_separatesize("0,50,*,60");
        };

        this.Button00_00_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.TopFrame.set_formurl("Professor::Form_Top.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.LeftFrame.set_formurl("Professor::Form_Left.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.ChildFrame00.set_formurl("Professor::Form_Mdi.xfdl");
        	this.objApp.mainframe.VFrameSet00.set_separatesize("0,50,*,60");
        };

        this.Button00_01_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.TopFrame.set_formurl("Admin::Form_Top.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.LeftFrame.set_formurl("Admin::Form_Left.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.ChildFrame00.set_formurl("Admin::Form_Mdi.xfdl");
        	this.objApp.mainframe.VFrameSet00.BottomFrame.set_formurl("Admin::Form_Bottom.xfdl");
        	this.objApp.mainframe.VFrameSet00.set_separatesize("0,50,*,60");
        };




        this.loginForm_btn_login_onclick = function(obj,e)
        {
        	var id = this.loginForm.form.edt_id.value;
        	var pw = this.loginForm.form.edt_pw.value;
        	trace(id);
        	trace(pw);
        	trace(this.loginForm.form.rad_chk.value);


        	if(this.loginForm.form.rad_chk.value == null){
        	alert("셋중 하나 선택해 주세요.")
        	return;
        	}
        	if(id == undefined || id == ""){
        		this.alert("아이디 입력해주세요.")
        	}else if(pw == undefined || pw == ""){
        		this.alert("비밀번호를 입력해주세요");
        	}
        	else{
        	if(this.loginForm.form.rad_chk.value == 1){
        		var shaObj = new jsSHA("SHA-256","TEXT");
        		shaObj.update(pw);
        		var hash = shaObj.getHash("HEX");
        		trace(hash);

        		var addRow = this.ds_login.addRow();
        		this.ds_login.setColumn(addRow,"id",id);
        		this.ds_login.setColumn(addRow,"pw",hash);

        		this.transaction(

        					"ds_login" //1. strSvcID
        					,"/loginStu.login" //2. strURL
        					,"in_ds=ds_login:U" //3.strInDatasets - I,U,D Sds=Fds:U 변경된값만보내겟다, :A, :N
        					,"ds_login=out_ds" //4.strOutDatasets -select Fds=Sds
        					,"" //5.strArgument text값
        					,"fn_callback" //6.strCallbackFunc
        				);
        				trace(this.ds_login);
        	}

        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.loginForm.form.btn_login.addEventHandler("onclick",this.loginForm_btn_login_onclick,this);
            this.loginForm.form.rad_chk.addEventHandler("onitemchanged",this.Div00_Radio00_onitemchanged,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button00_00.addEventHandler("onclick",this.Button00_00_onclick,this);
            this.Button00_01.addEventHandler("onclick",this.Button00_01_onclick,this);
        };

        this.loadIncludeScript("Form_login.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
