(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("ClassRegist");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,570);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_class", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"classPart\" type=\"STRING\" size=\"256\"/><Column id=\"className\" type=\"STRING\" size=\"256\"/><Column id=\"classSeq\" type=\"INT\" size=\"256\"/><Column id=\"classPoint\" type=\"STRING\" size=\"256\"/><Column id=\"proCode\" type=\"STRING\" size=\"256\"/><Column id=\"proName\" type=\"STRING\" size=\"256\"/><Column id=\"dept\" type=\"STRING\" size=\"256\"/><Column id=\"classTime\" type=\"STRING\" size=\"256\"/><Column id=\"classRoom\" type=\"STRING\" size=\"256\"/><Column id=\"limit\" type=\"STRING\" size=\"256\"/><Column id=\"grade\" type=\"STRING\" size=\"256\"/><Column id=\"classGoal\" type=\"STRING\" size=\"256\"/><Column id=\"classMethod\" type=\"STRING\" size=\"256\"/><Column id=\"classEvaluation\" type=\"STRING\" size=\"256\"/><Column id=\"classReferences\" type=\"STRING\" size=\"256\"/><Column id=\"reqState\" type=\"STRING\" size=\"256\"/><Column id=\"rejectMsg\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"dept\">정보통신학과</Col><Col id=\"className\">정보통신학개론</Col><Col id=\"classPart\">전공필수</Col></Row><Row><Col id=\"className\">간호학개론</Col><Col id=\"dept\">간호학과</Col><Col id=\"classPart\">교양필수</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_dept", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"id\">00</Col><Col id=\"name\">전체</Col></Row><Row><Col id=\"id\">01</Col><Col id=\"name\">정보통신학과</Col></Row><Row><Col id=\"id\">02</Col><Col id=\"name\">간호학과</Col></Row><Row><Col id=\"id\">03</Col><Col id=\"name\">경찰경호화과</Col></Row><Row><Col id=\"id\">04</Col><Col id=\"name\">산업디자인과</Col></Row><Row><Col id=\"id\">05</Col><Col id=\"name\">교양학부</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_part", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"id\">A</Col><Col id=\"name\">전공필수</Col></Row><Row><Col id=\"id\">B</Col><Col id=\"name\">전공선택</Col></Row><Row><Col id=\"id\">C</Col><Col id=\"name\">교양필수</Col></Row><Row><Col id=\"id\">D</Col><Col id=\"name\">지정교양</Col></Row><Row><Col id=\"id\">E</Col><Col id=\"name\">지정교양</Col></Row><Row><Col id=\"id\">F</Col><Col id=\"name\">계열기초</Col></Row><Row><Col id=\"id\">All</Col><Col id=\"name\">전체</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","0","0","200","570",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Info");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","9","39","80","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_text("학과");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_dept","89","39","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_text("정보통신학과");
            obj.set_border("1px solid black");
            obj.set_padding("0px 0px 0px 5px");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_01","9","69","80","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            obj.set_text("학번");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_02","9","99","80","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            obj.set_text("성명");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_03","9","129","80","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("4");
            obj.set_text("수강학년");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_03_00","9","159","80","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("5");
            obj.set_text("신청가능학점");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","9","209","120","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("6");
            obj.set_text("● 개설강좌 조회");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_04","9","239","60","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("7");
            obj.set_text("학과");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_04_00","9","269","60","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("8");
            obj.set_text("이수구분");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_04_00_00","9","299","60","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("9");
            obj.set_text("과목명");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_name","89","99","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("10");
            obj.set_text("");
            obj.set_border("1px solid black");
            obj.set_padding("0px 0px 0px 5px");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_grade","89","129","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("11");
            obj.set_text("");
            obj.set_border("1px solid black");
            obj.set_padding("0px 0px 0px 5px");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_point","89","159","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("12");
            obj.set_text("");
            obj.set_border("1px solid black");
            obj.set_padding("0px 0px 0px 5px");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_sSeq","89","69","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("13");
            obj.set_text("");
            obj.set_border("1px solid black");
            obj.set_padding("0px 0px 0px 5px");
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("co_dept","69","239","120","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("14");
            obj.set_innerdataset("ds_dept");
            obj.set_codecolumn("id");
            obj.set_datacolumn("name");
            obj.set_text("전체");
            obj.set_value("");
            obj.set_index("-1");
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("co_part","69","269","120","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("15");
            obj.set_innerdataset("ds_part");
            obj.set_codecolumn("id");
            obj.set_datacolumn("name");
            obj.set_text("전체");
            obj.set_value("All");
            obj.set_index("6");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edt_className","69","299","120","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("16");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnClassSearch","129","334","60","25",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("17");
            obj.set_text("조회");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_point00","9","404","110","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("18");
            obj.set_text("장바구니");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sta_point00_00","9","439","110","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("19");
            obj.set_text("시간표 조회");
            obj.set_border("1px solid black");
            obj.set_textAlign("center");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("basket","129","404","60","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("20");
            obj.set_text("조회");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("classTime","129","439","60","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("21");
            obj.set_text("조회");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01_00","210","10","120","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("▷ 개설강좌 리스트");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","210","35","860","260",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_binddataset("ds_class");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"58\"/><Column size=\"44\"/><Column size=\"68\"/><Column size=\"216\"/><Column size=\"37\"/><Column size=\"59\"/><Column size=\"181\"/><Column size=\"48\"/><Column size=\"58\"/><Column size=\"88\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"이수구분\"/><Cell col=\"1\" text=\"학년\"/><Cell col=\"2\" text=\"과목코드\"/><Cell col=\"3\" text=\"과목명\"/><Cell col=\"4\" text=\"학점\"/><Cell col=\"5\" text=\"담당교수\"/><Cell col=\"6\" text=\"강의시간\"/><Cell col=\"7\" text=\"신청\"/><Cell col=\"8\" text=\"강의실\"/><Cell col=\"9\" text=\"신청/제한인원\"/></Band><Band id=\"body\"><Cell text=\"bind:classPart\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:grade\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:classSeq\" textAlign=\"center\" displaytype=\"mask\" maskeditformat=\"########\"/><Cell col=\"3\" text=\"bind:className\" textDecoration=\"underline\" tooltiptext=\"수업계획서 보기\" textAlign=\"center\"/><Cell col=\"4\" text=\"bind:classPoint\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:proName\" textAlign=\"center\"/><Cell col=\"6\" text=\"bind:classTime\" textAlign=\"center\"/><Cell col=\"7\" displaytype=\"buttoncontrol\" text=\"신청\" textAlign=\"center\"/><Cell col=\"8\" text=\"bind:classRoom\" textAlign=\"center\"/><Cell col=\"9\" text=\"bind:limit\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00_00","210","300","140","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("▷ 수강신청내역 리스트");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00_00","210","330","860","220",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj._setContents("");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,570,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("regist.xfdl", function() {

        this.ClassRegist_onload = function(obj,e)
        {
        	//학생 정보 가져옴
        	//지금은 과목 명만 임시로 입력해둠

        	//개설 과목 리스트 가져옴
        	this.transaction(
        		"classList"
        		,"/classList.nex"
        		,""
        		,"ds_class=out_ds"
        		,""
        		,"fn_callback"
        	);

        	var dept = this.Div00.form.sta_dept.text;
        	this.Div00.form.co_dept.set_text(dept);
        	this.ds_class.filter("dept=='"+dept+"'");
        };

        //
        this.Div00_btnClassSearch_onclick = function(obj,e)
        {
        	var dept = this.Div00.form.co_dept.text;
        	var part = this.Div00.form.co_part.text;
        	var className = this.Div00.form.edt_className.text;
        	if(dept == "전체"){dept = ""}
        	if(part == "전체"){part = ""}
        	this.ds_class.filter("dept.indexOf('"+dept+"')>=0 && classPart.indexOf('"+part+"')>=0 && className.indexOf('"+className+"')>=0")
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.ClassRegist_onload,this);
            this.Div00.form.Static01.addEventHandler("onclick",this.Div00_Static01_onclick,this);
            this.Div00.form.edt_className.addEventHandler("onchanged",this.Div00_Edit00_onchanged,this);
            this.Div00.form.btnClassSearch.addEventHandler("onclick",this.Div00_btnClassSearch_onclick,this);
            this.Static01_00.addEventHandler("onclick",this.Div00_Static01_onclick,this);
            this.Static01_00_00.addEventHandler("onclick",this.Div00_Static01_onclick,this);
        };

        this.loadIncludeScript("regist.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
