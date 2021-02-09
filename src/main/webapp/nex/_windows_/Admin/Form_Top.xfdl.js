(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Top");
            this.set_titletext("Form_Top");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,50);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","0","0","200","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("로고위치");
            obj.set_background("#c1c1c1");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","200","0","1080","50",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#cfe1e0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout","1197","17","69","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("로그아웃");
            this.addChild(obj.name, obj);

            obj = new Button("btn_home","212","13","25","25",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("홈");
            this.addChild(obj.name, obj);

            obj = new Static("sta_name","244","13","60","25",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Static02");
            this.addChild(obj.name, obj);

            obj = new Static("Static02_00","314","13","100","25",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("님 환영합니다.");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,50,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Top.xfdl", function() {
        this.objApp = nexacro.getApplication();

        //홈 버튼 클릭시 홈 화면 호출
        this.btn_home_onclick = function(obj,e)
        {
        	this.fn_setFrameSize("home");
        };

        this.fn_setFrameSize = function(type)
        {
        	alert("홈 확인");
        	if(type == "home"){
        		this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.set_separatesize("30,*,0");
        	} else {
        		this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.set_separatesize("30,0,*");
        	}
        }





        this.btn_logout_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.set_separatesize("*,0,0,0");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btn_logout.addEventHandler("onclick",this.btn_logout_onclick,this);
            this.btn_home.addEventHandler("onclick",this.btn_home_onclick,this);
        };

        this.loadIncludeScript("Form_Top.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
