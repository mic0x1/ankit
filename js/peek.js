var peekContent;

$(document).ready(function(){
    $("#id-request-wrap").css("display", "flex");
    if(getUrlParameter('id')){
        if(checkURLExists("/data/peek/" + getUrlParameter('id') + ".json")){
            $.getJSON("/data/peek/" + getUrlParameter('id') + ".json", function(data){
                $("#id-request-wrap").css("display", "none");
                $("#peek-content-page-wrap").css("display", "flex");
                peekContent = data;
                $("#page-title").text(peekContent.title);
                $("#content-box .title").text(`${peekContent.title} (Ver. ${peekContent.version})`);
                intialContent();
            });
        }
        else{
            alert("文件不存在");
        }
    }
});

function intialContent(){
    var List = shuffleArray(peekContent["list"]);
    console.log(List);
    var temp;
    for(let i = 0; i < List.length; i++){
        temp = List[i].replace(/\[/g,"<peek>").replace(/\]/g,"</peek>");
        $("#content-box .content ol").append(`<li>${temp}</li>`);
    }
}