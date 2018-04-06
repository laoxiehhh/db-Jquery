(function () {
    $('.input').on('input', debounce(function () {
        var value = $(this).val();
        getData(value);
    }, 500));
    $A = $('.nav-search a');
    //防抖函数
    function debounce (func, time, flag) {
        var timer = null;
        var debounced = function () {
            var that = this;
            var argu = arguments;
            clearTimeout(timer);
            if (flag) {
                if (!timer) {
                    func.apply(that, argu);
                }
                timer = setTimeout(function () {
                    timer = null;
                }, time);
            } else {
                timer = setTimeout(function () {
                    func.apply(that, argu);
                }, time);
            }
        }
        debounced.cancel = function () {
            clearTimeout(timer);
            timer = null;
        }
        return debounced;
    }
    function getData (value) {
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/search',
            dataType: 'jsonp',
            data: 'q=' + value + '&count=7',
            success: addDom
        })
    }
    function addDom (data) {
        var value = $('.input').val();
        $A.attr('href', 'http://localhost/douban/searchPage.html?q=' + value);
        if (data.count > 0) {
            var musicArr = data.musics;
            var str = '';
            if (musicArr.length > 0) {
                musicArr.forEach(function (ele, index) {
                    if (ele.image) {
                        str += '<li><a href="http://localhost/douban/listPage.html?' + ele.id + '">\
                                    <img src=' + ele.image + '>';
                    } else {
                        str += '<li><a href="http://localhost/douban/listPage.html?' + ele.id + '">\
                                    <img src="">';
                    }
                    if (ele.title && ele.title.length < 20) {
                        str += '<div>\
                                    <p>' + ele.title + '</p>';
                    } else {
                        str += '<div>\
                                    <p></p>';
                    }
                    if (ele.author) {
                        str += '<p>' + ele.author[0].name + '</p>\
                            </div>'
                    } else {
                        str += '<p></p>\
                        </div>'
                    }
                    str += '</a></li>';
                });
                $('.search-item ul').html(str);
                $('.search-item').show();
            }
        } else {
            $('.search-item').hide();
        }
    }   
}())