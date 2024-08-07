function catClick(svg) {
    svg.addEventListener("load", function () {
        const catfound = svg.contentDocument.querySelectorAll('[class^=catNum]');

        // console.log(catfound);
        // console.log(catfound[0].getAttribute("class").indexOsf("body"));
        // catfound[0].setAttribute("fill", "#ffffff");
        // let str = getFirstClass(catfound[5]);

        // console.log(str);
        // let temp = svg.contentDocument.querySelectorAll(`class=${str} body`);
        // var list = svg.contentDocument.getElementsByClassName(`${str} body`)[0];
        // setClassAttribute(str, "tail");
        // list.setAttribute("fill", "#ffffff");
        // console.log(list);


        // var boo = catfound[5].getAttribute('class').indexOf("body"); // true
        // console.log(boo);

        // catfound[0].addEventListener("click", function () {

        //     if (catfound[1])
        //         catfound[1].setAttribute("fill", "#ffffff");
        //     catfound[0].setAttribute("fill", "#ffffff");
        // })
        // for (let i=0;i<6;i++){

        //     console.log(catfound[i]);
        // }

        for (let i = 0; i < catfound.length; i++) {
            catfound[i].addEventListener("click", function () {
                if (hasBodyClass(catfound[i]) == 1) {
                    let str = getFirstClass(catfound[i]);
                    setClassAttribute(str, "tail", "#ffffff");
                    catfound[i].setAttribute("fill", "#ffffff");
                }
                else if (hasTailClass(catfound[i]) == 1) {
                    let str = getFirstClass(catfound[i]);
                    setClassAttribute(str, "body", "#ffffff");
                    catfound[i].setAttribute("fill", "#ffffff");
                }
                else {
                    catfound[i].setAttribute("fill", "#ffffff");
                    console.log("entire")
                }
            })
        }
        // for (let i = 0; i < 100; i++) {
        //     catfound[i].addEventListener("click", function () {
        //         if (catfound[i].getAttribute("class").indexOf("body")) {
        //             let str = catfound[0].getAttribute("class").split(" ")[0];
        //             svg.contentDocument.getElementsByClassName(`${str} tail`)[0].setAttribute("fill", "#ffffff");
        //             catfound[i].setAttribute("fill", "#ffffff");
        //         }
        //         else if (catfound[i].getAttribute("class").indexOf("tail")) {
        //             let str = catfound[0].getAttribute("class").split(" ")[0];
        //             svg.contentDocument.getElementsByClassName(`${str} body`)[0].setAttribute("fill", "#ffffff");
        //             catfound[i].setAttribute("fill", "#ffffff");
        //         }
        //         else
        //             catfound[i].setAttribute("fill", "#ffffff");

        //         catfound[i].setAttribute("flag", 1);
        //         // console.log(catfound);
        //     })
        // }

        // catfound.addEventListener("click", function () {
        //     catfound.setAttribute("fill", "#ffffff");
        //     catfound.setAttribute("flag", 0);
        // })
        // const catfound1 = svg.contentDocument.getElementById("catNum1");
        // catfound1.addEventListener("click", function () {
        //     catfound[1].setAttribute("fill", "#ffffff");
        //     catfound[1].setAttribute("flag", 1);
        //     // console.log(catfound);
        // })


        // const catfound2 = svg.contentDocument.getElementById("catNum2");
        // catfound2.addEventListener("click", function () {
        //     catfound2.setAttribute("fill", "#FFEBA2");
        //     catfound2.setAttribute("flag", 0);
        //     // console.log(svg.contentDocument.getElementById("catsSVG").getAttribute("viewBox"));
        // })
    });
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
    // console.log(typeof (temp));
    // return temp;
}


function drag(svg) {
    svg.addEventListener("load", function (e) {
        let moving;
        const catsSVG = svg.contentDocument.getElementById("catsSVG");

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
    })
}

function zoom(e) {
    svg.addEventListener("load", function (e) {
        const catsSVG = svg.contentDocument.getElementById("catsSVG");
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
            let CTM = catsSVG.getScreenCTM();

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

        })
    });
}


