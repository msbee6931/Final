(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("attend_pop");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(600,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_attend", this);
            obj._setContents("<ColumnInfo><Column id=\"classCode\" type=\"STRING\" size=\"256\"/><Column id=\"sCode\" type=\"STRING\" size=\"256\"/><Column id=\"sName\" type=\"STRING\" size=\"256\"/><Column id=\"attendDay\" type=\"STRING\" size=\"256\"/><Column id=\"attendState\" type=\"STRING\" size=\"256\"/><Column id=\"absenceReason\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_attendState", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"name\">출석</Col><Col id=\"id\">01</Col></Row><Row><Col id=\"name\">지각</Col><Col id=\"id\">02</Col></Row><Row><Col id=\"name\">결석</Col><Col id=\"id\">03</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","33","95","535","470",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_attend");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"날짜\"/><Cell col=\"1\" text=\"출석 여부\"/><Cell col=\"2\" text=\"비고\"/></Band><Band id=\"body\"><Cell text=\"bind:attendDay\"/><Cell col=\"1\" text=\"bind:attendState\"/><Cell col=\"2\" displaytype=\"none\" edittype=\"none\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("sta_title","36","35","140","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",600,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("attend_pop.xfdl", function() {

        this.attend_pop_onload = function(obj,e)
        {
        	var sCode = this.parent.sCode;
        	var cCode = this.parent.cSeq;
        	var cName = this.parent.cName;

        	this.sta_title.set_text(cName);

        	this.transaction(
        		"selectAttend",//id
        		"/selectOneAttend.nex",//url (절대경로)
        		"",//in_ds:U
        		"ds_attend=out_ds",//()_out_ds
        		"sCode="+sCode+" cCode="+cCode,//argument
        		"fn_callback"
        	);

        };

        this.fn_callback = function()
        {
        	for(var i=0; i<this.ds_attend.getRowCount();i++)
        	{
        		var aValue = this.Grid00.getCellProperty("body",2,"text");
        		if(aVlaue == "03")
        		{
        			this.Grid00.setCellProperty("body",3,"displaytype","buttoncontrol");
        		}
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.attend_pop_onload,this);
            this.Grid00.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
            this.ds_attend.addEventHandler("oncolumnchanged",this.ds_attend_oncolumnchanged,this);
        };

        this.loadIncludeScript("attend_pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
