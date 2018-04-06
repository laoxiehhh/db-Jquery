(function () {
    var value = decodeURI(location.href.split('?q=')[1]);
    var startNum = 0;
    var allNum = null;
    var newNum = null;
    function getData (value, startNum) {
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/search',
            dataType: 'jsonp',
            data: 'q=' + value + '&count=15' + '&start=' + startNum,
            success: addDom
        })
    }
    getData(value);
    function addDom (data) {
        console.log(data);
        $('.search-content h1').html('搜索 ' + value);    
        if (data.total > 0) {
            allNum = Math.ceil(data.total / 15);
            var str = '';
            var musicArr = data.musics;
            if (musicArr.length > 0) {
                musicArr.forEach(function (ele, index) {
                    if (ele.image) {
                        str += ' <li><img src=' + ele.image + '>\
                                    <div class="item-text">';
                    } else {
                        str += ' <li><img src="">\
                                    <div class="item-text">';
                    }
                    if (ele.title) {
                        str += '<div class="item-title">' + ele.title + '</div>\
                                    <div class="item-mark">';
                    } else {
                        str += '<div class="item-title"></div>\
                                    <div class="item-mark">';
                    }
                    if (ele.rating.average) {
                        var num = Math.round(Number(ele.rating.average));
                        var disY = 15 * num - 150;
                        str += '<span class="mark-img" style="background-position: 0 ' + disY + 'px;"></span>\
                        <span class="mark-num">' + ele.rating.average + '</span>';
                    } else {
                        str += '<span class="mark-img" style="background-position: 0 -150px;"></span>\
                        <span class="mark-num"></span>';
                    }
                    if (ele.rating.numRaters) {
                        str += '<span class="mark-all">(' + ele.rating.numRaters + '人评价)</span>';
                    } else {
                        str += '<span class="mark-all"></span>';
                    }
                    if (ele.attrs) {
                        str += '</div>\
                        <div class="item-meta">' + ele.attrs.singer + '/' + ele.attrs.pubdate + '/' + ele.attrs.version + '/' + ele.attrs.media + '</div>\
                                </div>\
                            </li>';          
                    } else {
                        str += '</div>\
                        <div class="item-meta"></div>\
                                </div>\
                            </li>';   
                    }
                })
            }
            $('.main').html(str);
        } else {
            $('.main').html('没有找到关于' + value + '的唱片，换个搜索词试试吧。');
        }
        page({id: 'fanye', nowNum: newNum, allNum: allNum});
    }
    function page(json) {
        console.log(123);
        if (!json.id) return false;
        var $Div = document.getElementById(json.id);            
        var nowNum = json.nowNum;
        var allNum = json.allNum;
        
        // 首页
        if (nowNum > 5 && allNum >= 10) {
            var $A = document.createElement('a');
            $A.href = '#1';
            $A.innerHTML = '首页';
            $Div.appendChild($A);
        }                        
        //上一页
        if (nowNum > 1) {
            var $A = document.createElement('a');
            $A.href = '#' + (nowNum - 1); 
            $A.innerHTML = '上一页';
            $Div.appendChild($A);                
        }
         
        // 9个一组
        if (allNum <= 9) {
            for (var i = 1; i <= allNum; i++) {
                var $A = document.createElement('a');
                $A.href = '#' + i;
                if (nowNum === i) {
                    $A.innerHTML = i;
                }else {
                    $A.innerHTML = '[' + i + ']';    
                }                    
                $Div.appendChild($A);
            }
        }else {
            // 以nowNum数为中心 一共 9个数  向左右两侧扩散5 - 1 个数
            for (var i = 1; i <= 9; i++) {
                var $A = document.createElement('a');
                // 当前页数 小于5 时 向左扩散会出现小于1的书 要做特殊处理
                if (nowNum < 5) {
                    $A.href = '#' + i;
                    if (nowNum === i) {
                        $A.innerHTML = i;
                    }else {
                        $A.innerHTML = '[' + i + ']';     
                    }                          
                }else if (allNum - nowNum < 4) {
                    // 最后几页向右扩散 时也会出问题  所以阻止扩散 只显示最后九页                        
                    $A.href = '#' + (allNum - 9 + i);
                    // 特殊处理后4几页
                    if ( (allNum - nowNum) === 0 && i === 9 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }else if ( (allNum - nowNum) === 1 && i === 8 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }else if ( (allNum - nowNum) === 2 && i === 7 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }
                    else if ( (allNum - nowNum) === 3 && i === 6 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }        
                                                                                        
                    else {
                        $A.innerHTML = '['+ (allNum - 9 + i) + ']';                            
                    }                                                 
                }
                // 正常处理方式 以nowNum为中心 向两侧扩散 4个数
                else {
                    $A.href = '#' + (nowNum - 5 + i); 
                    if (i === 5) {
                        $A.innerHTML = nowNum - 5 + i;
                    }else {
                        $A.innerHTML = '[' + ( nowNum - 5 + i ) + ']';
                    }    
                }
                $Div.appendChild($A);                      
            }
        }    
        
        // 尾页
        if ( (allNum - nowNum) > 5) {
            var $A = document.createElement('a');
            $A.href = '#' + allNum;
            $A.innerHTML = '尾页';
            $Div.appendChild($A);                
        }
        // 下一页
        if ((allNum -nowNum) > 0) {
            var $A = document.createElement('a');
            $A.href = '#' + (nowNum + 1); 
            $A.innerHTML = '下一页';
            $Div.appendChild($A);                 
        }          
                     
        var $All = document.getElementsByTagName('a');            
        for (var i = 0; i < $All.length; i++) {
            $All[i].onclick = function () {                    
                var nowNum = parseInt(this.getAttribute('href').substring(1));
                $Div.innerHTML = '';
                startNum = (nowNum - 1) * 15;
                newNum = nowNum;
                getData(value, startNum);              
            }
        }                                                                                                                       
    }            
}())