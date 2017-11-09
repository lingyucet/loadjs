/*!
 * jsLoader
 * Copyright(c) 2017 Eugene <1101318470@qq.com>
 * MIT Licensed
 */
   var jsLoader =  (function(options){
        "use strict";

        options || (options = {});

        var defaults = {

            jsUrls       : [], //url
            jsIndex      : 0,  //默认不改动
            sequenceSync : true  //false为同步  true为异步;

        };


        // Set default options
        for (var name in defaults) {
            //console.log(name);
            !(name in options) && (options[name] = defaults[name]);
        }


        if(options.sequenceSync === true){
            syncLoad(true); //dom 加载比较快 后续js必须按顺序加载
        }else{
            syncLoad(false); //dom 稍微慢点 后续js加载可同时并行
        }

        
        function syncLoad(loadType) {
            //dom loaded  and download js
            if(window.addEventListener){  //chrome
                window.addEventListener("load",loadOrder(loadType), false);
            }else if(window.attachEvent){  //ie
                window.attachEvent("onload",function () {
                    loadOrder(loadType);
                });
            }else window.onload = loadOrder(loadType);
        }


        function downloadJSAtOnload(getUrl,booleanValue,callback) { //加载JavaScript

            var element = document.createElement("script"); //创建script

            if (element.readyState) {//脚本加载的状态
                element.onreadystatechange = function() { //ie
                    if (element.readyState === 'complete' || element.readyState === 'loaded') {
                        callback(); //callback函数
                    }
                }
            } else {
                element.onload = function() {
                    callback(); //callback函数
                }
            }

            element.defer = booleanValue;
            element.src = getUrl;
            document.body.appendChild(element);  //插入函数
        }


        //设置js插入顺序  需要考虑js加载先后问题时执行
        function loadOrder(syncType) {

            var urlList = options.jsUrls[options.jsIndex]; //url

            if(syncType === true){ //按照顺序下载
                downloadJSAtOnload(urlList,false,function(){

                    console.log(options.jsIndex + ' download ' + urlList);

                    options.jsIndex++;

                    if(options.jsIndex < options.jsUrls.length){
                        setTimeout(function () {
                            loadOrder(syncType);
                        },0);
                    }else{
                        console.log("all script loaded");
                    }

                });

            }else{  //不分先后顺序下载

                downloadJSAtOnload(urlList,true,function(){
                    console.log(' download ' + urlList);
                });

                options.jsIndex++;

                if(options.jsIndex < options.jsUrls.length){
                    setTimeout(function () {
                        loadOrder(syncType);
                    },0);
                }

            }

        }

    });

