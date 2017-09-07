$(function () {
    //导航部分菜单栏
    $.ajax({
        url: 'http://localhost:9900/api/nav',
        dataType: 'json',
        success: function (data) {
            // console.log(data);   
            $('#nav ul').append(template('navItems', data));
        }
    })
    // 下滑nav
    $('#nav').on('mouseenter', 'li', function () {
        var $this = $(this).attr("type");
        // console.log($this);
        //服务社区隐藏 
        if ($this == false) {
            return;
        }
        $.ajax({
            dataType: 'json',
            url: 'http://localhost:9900/api/nav',
            data: 'type=' + $this,
            success: function (data) {
                console.log(data);
                var navContent = template('navContent', data);
                // console.log(navContent);
                $('#downNav ul').html(navContent);
                $('#downNav').stop().slideDown(1000);
            }
        })
    })
    $('#downNav').mouseleave(function () {
        $(this).stop().slideUp(1000);
    })
    // 轮播ajax
    $.ajax({
        url: 'http://localhost:9900/api/lunbo',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var slidePic = template('slidePic', data);
            // console.log(slidePic);
            $('#slide').append(slidePic);
        }
    })
    // 轮播
    $('#slide').on('click', '.right', function () {
        turnRight();
    })
    $('#slide').on('click', '.left', function () {
        if (flag) {
            flag = false
            if (spanIndex == 1) {
                spanIndex = 5;

            } else {
                spanIndex--;
            }
            // console.log($('#slide a').attr('data-id'));
            // console.log(spanIndex);
            for (var i = 0; i < $('#slide a').length; i++) {
                $('#slide a').stop().fadeOut(500);
                $('#slide a').eq(spanIndex - 1).stop().fadeIn(500);
            }
            setTimeout(function () {
                flag = true;
            }, 1500)
        }
    })
    var slideId = setInterval(turnRight, 5000);
    $('#slide').mouseover(function () {
        clearInterval(slideId);
    })
    $('#slide').mouseout(function () {
        slideId = setInterval(turnRight, 5000);
    })
    //轮播侧边导航asideNav
    $.ajax({
        url: 'http://localhost:9900/api/items',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var asideNav = template('asideNav', data);
            $('#slide .asideNav').append(asideNav);
        }
    })
    //轮播侧边导航内容articleNav
    $('#slide').on('mouseenter', ".asideNav li", function () {
        var articleNavType = $(this).attr('data-type');
        // console.log(articleNavType);
        $.ajax({
            url: 'http://localhost:9900/api/items',
            dataType: 'json',
            data: 'type=' + articleNavType,
            success: function (data) {
                console.log(data);
                var articleNav2 = template('articleNav', data);
                $('#slide .articleNav').html(articleNav2);
                $('#slide .articleNav').stop().show();
                if ($(".articleNav ul li").length <= 6) {
                    $(".articleNav ul").css({
                        'width': '265px'
                    });
                } else if ($(".articleNav ul li").length <= 12) {
                    $(".articleNav ul").css({
                        'width': '530px'
                    });
                } else if ($(".articleNav ul li").length <= 18) {
                    $(".articleNav ul").css({
                        'width': '795px'
                    });
                }
            }
        })

    })
    $('#slide .articleNav').mouseleave(function () {
        $(this).stop().hide();
    })
    //智能硬件
    $.ajax({
        url: 'http://localhost:9900/api/hardware',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var hardware = template('hardware', data);
            // console.log(hardware);
            $('#mi-star article ul').html(hardware);
        }
    })


    //搭配
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'match'
        },
        success: function (data) {
            // console.log(data);
            var matchMoban = template('matchMoban', data);
            // console.log(matchMoban);
            $('#match').html(matchMoban);
        }
    })
    // 搭配 tab栏
    $('#match').on('mouseenter', '.title span', function () {
        var spanKey = $(this).attr('data-key');
        console.log(spanKey);
        for (var i = 0; i < $('#match .title span').length; i++) {
            $('#match .title span').css({
                "borderBottom": 0,
                "color": "#000"
            });
            $(this).css({
                "borderBottom": '2px solid #ff6700',
                "color": '#ff6700'
            });
        }
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: {
                key: spanKey
            },
            success: function (data) {
                // console.log(data);
                var match2 = template('match2', data);
                // console.log(match2);
                $('#match ul').html(match2);
            }
        })
    })

    // 配件
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'accessories'
        },
        success: function (data) {
            // console.log(data);
            var accessMoban = template('accessMoban', data);
            // console.log(matchMoban);
            $('#accessories').html(accessMoban);
        }
    })
    // 配件 tab栏
    $('#accessories').on('mouseenter', '.title span', function () {
        var spanKey = $(this).attr('data-key');
        // console.log(spanKey);
        for (var i = 0; i < $('#accessories .title span').length; i++) {
            $('#accessories .title span').css({
                "borderBottom": 0,
                "color": "#000"
            });
            $(this).css({
                "borderBottom": '2px solid #ff6700',
                "color": '#ff6700'
            });
        }
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: {
                key: spanKey
            },
            success: function (data) {
                // console.log(data);
                var accessMoban2 = template('accessMoban2', data);
                // console.log(match2);
                $('#accessories ul').html(accessMoban2);
            }
        })
    })


    // 周边
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'around'
        },
        success: function (data) {
            // console.log(data);
            var ambMoban = template('ambMoban', data);
            // console.log(matchMoban);
            $('#ambitus').html(ambMoban);
        }
    })
    // 配件 tab栏
    $('#ambitus').on('mouseenter', '.title span', function () {
        var spanKey = $(this).attr('data-key');
        // console.log(spanKey);
        for (var i = 0; i < $('#ambitus .title span').length; i++) {
            $('#ambitus .title span').css({
                "borderBottom": 0,
                "color": "#000"
            });
            $(this).css({
                "borderBottom": '2px solid #ff6700',
                "color": '#ff6700'
            });
        }
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: {
                key: spanKey
            },
            success: function (data) {
                // console.log(data);
                var ambMoban2 = template('ambMoban2', data);
                // console.log(match2);
                $('#ambitus ul').html(ambMoban2);
            }
        })
    })

    // 推荐  #recommend
    var recommendIndex = 1;
    $.ajax({
        url: 'http://127.0.0.1:9900/api/recommend',
        dataType: 'json',
        data: {
            'page': recommendIndex
        },
        success: function (data) {
            // console.log(data);
            var recomUBanban = template('recomUBanban', data);
            // console.log(recomUBanban);
            $('#recommendU article ul').html(recomUBanban);
            // var recomUSpans = $('#recommendU .title span');
            $('#recommendU .title .turnRight').click(function () {
                recommendIndex++;
                if (recommendIndex >= 4) {
                    $(this).addClass('disabled');
                    recommendIndex = 4;
                    // return;
                } else {
                    $('#recommendU .title span').removeClass('disabled');
                }

                // console.log(recommendIndex);
                $.ajax({
                    url: 'http://127.0.0.1:9900/api/recommend',
                    dataType: 'json',
                    data: {
                        'page': recommendIndex
                    },
                    success: function (data) {
                        // console.log(recommendIndex);
                        recomUBanban = template('recomUBanban', data);
                        $('#recommendU article ul').append(recomUBanban);
                        $('#recommendU article ul').css({
                            'transform': 'translateX(-' + 1226 * (recommendIndex - 1) + 'px)',
                            'transition': 'all .5s'
                        })
                    }
                })
            })
            $('#recommendU .title .turnLeft').click(function () {
                recommendIndex--;
                if (recommendIndex <= 1) {
                    $(this).addClass('disabled');
                    recommendIndex = 1;
                } else {
                    $('#recommendU .title span').removeClass('disabled');
                }

                console.log(recommendIndex);
                $.ajax({
                    url: 'http://127.0.0.1:9900/api/recommend',
                    dataType: 'json',
                    data: {
                        'page': recommendIndex
                    },
                    success: function (data) {
                        console.log(recommendIndex);
                        recomUBanban = template('recomUBanban', data);
                        $('#recommendU article ul').append(recomUBanban);
                        $('#recommendU article ul').css({
                            'transform': 'translateX(-' + 1226 * (recommendIndex - 1) + 'px)',
                            'transition': 'all .5s'
                        })
                    }
                })
            })
        }
    })

    //热评 #Hot_Comments
    $.ajax({
        url: 'http://127.0.0.1:9900/api/hotcomment',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
})


//轮播封装函数
var spanIndex = 1;
var flag = true;

function turnRight() {
    if (flag) {
        flag = false
        if (spanIndex == 5) {
            spanIndex = 1;
        } else {
            spanIndex++;
        }
        // console.log($('#slide a').attr('data-id'));
        // console.log(spanIndex);
        for (var i = 0; i < $('#slide a').length; i++) {
            $('#slide a').stop().fadeOut(500);
            $('#slide a').eq(spanIndex - 1).stop().fadeIn(500);
        }
        setTimeout(function () {
            flag = true;
        }, 1000)
    }
}