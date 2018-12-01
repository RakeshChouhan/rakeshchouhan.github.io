(function(){
    "use strict"
    
    
    function initXHR(){
        let url = "https://api.github.com/users/rakeshchouhan/repos";
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                resultCallBack(JSON.parse(xhr.responseText));
            }
        } ;
        xhr.open("GET",url, false);
        xhr.send();
    }
    function resultCallBack(data){
        let tmpl = "";
        for(var i=0;i<data.length; i++){
            tmpl+=parse(data[i])
            console.log(data[i]);

        }
        //document.getElementById("projectContainer").innerHTML = tmpl;
        console.log(tmpl);
    }
    function parse(data){
        var tmpl = template();
        var c= new RegExp();
        c.compile("[^\{]+(?=\})");
        var runLoop = true;
        var result = "";
        var finalTmpl = "";
        while(true){
           result =   c.exec(tmpl);
           if(result === null){
               break;
           }
           result = result[0];
           finalTmpl += tmpl.replace("{"+result+"}", data[result]);
           tmpl=finalTmpl;
        }
        return finalTmpl;

    }
    var template = function(){return "<ul> <li>{name}</li></ul>"}

   window.onload =  initXHR;

})();