function catClick(svg) {
    svg.addEventListener("load", function () {
        const catfound = svg.contentDocument.querySelectorAll('[class^=catNum]');//used by clickEvent
        const catsSVG = svg.contentDocument.getElementById("catsSVG"); //used by drag and zoom
        let countdown = 100;
        //設定全部未點擊 clicked = 0
        for (let i = 0; i < catfound.length; i++) {
            catfound[i].setAttribute("clicked", "0");
        }
        // 點擊事件
        for (let i = 0; i < catfound.length; i++) {
            catfound[i].addEventListener("click", function () {
                // 點到本體也要把尾巴算進去
                if ((hasBodyClass(catfound[i]) == 1) && (catfound[i].getAttribute("clicked") != 1)) {
                    let str = getFirstClass(catfound[i]);
                    let color = randomColor();
                    setClassAttribute(str, "tail", color);
                    catfound[i].setAttribute("fill", color);
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        alert("AAAA");
                    // console.log(countdown);
                }
                else if ((hasTailClass(catfound[i]) == 1) && (catfound[i].getAttribute("clicked") != 1)) {
                    let str = getFirstClass(catfound[i]);
                    let color = randomColor();
                    setClassAttribute(str, "body", color);
                    catfound[i].setAttribute("fill", color);
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        alert("AAAA");
                    // console.log(countdown);
                }
                else if (catfound[i].getAttribute("clicked") != 1) {
                    catfound[i].setAttribute("fill", randomColor());
                    catfound[i].setAttribute("clicked", 1);
                    countdown -= 1;
                    printCountdown(countdown);
                    if (countdown == 0)
                        alert("AAAA");

                    // console.log(countdown);
                }
                else
                    console.log("點過了別再點了QQ");
            });
        }
        //計時器
        let i = 0;
        let timeover = 0;
        while (i < 10000) {
            (function (i) {
                setTimeout(function () {
                    if (countdown == 0) {
                        //作弊碼
                        // for (let i = 0; i < catfound.length; i++) {
                        //     catfound[i].setAttribute("fill", "#DC803C");
                        // }
                        timeover = 1;
                    }
                    else {                     
                        printTimer(i);
                        if (i == 2)
                            document.getElementById("hintCombine").style.visibility = "visible";
                    }
                }, 1000 * i)
            })(i++)
            if (timeover == 1)
                break;
        }
        drag(catsSVG);
        zoom(catsSVG);
        hint(catfound);
    });
}
function printCountdown(countdown) {
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
function printTimer(time) {
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
        console.log(getFirstClass(check[a]));
        // check[a].setAttribute("fill", color);
        flash(check[a]);
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
function setClassAttribute(elem, name, color) {
    let temp = svg.contentDocument.getElementsByClassName(`${elem} ${name}`)[0];
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
    });
}