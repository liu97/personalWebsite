var request_data;
$(function(){
    random_color($('.blogs_header_aside_li_a'));
    var requests = get_request();
    var request_id = requests['id'] ? requests['id'] : 0;
    var article_url = '/articles/' + request_id;
    $.ajax({
        url: article_url,
        method: 'get',
        success: function(data){
            request_data = data.info.list[0];
            format_article();
        },
        error: function(err){
            alert("该文章走丢了")
            console.log(err);
        }
    })
})
// 初始化文章
function format_article(){
    $('#article_h1').text(request_data.title);
    let a_time = request_data.upload_time.split('/');
    a_time = ' ' + a_time[0] + '-' + a_time[1] + '-' + a_time[2] + ' ' + a_time[3]+':' + a_time[4]+':' + a_time[5];
    $('#article_calendar').text(a_time);
    $('#content').val(request_data.article_content);
    editor("article_content");
}
// 显示文章
function editor(id){
    testEditor = editormd.markdownToHTML(id, {//注意：这里是上面DIV的id
        htmlDecode: "style,script,iframe",
        emoji: true,
        taskList: true,
        tex: true, // 默认不解析
        flowChart: true, // 默认不解析
        sequenceDiagram: true, // 默认不解析
        codeFold: true,
        Theme : "dark",
    }); 
}