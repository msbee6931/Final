(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("prfAttend_pop");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(600,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_attend", this);
            obj._setContents("<ColumnInfo><Column id=\"classCode\" type=\"STRING\" size=\"256\"/><Column id=\"sCode\" type=\"STRING\" size=\"256\"/><Column id=\"sName\" type=\"STRING\" size=\"256\"/><Column id=\"attendDay\" type=\"STRING\" size=\"256\"/><Column id=\"attendState\" type=\"STRING\" size=\"256\"/><Column id=\"absenceReason\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_stdClass", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"sCode\" type=\"INT\" size=\"256\"/><Column id=\"sName\" type=\"STRING\" size=\"256\"/><Column id=\"classCode\" type=\"INT\" size=\"256\"/><Column id=\"basket\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_class", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"classPart\" type=\"STRING\" size=\"256\"/><Column id=\"className\" type=\"STRING\" size=\"256\"/><Column id=\"classSeq\" type=\"INT\" size=\"256\"/><Column id=\"classPoint\" type=\"STRING\" size=\"256\"/><Column id=\"proCode\" type=\"STRING\" size=\"256\"/><Column id=\"proName\" type=\"STRING\" size=\"256\"/><Column id=\"dept\" type=\"STRING\" size=\"256\"/><Column id=\"classTime\" type=\"STRING\" size=\"256\"/><Column id=\"classRoom\" type=\"STRING\" size=\"256\"/><Column id=\"limit\" type=\"STRING\" size=\"256\"/><Column id=\"grade\" type=\"STRING\" size=\"256\"/><Column id=\"classGoal\" type=\"STRING\" size=\"256\"/><Column id=\"classMethod\" type=\"STRING\" size=\"256\"/><Column id=\"classEvaluation\" type=\"STRING\" size=\"256\"/><Column id=\"classReferences\" type=\"STRING\" size=\"256\"/><Column id=\"reqState\" type=\"STRING\" size=\"256\"/><Column id=\"rejectMsg\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00_00","30","15","45","30",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("과목명 :");
            this.addChild(obj.name, obj);

            obj = new Static("sta_title","74","15","140","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","234","556","132","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("닫기");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","28","60","545","290",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("ds_stdClass");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"194\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"학번\"/><Cell col=\"1\" text=\"이름\"/><Cell col=\"2\" text=\"출석률\"/></Band><Band id=\"body\"><Cell text=\"bind:sCode\"/><Cell col=\"1\" text=\"bind:sName\"/><Cell col=\"2\" text=\"bind:basket\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","35","390","530","125",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_binddataset("ds_attend");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"classCode\"/><Cell col=\"1\" text=\"sCode\"/><Cell col=\"2\" text=\"sName\"/><Cell col=\"3\" text=\"attendDay\"/><Cell col=\"4\" text=\"attendState\"/><Cell col=\"5\" text=\"absenceReason\"/></Band><Band id=\"body\"><Cell text=\"bind:classCode\"/><Cell col=\"1\" text=\"bind:sCode\"/><Cell col=\"2\" text=\"bind:sName\"/><Cell col=\"3\" text=\"bind:attendDay\"/><Cell col=\"4\" text=\"bind:attendState\"/><Cell col=\"5\" text=\"bind:absenceReason\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",600,600,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("prfAttend_pop.xfdl", function() {
        this.classSeq="";
        this.sCode="";
        this.prfAttend_pop_onload = function(obj,e)
        {
        	this.classSeq = this.parent.classSeq;
        	var className = this.parent.className;

        	this.sta_title.set_text(className);

        	this.transaction(
        		"stdList"
        		,"/stdListSeq.nex"
        		,""
        		,"ds_stdClass=out_ds"
        		,"classCode="+this.classSeq
        		,"fn_callback_stdList"
        	);
        };

        //닫기버튼
        this.Button00_onclick = function(obj,e)
        {
        	this.close();
        };



        // 셀 클릭시
        this.Grid00_oncelldblclick = function(obj,e)
        {
        	this.sCode = this.ds_stdClass.getColumn(e.row,"sCode");
        	var sName = this.ds_stdClass.getColumn(e.row,"sName");
        	this.classSeq = this.ds_stdClass.getColumn(e.row,"classCode");


        	//출결 조회 위한 모달창
        	var objCF = new ChildFrame();
        	var x = this.width/2-300;
        	var y = this.height/2-300;
        	objCF.init("attend_pop",x,y,600,600);
        	objCF.set_titletext(sName+" 학생 출결 조회 하기");
        	objCF.set_formurl("prfWork::prfAttend_std_pop.xfdl");
        	objCF.showModal(
        		this.getOwnerFrame(),
        		{sCode:this.sCode, sName:sName, cCode:this.classSeq}, // 모달창에 수업번호 값 넘기기
        		this,
        		"fn_callback_attend"
        	)

        };

        this.fn_callback_stdList = function()
        {

        	// 해당 수업을 듣는 학생들의 모든 출석을 불러옴
        	this.transaction(
        		"selectAttend",//id
        		"/selectAttend.nex",//url (절대경로)
        		"",//in_ds:U
        		"ds_attend=out_ds",//()_out_ds
        		"cCode="+this.classSeq,//argument
        		"fn_callback_attend"
        	);



        };

        this.fn_callback_attend =function()
        {

        	// 수업 총 일수 구하기 위해서 불러오는 데이터셋
        	this.transaction(
        		"classList",//id
        		"/classList.nex",//url (절대경로)
        		"",//in_ds:U
        		"ds_class=out_ds",//()_out_ds
        		"",//argument
        		"fn_callback_class"
        	)
        };

        this.fn_callback_class = function()
        {

        	var entireCount=""; // 전체 출석해야할 일 수
        	var objDs = this.ds_class;
        	for(var i=0; i< objDs.getRowCount(); i++)
        	{
        		var cSeq = objDs.getColumn(i,"classSeq");

        		if (cSeq == this.classSeq)
        		{
        			var cTime = objDs.getColumn(i,"classTime").split(")"); // ) 로 구분
        			entireCount = (cTime.length-1)*15; // 총 수업 일수
        		}
        	}


        	for(var i=0; i<this.ds_stdClass.getRowCount();i++)
        	{
        		var codeS = this.ds_stdClass.getColumn(i,"sCode"); // std데이터셋의 i번째 학번
        		alert("codeS ....>>"+codeS)
        		this.ds_attend.filter("sCode=='"+codeS+"'");
        		alert("필터적용") //---------------------여기서 오류네 ㅠㅠ
        		var aState = this.ds_attend.getColumn(i,"attendState"); //출석 코드
        		var countStateA =0; //출석일 수
        		var countStateB =0; // 지각일 수
        		var countStateC =0; // 조퇴일 수
        		var countStateD=0; //결석일 수
        		var notAttend=0; // 지각+조퇴
        		for(var i=0; i<this.ds_attend.getRowCount();i++)
        		{
        			alert(i+"<<----i값 --------- aState값 ----- >"+aState +"i가 7까지 되야함")
        			if(aState == 01)
        			{
        				countStateA=countStateA +1;
        			} else {
        				alert("-------if문 돌기 전에 값 확인 ---->>"+notAttend)
        				if(notAttend == 0)
        				{
        					if(aState == 02)
        					{
        						countStateB=countStateB+1;
        						countStateA=countStateA +1;
        					} else if (aState == 03)
        					{
        						countStateC=countStateC+1;
        						countStateA=countStateA +1;
        					}
        					notAttend =countStateB+countStateC;
        				}
        				else
        				{
        					for(var i=1; i <= notAttend; i++)
        					{
        						if(i%3 == 0)
        						{
        							countStateD = countStateD+1;
        						} else
        						{
        							if(aState==02)
        							{
        								alert("값 들어오는지확인")
        								countStateB=countStateB+1;
        								countStateA = countStateA+1;
        							} else if (aState ==03)
        							{
        								countStateC=countStateC+1;
        								countStateA = countStateA+1;
        							}
        							notAttend =countStateB+countStateC;
        						}
        						alert("b+c값 ,,,>"+notAttend)
        					}
        					this.ds_attend.setColumn(i,"basket",nexacro.round((countStateA/entireCount*100),2)+" % ("+countStateA+"일 / "+entireCount+"일)");
        				}
        			}

        		}
        		this.ds_attend.filter("");
        	}



        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.prfAttend_pop_onload,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Grid00.addEventHandler("oncelldblclick",this.Grid00_oncelldblclick,this);
            this.ds_attend.addEventHandler("oncolumnchanged",this.ds_attend_oncolumnchanged,this);
        };

        this.loadIncludeScript("prfAttend_pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
