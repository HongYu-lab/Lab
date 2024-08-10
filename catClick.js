function catClick(svg) {
    svg.addEventListener("load", function () {
        const catfound = svg.contentDocument.querySelectorAll('[class^=catNum]');//used by clickEvent
        const catsSVG = svg.contentDocument.getElementById("catsSVG"); //used by drag and zoom
        const hintCombine = document.getElementById("hintCombine");
        const settingIcon = document.getElementById("settingIcon");//開啟右上角"暫停(設定)"的按鍵
        const closeBtn = document.getElementById("closeBtn");//關閉"暫停(設定)"的按鍵
        const settings = document.getElementById("settings");//整個設定主體
        const startBtn = document.getElementById("startBtn"); //開始按鍵
        const start = document.getElementById("start");//整個開始頁面
        const retryBtn = document.getElementById("retryBtn");//重啟按鈕
        const startBackground = document.getElementById("startBackground");//開始背景
        const startView = document.getElementById("startView");//開始頁面中間的介面
        const cheatBtn = document.getElementById("cheatBtn");


        let countdown = 100;
        let pause = 0;
        let startFlag = 0;
        let retryFlag = 0;

        // 開始按鈕
        startBtn.addEventListener("click", function () {
            startFlag = 1;
            retryFlag = 0;
            start.setAttribute("class", "animateFadeOut animate__animated  linear faster");
            startView.setAttribute("class", "startOut animate__animated  linear slide");
        })

        //設定全部未點擊 clicked = 0
        for (let i = 0; i < catfound.length; i++) {
            catfound[i].setAttribute("clicked", "0");
        }

        //設定作弊skip按鍵
        cheatBtn.addEventListener("click", function () {
            for (let i = 0; i < catfound.length; i++) {
                catfound[i].setAttribute("clicked", "1");
                catfound[i].setAttribute("fill", randomColor());
            }
            catfound[7].setAttribute("clicked", "0");
            catfound[7].setAttribute("fill", "#ffffff");
            countdown = 1;
            printCountdown(countdown);
        });
        // 點擊事件
        for (let i = 0; i < catfound.length; i++) {
            catfound[i].addEventListener("click", function () {
                // 點到本體也要把尾巴算進去
                if ((hasBodyClass(catfound[i]) == 1) && (catfound[i].getAttribute("clicked") != 1)) {
                    let className = getFirstClass(catfound[i]);
                    let color = randomColor();
                    setClassAttribute(className, "tail", color);
                    catfound[i].setAttribute("fill", color);
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        console.log("win!");
                    // console.log(countdown);
                }
                else if ((hasTailClass(catfound[i]) == 1) && (catfound[i].getAttribute("clicked") != 1)) {
                    let className = getFirstClass(catfound[i]);
                    let color = randomColor();
                    setClassAttribute(className, "body", color);
                    catfound[i].setAttribute("fill", color);
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        console.log("win!");
                    // console.log(countdown);
                }
                else if (catfound[i].getAttribute("clicked") != 1) {
                    catfound[i].setAttribute("fill", randomColor());
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        console.log("win!");
                    // console.log(countdown);
                }
                else
                    console.log("點過了別再點了QQ");
            });
        }


        //暫停點擊事件
        settingIcon.addEventListener("click", function () {

            settings.style.visibility = "visible";
            settings.setAttribute("class", "slideIn animate__animated slide linear");
            pause = 1;
            // console.log(pause);

        });
        //設定關閉按鈕點擊事件
        closeBtn.addEventListener("click", function () {
            settings.setAttribute("class", "slideOut animate__animated slide  linear");
            pause = 0;
        });

        //設定重新遊玩事件 ==>將各個設定返回初始值
        retryBtn.addEventListener("click", function () {
            retryFlag = 1;
            startFlag = 0;
            pause = 0;
            countdown = 100;
            printCountdown(countdown);
            hintCombine.style.visibility = "hidden";
            hintCombine.setAttribute("class", "");
            settings.setAttribute("class", "FadeOut animate__animated veryfast linear");
            start.setAttribute("class", "FadeIn animate__animated  faster linear");
            startView.setAttribute("class", "startIn animate__animated  faster linear");
            //設回未點擊狀態
            for (let i = 0; i < catfound.length; i++) {
                catfound[i].setAttribute("clicked", "0");
                catfound[i].setAttribute("fill", "#ffffff");
            }
        });


        drag(catsSVG);
        zoom(catsSVG);
        hint(catfound);
        settingIconRotate();
        RetryIconRotate();

        // 計時器
        let i = 0;
        let timeover = 0;
        let waitTime = 0;

        while (i < 9999) {
            (function (i) {
                setTimeout(function () {
                    if (countdown == 0) {
                        timeover = 1;
                    }

                    else if (retryFlag == 1) {
                        // console.log("pause");
                        printTimer(0);
                        waitTime = i;
                        // timeover = 1;
                        waitTime++;
                    }
                    else if (pause == 1 || startFlag == 0) {
                        // console.log("pause");
                        waitTime++;
                    }
                    else {
                        printTimer(i - waitTime);
                        if (i - waitTime == 5)
                            showHint();
                    }
                }, 1000 * i)
            })(i++)
            if (timeover == 1)
                break;
        }
    });
}


function showHint() {
    hintCombine.style.visibility = "visible";
    hintCombine.setAttribute("class", "animateFadeIn animate__animated  linear");
}
function printCountdown(countdown) {
    if (countdown < 1000) {
        let firsrtDigit = Math.floor(countdown / 100);
        let secondDigit = Math.floor((countdown % 100) / 10);
        let thirdDigit = Math.floor(countdown % 10);

        let firsrtDigitImg = numImages(firsrtDigit);
        let secondDigitImg = numImages(secondDigit);
        let thirdDigitImg = numImages(thirdDigit);
        document.getElementById("num1").setAttribute("src", firsrtDigitImg);
        document.getElementById("num2").setAttribute("src", secondDigitImg);
        document.getElementById("num3").setAttribute("src", thirdDigitImg);
    }
}
function printTimer(time) {
    if (time < 1000) {
        let firsrtDigit = Math.floor(time / 100);
        let secondDigit = Math.floor((time % 100) / 10);
        let thirdDigit = Math.floor(time % 10);

        let firsrtDigitImg = numImages(firsrtDigit);
        let secondDigitImg = numImages(secondDigit);
        let thirdDigitImg = numImages(thirdDigit);
        document.getElementById("timer1").setAttribute("src", firsrtDigitImg);
        document.getElementById("timer2").setAttribute("src", secondDigitImg);
        document.getElementById("timer3").setAttribute("src", thirdDigitImg);
    }
    else {
        document.getElementById("timer1").setAttribute("src", "./images/num9.svg");
        document.getElementById("timer2").setAttribute("src", "./images/num9.svg");
        document.getElementById("timer3").setAttribute("src", "./images/num9.svg");
    }
}

function numImages(num) {
    let srcString = "";
    switch (num) {
        case 0: srcString = "./images/num0.svg"; break;
        case 9: srcString = "./images/num9.svg"; break;
        case 8: srcString = "./images/num8.svg"; break;
        case 7: srcString = "./images/num7.svg"; break;
        case 6: srcString = "./images/num6.svg"; break;
        case 5: srcString = "./images/num5.svg"; break;
        case 4: srcString = "./images/num4.svg"; break;
        case 3: srcString = "./images/num3.svg"; break;
        case 2: srcString = "./images/num2.svg"; break;
        case 1: srcString = "./images/num1.svg"; break;
        default: break;
    }
    return srcString;
}
function hint(catfound) {
    let hint = document.getElementById("hint");
    let check = [];
    hint.addEventListener("click", function () {
        for (let i = 0; i < catfound.length; i++) {
            if (catfound[i].getAttribute("clicked") == 0)
                check.push(catfound[i]);
        }
        let a = Math.floor((Math.random() * 100) % check.length);

        if (hasBodyClass(check[a]) == 1) {
            let className = getFirstClass(check[a]);
            let tail = svg.contentDocument.getElementsByClassName(`${className} tail`)[0];
            flash(check[a]);
            flash(tail);
        }
        else if (hasTailClass(check[a]) == 1) {
            let className = getFirstClass(check[a]);
            let body = svg.contentDocument.getElementsByClassName(`${className} body`)[0];
            flash(check[a]);
            flash(body);
        }
        else {
            flash(check[a]);
        }
        while (check.length) {
            check.pop();
        }
    });
}

function flash(check) {
    let color = "#47473F"
    let flag = 0;
    let i = 0;
    while (i < 6) {
        (function (i) {
            setTimeout(function () {
                if (flag == 0) {
                    check.setAttribute("fill", color);

                    flag = 1;
                }
                else {
                    check.setAttribute("fill", "#ffffff");
                    flag = 0;
                }
                // console.log(countdown);  
            }, 125 * i)
        })(i++)
    }
}

function getFirstClass(elem) {
    let str = elem.getAttribute("class").split(" ")[0];
    return str;
}

function hasBodyClass(elem) {
    let boo = elem.getAttribute('class').indexOf("body");
    if (boo > -1)
        return 1;
    else
        return -1;
}
function hasTailClass(elem) {
    let boo = elem.getAttribute('class').indexOf("tail");
    if (boo > -1)
        return 1;
    else
        return -1;
}
function setClassAttribute(className, name, color) {
    let temp = svg.contentDocument.getElementsByClassName(`${className} ${name}`)[0];
    temp.setAttribute("fill", color);
    temp.setAttribute("clicked", 1);
}

function randomColor() {
    //  #FFEBA2 1~10
    //  #31AE3D 11~20
    //  #BAAFFF 21~30
    //  #49EEF9 31~40
    //  #F8B5F1 41~50
    //  #8CFFC8 51~60
    //  #BAC9FF 61~70
    //  #FFA14A 71~80
    //  #A3C3DA 81~90
    //  #FFCBCB 91~100

    let a = Math.floor((Math.random() * 100) % 10);
    let color;
    switch (a) {
        case 1: color = "#FFEBA2"; break;
        case 2: color = "#66DB72"; break;
        case 3: color = "#BAAFFF"; break;
        case 4: color = "#90EBF1"; break;
        case 5: color = "#F8B5F1"; break;
        case 6: color = "#8CFFC8"; break;
        case 7: color = "#BAC9FF"; break;
        case 8: color = "#F3BC8A"; break;
        case 9: color = "#A3C3DA"; break;
        case 0: color = "#FFCBCB"; break;
        default: break;
    }
    return color;
}

function zoom(catsSVG) {
    //zoom 放大縮小
    catsSVG.addEventListener("wheel", function (e) {
        //  1.取得一開始的 viewBox。
        let startViewBox = catsSVG
            .getAttribute("viewBox")
            .split(" ")
            .map((n) => parseFloat(n));
        // 2.1 取得滑鼠座標
        let startClient = {
            x: e.clientX,
            y: e.clientY,
        };
        //  3. 計算對應回去的 SVG 座標值
        let newSVGPoint = catsSVG.createSVGPoint();
        newSVGPoint.x = startClient.x;
        newSVGPoint.y = startClient.y;
        //縮放 r 倍
        let r;
        if (e.deltaY > 0) {
            r = 1.05;
        } else if (e.deltaY < 0) {
            r = 0.95;
        } else {
            r = 1;
        }
        if ((startViewBox[2] * r) < 1450) {
            startViewBox[2] *= r;
            startViewBox[3] *= r;
        }
        let zoomToViewBox = `${startViewBox[0]} ${startViewBox[1]} ${startViewBox[2]
            } ${startViewBox[3]}`;
        // console.log(zoomToViewBox);
        catsSVG.setAttribute("viewBox", zoomToViewBox);
    });
}
function drag(catsSVG) {
    //drag 拖曳
    let moving;
    catsSVG.addEventListener("mousedown", function (e) {
        catsSVG.style.cursor = "grab";
        moving = true;
    });
    catsSVG.addEventListener("mousemove", function (e) {
        if (moving === true) {
            // 1. 取得一開始的 viewBox 字串轉數字
            let startViewBox = catsSVG
                .getAttribute("viewBox")
                .split(" ")
                .map((n) => parseFloat(n));

            //  2. 取得滑鼠當前 viewport 中 滑鼠座標
            let startClient = {
                x: e.clientX,
                y: e.clientY,
            };
            //  3. 計算對應回去的 SVG 座標值
            let newSVGPoint = catsSVG.createSVGPoint();
            let CTM = catsSVG.getScreenCTM();
            newSVGPoint.x = startClient.x;
            newSVGPoint.y = startClient.y;
            let startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());
            //  4. 計算拖曳後滑鼠所在的 viewport 滑鼠座標
            let moveToClient = {
                x: e.clientX + e.movementX,
                y: e.clientY + e.movementY,
            };
            //  5. 計算對應回去的 SVG 座標值
            newSVGPoint = catsSVG.createSVGPoint();
            CTM = catsSVG.getScreenCTM();
            newSVGPoint.x = moveToClient.x;
            newSVGPoint.y = moveToClient.y;
            let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());
            //  6. 計算位移量
            let delta = {
                dx: startSVGPoint.x - moveToSVGPoint.x,
                dy: startSVGPoint.y - moveToSVGPoint.y,
            };
            //  7. 設定新的 viewBox 值
            if ((startViewBox[0] + delta.dx) < 0)
                startViewBox[0] = 0;
            else if (startViewBox[0] + startViewBox[2] > 1440)
                // console.log("do nothing");
                startViewBox[0] = 1440 - startViewBox[2];
            else
                startViewBox[0] += delta.dx;
            if ((startViewBox[1] + delta.dy) < 0)
                startViewBox[1] = 0;
            else
                startViewBox[1] += delta.dy;

            let moveToViewBox = `${startViewBox[0]} ${startViewBox[1]} ${startViewBox[2]
                } ${startViewBox[3]}`;
            catsSVG.setAttribute('viewBox', moveToViewBox);
            // console.log(moveToViewBox);
        }
    });
    catsSVG.addEventListener("mouseup", function (e) {
        moving = false;
        catsSVG.style.cursor = "auto";
    });
}

function settingIconRotate() {
    settingIcon.addEventListener("mouseenter", function (e) {
        settingIcon.setAttribute("class", "rotateSetting animate__animated faster  infinite linear");
    })
    settingIcon.addEventListener("mouseout", function (e) {
        settingIcon.setAttribute("class", "");
    })
}
function RetryIconRotate() {
    retryBtn.addEventListener("mouseenter", function (e) {
        retryBtn.setAttribute("class", "rotateSetting animate__animated  faster infinite linear");
    })
    retryBtn.addEventListener("mouseout", function (e) {
        retryBtn.setAttribute("class", "");
    })
}