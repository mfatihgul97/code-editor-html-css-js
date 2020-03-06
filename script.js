function update()
    {
    	var idoc = document.getElementById('result').contentWindow.document;

    	idoc.open();
        idoc.write(html.getValue());
        idoc.write('<style>' + css.getValue() + '</style>');
        idoc.write('<script>' + js.getValue() + '</script>');
    	idoc.close();
    }

    function setupEditor()
    {
      window.html = ace.edit("html");
      html.setTheme("ace/theme/monokai");
      html.session.setMode("ace/mode/html");
      
      html.session.setValue(`
    <!DOCTYPE html>
    <html>
    <head>

    </head>
    <body>
    <h1>Title example</h1>
    </body>
    </html>`,1); //1 = moves cursor to end

    html.getSession().on('change', function() {
        update();
      });

      html.focus();


    html.setOptions({
    fontSize: "16pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: false, enableLiveAutocompletion: false
    });

    require("ace/ext/emmet");
    html.setOption("enableEmmet", true);

    html.setShowPrintMargin(false);
    html.setBehavioursEnabled(false);

    window.css = ace.edit("css");
    css.setTheme("ace/theme/monokai");
    css.session.setMode("ace/mode/css");

    css.getSession().on('change', function() {
        update();
      });

    //   css.focus();

    css.setOptions({
    fontSize: "16pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: false, enableLiveAutocompletion: false
    });

    css.setShowPrintMargin(false);
    css.setBehavioursEnabled(false);



    window.js = ace.edit("js");
    js.setTheme("ace/theme/monokai");
    js.session.setMode("ace/mode/js");

    js.getSession().on('change', function() {
        update();
      });
      

    //   js.focus();
      

      js.setOptions({
        fontSize: "16pt",
        showLineNumbers: true,
        showGutter: true,
        vScrollBarAlwaysVisible:true,
        enableBasicAutocompletion: false, enableLiveAutocompletion: false
      });

      js.setShowPrintMargin(false);
      js.setBehavioursEnabled(false);
    }

    setupEditor();
    update();



let isMiddleDragging = false;

// SONRADAN
let isHtmlToCssDragging = false;
let isCssToJsDragging = false;

function ResetSizes() {
  let containerSizes = document.getElementById("container");
  containerSizes.style.gridTemplateColumns = "1fr 6px 2fr";

  // SONRADAN
  let editorAreaSizes = document.getElementById("editorArea");
  editorAreaSizes.style.gridTemplateRows = "30px 1fr 6px 30px 1fr 6px 30px 1fr";
}


function StartMiddleDrag() {
    console.log("mouse down");
  
    isMiddleDragging = true;
}

  function StartHtmlToCssDrag(){
    console.log("html to css")
    isHtmlToCssDragging = true;
  }

  function StartCssToJsDrag() {
    console.log("css to js");
    isCssToJsDragging = true;
  }


function EndDrag() {
  console.log("ended middie");
  isMiddleDragging = false;

  isHtmlToCssDragging = false;
  isCssToJsDragging = false;
}

function OnMiddleDrag(event) {
	if(isMiddleDragging) {
    console.log("Dragging Middle");
    console.log(event);
		
		let container = document.getElementById("container");
		let editorArea = document.getElementById("editorArea");
		let liveFrame = document.getElementById("live-frame");	
		
		let editorAreaWidth = isMiddleDragging ? event.clientX : editorArea.clientWidth;
		let liveFrameWidth = isMiddleDragging ? container.clientWidth - event.clientX : liveFrame.clientWidth;
		
		let dragbarWidth = 6;
		
		let cols = [
			editorAreaWidth,
			dragbarWidth,
			liveFrameWidth
		];
		
		let newColDefn = cols.map(c => c.toString() + "px").join(" ");
			
		console.log(newColDefn);
		container.style.gridTemplateColumns = newColDefn;
		
		event.preventDefault()
  }
  if(isHtmlToCssDragging || isCssToJsDragging) {
		console.log("Dragging");
		//console.log(event);
		
		let editorAreaa = document.getElementById("editorArea");
		let htmlrow = document.getElementById("html");
		let jsrow = document.getElementById("js");	
		
		let htmlRowHeight = isHtmlToCssDragging ? event.clientY : htmlrow.clientHeight;
		let jsRowHeight = isCssToJsDragging ? editorAreaa.clientHeight - event.clientY : jsrow.clientHeight;
		
    let dragbarHeight = 6;
    let topboxx = 30;
		
		let rows = [
      topboxx,
			htmlRowHeight,
      dragbarHeight,
      topboxx,
			editorAreaa.clientHeight - (2*dragbarHeight) - htmlRowHeight - jsRowHeight - (3*topboxx),
      dragbarHeight,
      topboxx,
			jsRowHeight
		];
		
		let newRowDefn = rows.map(d => d.toString() + "px").join(" ");
			
		console.log(newRowDefn);
		editorAreaa.style.gridTemplateRows = newRowDefn;
		
		event.preventDefault()
	}
}

