(function () {
    var id = location.href.split('?')[1];
    function getData (id) {
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/' + id,
            dataType: 'jsonp',
            success: addDom 
        });
    }
    getData(id);
    function addDom (data) {
        // console.log(data);
        // console.log(data.title);
        // console.log(data.author);
        // console.log(data.attrs.version);
        // console.log(data.attrs.media);
        // console.log(data.attrs.pubdate);
        // console.log(data.attrs.publisher);
        // console.log(data.attrs.discs);
        // console.log(data.rating.average);
        // console.log(data.rating.numRaters);
        if (data) {
            var str = '';
            if (data.title) {
                str += '<h1>' + data.title + '</h1>';
            } else {
                str += '<h1></h1>';
            }
            if (data.image) {
                str += '<div class="cont-main">\
                            <img src=' + data.image + '>\
                            <div class="cont-text">';
            } else {
                str += '<div class="cont-main">\
                            <img src="">\
                            <div class="cont-text">';
            }
            if (data.author) {
                str += '<span>表演者:</span>&nbsp;' + data.author[0].name + '<br>';
            } else {
                str += '<span>表演者:</span>&nbsp;<br>';
            }
            if (data.attrs.version) {
                str += '<span>专辑类型:</span>&nbsp;' + data.attrs.version[0] + '<br>';
            } else {
                str += '<span>专辑类型:</span>&nbsp;<br>';
            }
            if (data.attrs.media) {
                str += '<span>介质:</span>&nbsp;' + data.attrs.media[0] + '<br>';
            } else {
                str += '<span>介质:</span>&nbsp;<br>';            
            }
            if (data.attrs.pubdate) {
                str += '<span>发行时间:</span>&nbsp;' + data.attrs.pubdate[0] + '<br>';
            } else {
                str += '<span>发行时间:</span>&nbsp;<br>';
            }
            if (data.attrs.publisher) {
                str += '<span>出版者:</span>&nbsp;' + data.attrs.publisher[0] + '<br>';
            } else {
                str += '<span>出版者:</span>&nbsp;<br>';
            }
            if (data.attrs.discs) {
                str += '<span>唱片数:</span>&nbsp;' + data.attrs.discs[0] + '<br>';
            } else {
                str += '<span>唱片数:</span>&nbsp;<br>';
            }
            if (data.rating.average) {
                var num = Math.round(Number(data.rating.average));
                var disY = 15 * num - 150;
                str += '</div>\
                        <div class="cont-mark">\
                            <div class="mark-logo">豆瓣评分</div>\
                            <span class="mark-num">' + data.rating.average + '</span>\
                            <div class="mark-wrap">\
                                <span class="mark-img" style="background-position: 0 ' + disY + 'px;"></span><br>';           
            } else {
                str += '</div>\
                        <div class="cont-mark">\
                            <div class="mark-logo">豆瓣评分</div>\
                            <span class="mark-num"></span>\
                            <div class="mark-wrap">\
                                <span class="mark-img" style="background-position: 0 0;"></span><br>';             
            }
            if (data.rating.numRaters) {
                str += '<span class="mark-person">' + data.rating.numRaters + '人评价</span>\
                        </div>\
                    </div>\
                </div>';
            } else {
                str += '<span class="mark-person"></span>\
                        </div>\
                    </div>\
                </div>';
            }
        }
        $('.content').html(str);
    }
}());