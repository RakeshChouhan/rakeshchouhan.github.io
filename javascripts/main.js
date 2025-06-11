
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
        data= data.sort(function(a,b){ a = new Date(a.updated_at);
            b = new Date(b.updated_at);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        for(var i=0;i<data.length; i++){
            tmpl+=parse(data[i])
        }
        document.getElementById("total-project").innerHTML = `(${data.length})`;

        document.getElementById("project-list").innerHTML = tmpl;
        
    }
    function parse(data){
        var tmpl = template();
        var c= new RegExp();
        c.compile("[^\{]+(?=\})");
        var runLoop = true;
        var result = "";
        var finalTmpl = tmpl;
        while(true){
           result =   c.exec(finalTmpl);
           if(result === null){
               break;
           }
           result = result[0];
           let info = data[result];
           if(info==null){
             info="-NA-"
           }
           finalTmpl = finalTmpl.replace("{"+result+"}", info);
           //tmpl=finalTmpl;
        }
        return finalTmpl;

    }
    var template = function(){return " <div class='project'> <h3>{name}</h3><p>{description}</p><a href='{html_url}'>{html_url}</a></div>"}

   window.onload =  initXHR;

})();