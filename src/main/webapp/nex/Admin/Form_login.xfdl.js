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

            
            // UI Components Initialize
            obj = new Div("Div00","385","155","580","350",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Div00");
            obj.set_border("1px solid #c1c1c1");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","80","111","55","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_text("ID");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","79","172","55","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_text("PW");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","160","115","300","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","160","174","300","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","481","116","85","90",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("4");
            obj.set_text("로그인");
            this.Div00.addChild(obj.name, obj);

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

        this.Div00_Button00_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.set_separatesize("0,50,*,60");
        };

        this.Button00_onclick = function(obj,e)
        {
<<<<<<< HEAD
=======

>>>>>>> dcc692aff1bca234deba5d181fa1541219a8a378
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
<<<<<<< HEAD

=======
>>>>>>> dcc692aff1bca234deba5d181fa1541219a8a378
        };

        this.Button00_01_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.TopFrame.set_formurl("Admin::Form_Top.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.LeftFrame.set_formurl("Admin::Form_Left.xfdl");
        	this.objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet00.ChildFrame00.set_formurl("Admin::Form_Mdi.xfdl");
        	this.objApp.mainframe.VFrameSet00.BottomFrame.set_formurl("Admin::Form_Bottom.xfdl");
        	this.objApp.mainframe.VFrameSet00.set_separatesize("0,50,*,60");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Div00.form.Button00.addEventHandler("onclick",this.Div00_Button00_onclick,this);
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
