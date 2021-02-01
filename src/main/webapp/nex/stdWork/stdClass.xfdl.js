(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("stdClass");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_stdClass", this);
            obj._setContents("<ColumnInfo><Column id=\"sCode\" type=\"INT\" size=\"256\"/><Column id=\"classCode\" type=\"INT\" size=\"256\"/><Column id=\"basket\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_class", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"classPart\" type=\"STRING\" size=\"256\"/><Column id=\"className\" type=\"STRING\" size=\"256\"/><Column id=\"classSeq\" type=\"INT\" size=\"256\"/><Column id=\"classPoint\" type=\"STRING\" size=\"256\"/><Column id=\"proCode\" type=\"STRING\" size=\"256\"/><Column id=\"proName\" type=\"STRING\" size=\"256\"/><Column id=\"dept\" type=\"STRING\" size=\"256\"/><Column id=\"classTime\" type=\"STRING\" size=\"256\"/><Column id=\"classRoom\" type=\"STRING\" size=\"256\"/><Column id=\"limit\" type=\"STRING\" size=\"256\"/><Column id=\"grade\" type=\"STRING\" size=\"256\"/><Column id=\"classGoal\" type=\"STRING\" size=\"256\"/><Column id=\"classMethod\" type=\"STRING\" size=\"256\"/><Column id=\"classEvaluation\" type=\"STRING\" size=\"256\"/><Column id=\"classReferences\" type=\"STRING\" size=\"256\"/><Column id=\"reqState\" type=\"STRING\" size=\"256\"/><Column id=\"rejectMsg\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","40","20","375","270",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_stdClass");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"sCode\"/><Cell col=\"1\" text=\"classCode\"/><Cell col=\"2\" text=\"basket\"/></Band><Band id=\"body\"><Cell text=\"bind:sCode\"/><Cell col=\"1\" text=\"bind:classCode\"/><Cell col=\"2\" text=\"bind:basket\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","500","20","375","270",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("ds_class");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"chk\"/><Cell col=\"1\" text=\"classPart\"/><Cell col=\"2\" text=\"className\"/><Cell col=\"3\" text=\"classSeq\"/><Cell col=\"4\" text=\"classPoint\"/><Cell col=\"5\" text=\"proCode\"/><Cell col=\"6\" text=\"proName\"/><Cell col=\"7\" text=\"dept\"/><Cell col=\"8\" text=\"classTime\"/><Cell col=\"9\" text=\"classRoom\"/><Cell col=\"10\" text=\"limit\"/><Cell col=\"11\" text=\"grade\"/><Cell col=\"12\" text=\"classGoal\"/><Cell col=\"13\" text=\"classMethod\"/><Cell col=\"14\" text=\"classEvaluation\"/><Cell col=\"15\" text=\"classReferences\"/><Cell col=\"16\" text=\"reqState\"/><Cell col=\"17\" text=\"rejectMsg\"/><Cell col=\"18\" text=\"reg_date\"/></Band><Band id=\"body\"><Cell text=\"bind:chk\"/><Cell col=\"1\" text=\"bind:classPart\"/><Cell col=\"2\" text=\"bind:className\"/><Cell col=\"3\" text=\"bind:classSeq\"/><Cell col=\"4\" text=\"bind:classPoint\"/><Cell col=\"5\" text=\"bind:proCode\"/><Cell col=\"6\" text=\"bind:proName\"/><Cell col=\"7\" text=\"bind:dept\"/><Cell col=\"8\" text=\"bind:classTime\"/><Cell col=\"9\" text=\"bind:classRoom\"/><Cell col=\"10\" text=\"bind:limit\"/><Cell col=\"11\" text=\"bind:grade\"/><Cell col=\"12\" text=\"bind:classGoal\"/><Cell col=\"13\" text=\"bind:classMethod\"/><Cell col=\"14\" text=\"bind:classEvaluation\"/><Cell col=\"15\" text=\"bind:classReferences\"/><Cell col=\"16\" text=\"bind:reqState\"/><Cell col=\"17\" text=\"bind:rejectMsg\"/><Cell col=\"18\" text=\"bind:reg_date\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","340","320","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Button00");
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
        this.registerScript("stdClass.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	this.ds_class.addRow();
        	this.ds_stdClass.addRow();
        };

        this.stdClass_onload = function(obj,e)
        {
        	this.transaction(
        		"myClassList"
        		,"/myClassList.nex"
        		,""
        		,"ds_stdClass=out_ds"
        		,"sCode="+sCode
        		,"fn_callback_myClass"
        	);

        	this.transaction(
        		"classList"
        		,"/classListYear.nex"
        		,""
        		,"ds_class=out_ds"
        		,"startTime="+startTime+" endTime="+endTime
        		,"fn_callback"
        	);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.stdClass_onload,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
        };

        this.loadIncludeScript("stdClass.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
