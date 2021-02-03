(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("scholar_pop");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(900,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("schFileList_ds", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"seq\" type=\"INT\" size=\"256\"/><Column id=\"parentSeq\" type=\"INT\" size=\"256\"/><Column id=\"fileName\" type=\"STRING\" size=\"256\"/><Column id=\"savedFileName\" type=\"STRING\" size=\"256\"/><Column id=\"fileSize\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("reqScholar_ds", this);
            obj._setContents("<ColumnInfo><Column id=\"seq\" type=\"INT\" size=\"256\"/><Column id=\"std_code\" type=\"STRING\" size=\"256\"/><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"contents\" type=\"STRING\" size=\"256\"/><Column id=\"writeDate\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new FileDialog("FileDialog00", this);
            this.addChild(obj.name, obj);


            obj = new FileUpTransfer("FileUpTransfer00", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","870","40","30","520",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","0","40","30","520",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","160","580","600","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00","150","0","600","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_visible("false");
            obj.set_background("RGBA(236,135,135,0.71)");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","30","20","840","560",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Div00");
            obj.set_border("1px solid #c1c1c1");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_title","168","39","600","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","69","39","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_text("제목");
            obj.set_background("#c1c1c1");
            obj.set_border("1px solid #000000");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edt_contents","70","137","700","271",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("4");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_add","668","69","100","39",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            obj.set_text("파일찾기");
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","168","68","501","71",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("5");
            obj.set_binddataset("schFileList_ds");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"33\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"0\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\"/><Cell col=\"1\" text=\"seq\"/><Cell col=\"2\" text=\"parentSeq\"/><Cell col=\"3\" text=\"fileName\"/><Cell col=\"4\" text=\"savedFileName\"/><Cell col=\"5\" text=\"fileSize\"/></Band><Band id=\"body\"><Cell text=\"bind:chk\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\"/><Cell col=\"1\" text=\"bind:seq\"/><Cell col=\"2\" text=\"bind:parentSeq\"/><Cell col=\"3\" text=\"bind:fileName\"/><Cell col=\"4\" text=\"bind:savedFileName\"/><Cell col=\"5\" text=\"bind:fileSize\"/></Band></Format></Formats>");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_del","668","108","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("6");
            obj.set_text("파일 삭제");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_save","549","444","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("7");
            obj.set_text("저장");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","69","69","100","70",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            obj.set_text("첨부파일");
            obj.set_background("#c1c1c1");
            obj.set_border("1px solid #000000");
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_can","668","444","100","30",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("8");
            obj.set_text("취소");
            this.Div00.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",900,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("scholar_insert_pop.xfdl", function() {
        //1.Environment filesecurelevel property all로 변경하기
        this.reqSchSeq="";

        this.nMaxFileSize = 2000000;  //각 파일 최대사이즈 (2 Mbyte)

        this.fileName = "";
        this.fileSize = "";

        //폼 로딩 후 이벤트
        this.scholar_pop_onload = function(obj,e)
        {
        	//파일업로드시 파일저장 폴더경로 PostData 셋팅
        	this.FileUpTransfer00.setPostData("filepath","reqScholar");

        };

        //파일추가 버튼클릭
        this.Div00_btn_add_onclick = function(obj,e)
        {
        	this.FileDialog00.open( "파일선택", FileDialog.MULTILOAD );
        };

        //파일선택창(FileDialog) 닫힐시
        //Web 은 e.reason 이 1(FileDialog.LOAD) 이나 3(FileDialog.MULTILOAD) 일경우에만 발생
        this.FileDialog00_onclose = function(obj,e)
        {
        	if(e.reason == 0 ) {  //파일선택 취소
        		return;
        	}else{
        		if(e.reason == 3) {    //FileDialog.MULTILOAD 옵션의 파일선택
        			this.addFileList(e.virtualfiles);

        		}
        	}
        };

        this.addFileList = function(filelist)
        {
            for (var i = 0, len = filelist.length, vFile; i < len; i++)
            {
                vFile = filelist[i];
        		var isExist = this.FileUpTransfer00.existFile(vFile);

        		//파일중복체크
        		if(isExist){
        			alert("이미추가된 파일이 있습니다.");
        			return;
        		}

        		//VirtualFile 이벤트 생성
                vFile.addEventHandler("onsuccess", this.Upload_VirtualFile_onsuccess, this);
                vFile.addEventHandler("onerror", this.Upload_VirtualFile_onerror , this);

                //File 사이즈 체크를 위해
        		vFile.open(null,VirtualFile.openRead);
            }
        }

        //업로드용 Virtual 파일 onsuccess 이벤트
        this.Upload_VirtualFile_onsuccess = function(obj, e)
        {
        	if (e.reason == 1)  //open() callback
        	{
        		//파일사이즈 체크
        		obj.getFileSize();
        	}
        	if (e.reason == 9) //getFileSize() callback
        	{
        		obj.close();

        		this.fileName = obj.filename;
        		this.fileSize = e.filesize;

        		if(this.fileSize > this.nMaxFileSize){
        			alert("첨부파일 최대용량은 2 MByte 입니다.");
        			return;
        		}

        		//FileUpTransfer 해당 파일추가
        		var nIdx = this.FileUpTransfer00.addFile(this.fileName,obj);

        		//화면 파일정보 셋팅
        		var nRow = this.schFileList_ds.insertRow(nIdx);
        		this.schFileList_ds.setColumn(nRow, "fileName", this.fileName);
        		this.schFileList_ds.setColumn(nRow, "fileSize", this.fileSize);
        	}
        }

        //업로드용 Virtual 파일 oneroor 이벤트
        this.Upload_VirtualFile_onerror = function(obj, e)
        {
        	var msg = ">>>>>>>>> VirtualFile event ERROR >>>>>>>>\n";
        	msg += "errortype : "+e.errortype+"\n";
        	msg += "errormsg : "+e.errormsg+"\n";
        	msg += "statuscode : "+e.statuscode;

        	alert(msg);
        }

        this.Div00_btn_del_onclick = function(obj,e)
        {
        	for(let i =0; i<this.schFileList_ds.getRowCount();i++){
        		if(this.schFileList_ds.getColumn(i,"check") == 1){
        		//FileUpTransfer 해당 파일삭제
        			var nIdx = this.FileUpTransfer00.removeFileByIndex(i);
        			//정상삭제 시 해당 데이터 삭제
        			if(nIdx > -1) {
        				this.schFileList_ds.deleteRow(i);
        			}
        		}
        	}
        };



        //파일전송 성공시
        this.FileUpTransfer00_onsuccess = function(obj,e)
        {
        	var msg = ">>>>>>>>>>>>>>>>>>>>>>>>>>  SUCCESS >>>>>>>>>>>>>>>>>>>>>>>>>>\n";
        	msg += "code :"+e.code+"\n";
        	msg += "message :"+e.message+"\n";
        	msg += "url :"+e.url+"\n";
        	msg += "datasets[0].saveXML() :"+e.datasets[0].saveXML()+"\n";

        	alert(msg);

        	//파일정보 초기화
        	this.fn_FileClear();
        };

        //파일전송 중
        this.FileUpTransfer00_onprogress = function(obj,e)
        {
        	trace(e.loaded +" / "+e.total +" Byte Uploading...");
        };

        //파일전송 실패시
        this.FileUpTransfer00_onerror = function(obj,e)
        {
        	var msg = ">>>>>>>>>>>>>>>>>>>>>>>>>>  ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>\n";
        	msg += "statuscode: "+e.statuscode+"\n";
        	msg += "requesturi: "+e.requesturi+"\n";
        	msg += "locationuri: "+e.locationuri+"\n" ;
        	msg += "errormsg: "+e.errormsg+"\n";
        	trace(msg)

        };

        //파일전송 버튼클릭
        this.Div00_btn_save_onclick = function(obj,e)
        {

        	if(this.FileUpTransfer00.filelist.length == 0) {
        		alert("첨부한 파일이 없습니다.");
        		return;
        	}

        	var nRow = this.reqScholar_ds.addRow();
        	var title = this.Div00.form.edt_title.value;
        	var contents = this.Div00.form.edt_contents.value;

        	this.reqScholar_ds.setColumn(nRow,"title",title);
        	this.reqScholar_ds.setColumn(nRow,"contents",contents);
        	this.reqScholar_ds.setColumn(nRow,"std_code","201102159");



        	//파일 전송이 성공 하면 트랜잭션 전송

        	this.transaction(
        		"reqScholar",//id
        		"/scholarship/uploadReqScholar.scholarship",//url (절대경로)
        		"in_ds=reqScholar_ds:U",//in_ds:U
        		"",//()_out_ds
        		"",//argument
        		"fn_callback"
        	)

        	//파일전송
        	this.FileUpTransfer00.upload("/scholarship/uploadReqSchFile.scholarship"); //file up url

        	this.close();
        };

        //파일정보 초기화
        this.fn_FileClear = function (){
        	//FileUpTransfer 파일 모두삭제
        	this.FileUpTransfer00.clearFileList();
        	//파일정보 모두삭제
        	this.schFileList_ds.clearData();
        }



        this.Div00_btn_can_onclick = function(obj,e)
        {
        	this.close();
        };

        this.fn_callback = function(id,ErrorCode,ErrorMsg){
        	trace(id);
        	trace(ErrorCode);
        	trace(ErrorMsg);
        	alert("ErrorCode : "+ErrorCode);
        };

        //헤더 전체  클릭 적용
        this.Div00_Grid00_onheadclick = function(obj,e)
        {
        	if(e.cell == 0)
            {
                this.gf_setCheckAll(obj, e);
            }

        };

        this.gv_isCheckAll = 0;
        this.gf_setCheckAll = function(obj, e)
        {
            var sColID = obj.getCellProperty("body", e.cell, "text").replace("bind:", "");

        	var sheadValue = obj.getCellProperty("head",e.cell,"text");

            if(sColID == "chk")
            {
        		sheadValue = (sheadValue =="1"? "0":"1");
        		obj.setCellProperty("head",e.cell,"text",sheadValue);

        		this.schFileList_ds.set_enableevent(false);
        		for(var i=0; i< this.schFileList_ds.getRowCount(); i++)
        		{
        			this.schFileList_ds.setColumn(i, "chk",sheadValue);
        		}
        		this.schFileList_ds.set_enableevent(true);
            }

        }






        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.scholar_pop_onload,this);
            this.Div00.form.btn_add.addEventHandler("onclick",this.Div00_btn_add_onclick,this);
            this.Div00.form.Grid00.addEventHandler("onheadclick",this.Div00_Grid00_onheadclick,this);
            this.Div00.form.btn_del.addEventHandler("onclick",this.Div00_btn_del_onclick,this);
            this.Div00.form.btn_save.addEventHandler("onclick",this.Div00_btn_save_onclick,this);
            this.Div00.form.btn_can.addEventHandler("onclick",this.Div00_btn_can_onclick,this);
            this.FileDialog00.addEventHandler("onclose",this.FileDialog00_onclose,this);
            this.FileUpTransfer00.addEventHandler("onerror",this.FileUpTransfer00_onerror,this);
            this.FileUpTransfer00.addEventHandler("onprogress",this.FileUpTransfer00_onprogress,this);
            this.FileUpTransfer00.addEventHandler("onsuccess",this.FileUpTransfer00_onsuccess,this);
        };

        this.loadIncludeScript("scholar_insert_pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
