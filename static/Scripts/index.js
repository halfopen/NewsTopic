var effects = new Array("bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp"); // 出现特效

$(document).ready(function(){
    //$(".export_excel").on("click", export_excel);
    $(".submit-search").on("click", submit_search);
    //$(".free-tables-search").on("click", get_free_tables);

   // $(".staff-nav").addClass("active");
   // $(".index-nav").removeClass("active");
    
    $(".remove-meal").click(remove_booking);

    $(".table-list").click(select_table_list);
    $(".table-list-selected").click(unselect_table_list);

    $(".table_submit").on("click", booking_table);
    $(".add-book").on("click", add_book);
    $(".update-book").on("click", update_book);
    // 给meal-list添加动态载入特效
    $(".meal-list").each(function(index,value){
        console.log(index);
        console.log(value);
        $(this).removeClass("pulse");
        $(this).addClass(effects[ RandomNum(0,5) ]);

    });
    fun("9gxxxx9",0);
});


function fun(str, index){
	if(index==str.length)return;
	console.log(str[index]);
	fun(index);
	//fun()
}


function update_book(){
	console.log("update");
	bookname = $("#book-name").val();
	bookprice = $("#book-price").val();
	id = $(this).attr("bookid");
	console.log(id);
	
	if(bookname.length==0){
		bootbox.alert("<h1>书名不能为空！</h1>", function() {
            this.hide();
            //$(".screen-mask").addClass("none");
            //window.location.href="http://www.myooms.com:8000/staff/";
        });
	}
	
	bookprice_num = parseFloat(bookprice);
	
	console.log(bookname.length);
	console.log(bookprice_num);
	
	$.ajax({
        type:"POST",
        url:"servlet/UpdateBook",
        //提交的数据
        data:{id:id,bookname:bookname, bookprice:bookprice_num},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
        if(data == "true")
        {
            bootbox.alert("<h1>更新成功！</h1>", function() {
                this.hide();
                //window.location="";
            });

        }
        else{
            bootbox.alert("<h1>"+data+"</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
        }   ,
        error: function(){
        }
	});
	console.log("end");
	
}

function add_book(){
	console.log("add");
	bookname = $("#book-name").val();
	bookprice = $("#book-price").val();
	
	if(bookname.length==0){
		bootbox.alert("<h1>书名不能为空！</h1>", function() {
            this.hide();
            //$(".screen-mask").addClass("none");
            //window.location.href="http://www.myooms.com:8000/staff/";
        });
	}
	
	bookprice_num = parseFloat(bookprice);
	
	console.log(bookname.length);
	console.log(bookprice_num);
	
	$.ajax({
        type:"POST",
        url:"servlet/AddBook",
        //提交的数据
        data:{bookname:bookname, bookprice:bookprice_num},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
        if(data == "true")
        {
            bootbox.alert("<h1>添加成功！</h1>", function() {
                this.hide();
                
            });

        }
        else{
            bootbox.alert("<h1>"+data+"</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
        }   ,
        error: function(){
        }
	});
	console.log("end");
}


function booking_table(){
    if(is_submit == false){
        is_submit = true;
    }else{
        return;
    }
    $("div.screen-mask").removeClass("none");
    r_id = $(".reservation").attr("r_id");
    tables_id ="0";
    $(".table-list-selected").each(function(index, value){
       tables_id+="-"+$(this).attr("pk");
    });
    $.ajax({
            type:"POST",
            url:"book_table/",
            //提交的数据
            data:{r_id:r_id, tables_id:tables_id},
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            success:function(data){
            if(data == "True")
            {
                bootbox.alert("<h1>Ok</h1>", function() {
                    this.hide();
                    $(".screen-mask").addClass("none");
                    window.location.href="http://www.myooms.com:8000/staff/";
                });

            }
            else{
                bootbox.alert("<h1>"+data+"</h1>", function() {
                    this.hide();
                    $(".screen-mask").addClass("none");
                });
            }
            }   ,
            error: function(){
            }
    });
    is_submit = false;
}

function unselect_table_list(){
    total_size = $("#total_size").html();
    table_size = $(this).attr("size");
    total_size = parseInt(total_size);
    table_size = parseInt(table_size);
   // alert(total_size + " "+ table_size);
    t = 0;
    t = total_size - table_size;
    $(this).addClass("table-list");
    $(this).removeClass("table-list-selected");
    $(this).unbind("click", unselect_table_list);
    $(this).bind("click",select_table_list);
    $("#total_size").html(t);

    number = parseInt($(".reservation_number").attr("number"));

    if(t >= number){
        $(".book_table").addClass("btn-green");
        $(".book_table").addClass("table_submit");
        $(".book_table").bind("click", booking_table);
    }else{
        $(".book_table").removeClass("btn-green");
        $(".book_table").removeClass("table_submit");
        $(".book_table").unbind("click", booking_table);
    }
}

function select_table_list(){
    total_size = $("#total_size").html();
    table_size = $(this).attr("size");
    total_size = parseInt(total_size);
    table_size = parseInt(table_size);
    //alert(total_size + " "+ table_size);
    t = 0;
    t = total_size + table_size;
    $(this).addClass("table-list-selected");
    $(this).removeClass("table-list");

    $(this).unbind("click",select_table_list);
    $(this).bind("click", unselect_table_list);
    $("#total_size").html(t);

    number = parseInt($(".reservation_number").attr("number"));

    if(t >= number){
        $(".book_table").addClass("btn-green");
        $(".book_table").addClass("table_submit");
        $(".book_table").bind("click", booking_table);
    }else{
        $(".book_table").removeClass("btn-green");
        $(".book_table").removeClass("table_submit");
        $(".book_table").unbind("click", booking_table);
    }
}

function spin_color(){
    console.log("spin");
    $(".spin img").each(function(i){
        i = parseInt(Math.random()*6)+1;
        console.log("asdfasdf");
        path = "static/img/spin/"+i+".png";
        $(this).attr("src", path);
        $(this).addClass("animated");
        $(this).addClass("fadeInDownBig");

        console.log($(this));
  });
}

// 移除订单
function remove_booking(){
    console.log("删除");
    var r_id = $(this).attr("pk");
    console.log(r_id);
    t = $(this);
    t.removeClass("pulse");
    t.parent().addClass("slideOutUp").fadeOut(800);
    //return;
    $.ajax({
            type:"GET",
            url:"servlet/RemoveBook",
            //提交的数据
            data:{id:r_id},
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            success:function(data){
            if(data == "True")
            {
                bootbox.alert("<h1>移除成功</h1>", function() {
                    console.log("ok");
                });
            }
            else{
                alert("移除失败");
            }
            }   ,
            error: function(){
            }
    });

}



function submit_search(){
	var l_price = $("#l_price").val();
	var h_price = $("#h_price").val();
	
	
	
	l_price_num = parseFloat(l_price);
	h_price_num = parseFloat(h_price);
	
	if( isNaN(l_price_num) && isNaN(h_price_num) ){
		bootbox.alert("<h1>请输入至少一个价格范围</h1>", function() {
            this.hide();
           
        });
		 return;
	}
	
	
	
	if(isNaN(l_price_num))l_price_num = -100000000;
	if(isNaN(h_price_num))h_price_num = 100000000;
	
	url="servlet/SearchBook?l_price="+l_price_num+"&h_price="+h_price_num; 
	
	book_container = $(".free-tables-container");
	book_container.html("");
	
	$.ajax({
        type:"GET",
        url:url,
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
            if(data=="False"){
                bootbox.alert("<h1>请输入搜索条件</h1>", function() {
                    this.hide();
                });
            }else{
                console.log(data);
                books = eval('(' + data + ')');
                //console.log(3);
                if(books.length==0){
                	bootbox.alert("<h1>无满足条件的书籍</h1>", function() {
                        this.hide();
                    });
                }else{
                for(i=0;i<books.length;i++){
                    book = books[i];
                    //console.log(book);
                    book_html = $('<div  class="animated pulse row-content col-lg-2 col-sm-4 col-xs-12 text-center meal-list invalid-meal-list">'+
                            ' <div class="remove-meal btn btn-danger btn-xs " pk="'+book.bookid+'" >移除</div>'+
                            '<span class="spin"><img src="static/img/spin/'+((i%6)+1)+'.png"></span>'+
                            '<div class="text-bold text-center singel-line text-success">书名:'+book.bookname+'</div>'+
                            '<div class="">&nbsp;</div>'+
                            '<div class="singel-line text-left text-info">书号:'+book.bookid+'&nbsp</div>'+
                            '<div class="text-left singel-line">价格:'+book.bookprice+'</div>'+
                            '<div class="text-left singel-line">&nbsp</div>'+
                            '<div class="row">'+
                                '<a target="_blank" href="book_detail.jsp?id='+book.bookid+' " class=" col-md-12 btn btn-sm btn-info" style="cursor: pointer; padding-right: 1%;" >详情</a>'+
                            '</div>'+
                          '</div>');
                    //table_html.hide();
                    //console.log(2);
                    book_container.append( book_html);
                    //console.log(1);
                    book_html.addClass(effects[RandomNum(0,5)]);
                    $(book_html).children(".remove-meal").bind("click", remove_booking);
                    //table_html.slideDown("slow");
                }
                }
            }
           $(".screen-mask").addClass("none");
        },
        error: function(){
            bootbox.alert("<h1>请求失败</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
    });
	
	spin_color();//TODO 添加失败
}

function get_free_tables(){
    time = $(".search-time").val();
    date = $(".search-date").val();
    $("div.screen-mask").removeClass("none");
    datas = {time:time, date:date};
    table_container = $(".free-tables-container");
    reservations_container = $(".reservations-container");
    var effects = new Array("bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp"); // 出现特效
    $.ajax({
        type:"POST",
        url:"./",
        data:datas,
        datatype: "html",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
            if(data=="False"){
                bootbox.alert("<h1>请输入搜索条件</h1>", function() {
                    this.hide();
                });
            }else{
                //console.log(data);

                data = data.replace("\"","" );
                tables = data.split(",");
                table_container.html(" ");
                for(i=0;i<tables.length-1;i++){
                    table_num = parseInt(tables[i]);
                    console.log(table_num);
                    table_html = $('<div class="animated col-md-1 text-center meal-list table-list">' +
                            '<a style="color:white" target="_blank" href="../staff/table_detail?id='+table_num+'">'+table_num+'号桌子</a></div>');
                    //table_html.hide();
                    table_container.append( table_html);

                    table_html.addClass(effects[RandomNum(0,5)]);
                    //table_html.slideDown("slow");
                }
                count = parseInt(tables[tables.length-1]);
                console.log(count);
                $(".count_free_num").html(count+"个座位空闲");
            }
           $(".screen-mask").addClass("none");
        },
        error: function(){
            bootbox.alert("<h1>请求失败</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
    });

     $.ajax({
        type:"POST",
        url:"http://www.myooms.com:8000/get_reservation/",
        data:datas,
        datatype: "html",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
            if(data=="False"){
                console.log("获取订单失败")
            }else{
                console.log(data);
                data = data.replace("\"","" );
                tables = data.split(",");
                reservations_container.html(" ");
                for(i=0;i<tables.length-1;i++){
                    table_num = parseInt(tables[i]);
                    console.log(table_num);
                    table_html = $('<div class="animated col-md-1 reservations meal-list table-list">' +
                            '<a style="color:white" target="_blank" href="http://www.myooms.com:8000/staff/book_table?id='+table_num+'">'+table_num+'号订单</a></div>');
                    reservations_container.append(table_html);
                    table_html.addClass(effects[RandomNum(0,5)]);
                }
                count = parseInt(tables[tables.length-1]);
                console.log(count);
                $(".count_reservations_num").html("这天有"+count+"个订单");
            }
        },
        error: function(){

        }
    });
}

function submit_suggestion() {

    name = $("input.name").val();
    suggestion = $("textarea.suggestion").val();
    connect_way = $("input.connect_way").val();
    like_or_unlike = $("input.like_or_unlike").val();
    datas = {"name":name, "suggestion":suggestion, "connect_way":connect_way, "like_or_unlike":like_or_unlike};
    console.log(datas);
    $.ajax({
        type:"POST",
        url:"suggestion/",
        data:datas,
        datatype: "html",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
            bootbox.alert(data, function() {
                this.hide();
                $(".screen-mask").addClass("none");
                window.location.href="http://www.myooms.com:8000";
            });
        },
        error: function(){
            bootbox.alert("<h1>error</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
    });
}

function export_excel(){
    $("div.screen-mask").removeClass("none");
    $.ajax({
        type:"GET",
        url:"export_excel/",
        datatype: "html",//"xml", "html", "script", "json", "jsonp", "text".
        success:function(data){
            bootbox.alert("<h1>导出表格成功</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }   ,
        error: function(){
            bootbox.alert("<h1>导出表格出错</h1>", function() {
                this.hide();
                $(".screen-mask").addClass("none");
            });
        }
    });
}
