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
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,50);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_menu", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"caption\" type=\"STRING\" size=\"256\"/><Column id=\"level\" type=\"STRING\" size=\"256\"/><Column id=\"url\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","0","0","200","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("로고위치");
            obj.set_background("#c1c1c1");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","210","10","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("홈");
            this.addChild(obj.name, obj);

            obj = new Menu("Menu00","240","10","730","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_innerdataset("ds_menu");
            obj.set_captioncolumn("menu_name");
            obj.set_idcolumn("menu_id");
            obj.set_levelcolumn("menu_level");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout","1197","17","69","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("로그아웃");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,50,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Top.xfdl", function() {
        this.objApp = nexacro.getApplication();

        this.Form_Top_onload = function(obj,e)
        {
        	this.fn_setTopMenu();
        };

        //innerDataSet은 ds_menu 나머지 바인딩 셋은 글로벌 셋으로 세팅
        this.fn_setTopMenu = function()
        {

        	this.objApp.std_menu.filter("menu_level == '0'");

        	this.ds_menu.copyData(this.objApp.std_menu, true);

        	var sMenuId = this.ds_menu.getColumn(0, "menu_id");
        	this.fn_setLeftMenu(sMenuId);
        }

        this.Menu00_onmenuclick = function(obj,e)
        {
        	this.fn_setLeftMenu(e.id);
        };

        this.fn_setLeftMenu = function(pMenuId)
        {
        	this.objApp.std_menu.filter("menu_id.substring(0,2) == '" + pMenuId + "'");
        }


        this.Menu00_onrbuttondown = function(obj,e)
        {
        	this.fn_setFrameSize("Form");
        };



        this.btn_logout_onclick = function(obj,e)
        {
        	this.objApp.mainframe.VFrameSet00.set_separatesize("*,0,0,0");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Top_onload,this);
            this.Menu00.addEventHandler("onmenuclick",this.Menu00_onmenuclick,this);
            this.btn_logout.addEventHandler("onclick",this.btn_logout_onclick,this);
        };

        this.loadIncludeScript("Form_Top.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
