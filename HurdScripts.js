/**
 * Created By Chaz Hurd
 * Classic jet fighting game
 * Hours: 25
 * First game made using JS/HTML/CSS 
 * 12/25/2020
 * 
 */

/*
Side Notes:
time for SQL
 */

var cloudMaker;
var enemyMaker;
var justiceMaker;
var debuggee;
var enemyExplosion;


var numOfEnemies = 0;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;
var timed = 0;
var cloud = [];
var xy = 0;
var numOfDefeatedEnemies = 0;
var enemyAhits = 0;
var enemyBhits = 0;
var userShot = false;
var healthLowered = false;
var myLeftPos = 150;
var moveLeft = 0;
var moveRight = 0;
var elem;
var totalShots = 0;
var cycleShots = -1;
var shotsTaken = 0;
var aboveZeroHits = 0;
var cycleLife = 1;
var endGame = false;
var noTrig = true;
var myScore = 0;
var goRight = false;
var goLeft = false;
var aHit = false;
var bHit = false;


var debugPasses = 0;



//Banner
function drawLogo() {
    var can = document.getElementById("myCanvas2");
    var cantx = can.getContext("2d");
    cantx.lineWidth = 1;
    cantx.strokeStyle = 'white';

    var myTimer = setInterval(function() {
        if (timed < 1) {
            cantx.fillStyle = '#333';
            cantx.fillRect(0, 0, 60, 40);
            cantx.beginPath();
        }
        if (timed < 5) {
            cantx.moveTo(x, y);
            x -= 0.8;
            y -= 1.4;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }
        if (timed >= 5 && timed <= 15) {
            cantx.moveTo(x, y);
            x -= 0.6;
            y += 2;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }
        if (timed > 15 && timed <= 30) {
            cantx.moveTo(x, y);
            x += 2.2;
            y -= .9;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }

        if (timed > 30 && timed <= 37) {
            cantx.moveTo(a, b);
            a += 0;
            b += 2.5;
            cantx.lineTo(a, b);
            cantx.stroke();
            timed++;
        }
        if (timed > 37 && timed <= 44) {
            cantx.moveTo(c, d);
            c += 0;
            d += 2.5;
            cantx.lineTo(c, d);
            cantx.stroke();
            timed++;

        }
        if (timed >= 44 && timed <= 55) {
            timed++;
        }
        if (timed >= 55) {
            timed++;
            if (timed >= 65) {
                x = 30;
                y = 17;
                a = 37;
                b = 17;
                c = 43;
                d = 16;
                timed = 0;
            }
        }
    }, 34);
}
//Banner above

//gamebelow

function hitDetectionHelper() {
    if (userShot) {
        flashDamage();
        lowerHealth();
        shotsTaken++;
        userShot = false;
    }
}
var ecounter = 0;
var aPassed = true;
var bPassed = true;

function explodeEnemy() {
    if (aHit && aPassed) {
        aPassed = false;
        debugPasses = debugPasses + 1;
        aHit = false;
        document.getElementById("score").innerText = ++numOfDefeatedEnemies;
        makeAexplode();
    }
    if (bHit && bPassed) {
        bHit = false;
        bPassed = false;
        document.getElementById("score").innerText = ++numOfDefeatedEnemies;
        makeBexplode();
    }
}
var explosiveCountA = 0;
var explosiveTimerA;

function makeAexplode() {
    var myContainer = document.getElementById("myContainer");
    var enemyA = document.getElementById("A");
    explosiveTimerA = setInterval(function() {
        explosiveCountA++;
        if (explosiveCountA === 1) {
            enemyA.src = "imgs/e2.png";
        } else if (explosiveCountA === 2) {
            enemyA.src = "imgs/e5.png";
        } else if (explosiveCountA === 3) {
            enemyA.src = "imgs/e7end.png";
        } else if (explosiveCountA === 4) {
            aHit = false;
            aPassed = true;
            try {
                myContainer.removeChild(enemyA);
                numOfEnemies = 1;
            } catch {
                //doubleCheckEnemies("A");
                console.log("A WASNT DELETED");
                var enemyA2 = document.getElementById("A");
                var myContainer2 = document.getElementById("myContainer");
                myContainer2.removeChild(enemyA2);
                stopIntervalA();
            }
        } else {
            stopIntervalA();
        }
    }, 200);

}

var explosiveCountB = 0;
var explosiveTimerB;

function makeBexplode() {
    var enemyB = document.getElementById("B");
    var myContainer = document.getElementById("myContainer");
    explosiveTimerB = setInterval(function() {
        explosiveCountB++;
        if (explosiveCountB === 1) {
            enemyB.src = "imgs/e2.png";
        } else if (explosiveCountB === 2) {
            enemyB.src = "imgs/e5.png";
        } else if (explosiveCountB === 3) {
            enemyB.src = "imgs/e7end.png";
        } else if (explosiveCountB === 4) {
            bHit = false;
            bPassed = true;
            try {
                myContainer.removeChild(enemyB);
                numOfEnemies = 1;
            } catch {
                //doubleCheckEnemies("B");
                console.log("B DIDNT GET DELETED");
                var enemyB2 = document.getElementById("B");
                var myContainer2 = document.getElementById("myContainer");
                myContainer2.removeChild(enemyB2);
                stopIntervalB();

            }

        } else {
            stopIntervalB();
        }
    }, 200);

}

function doubleCheckEnemies(enemyID) {

    var enemies = document.getElementsByClassName("enemies");
    var myContainer = document.getElementById("myContainer");
    for (var i = 0; i < enemies.length; i++) {
        var thisEnemy = enemies.item(i);
        if (thisEnemy.id === "B" && enemyID === "B") {
            myContainer.remove(thisEnemy);
        }
        if (thisEnemy.id === "A" && enemyID === "A") {
            myContainer.remove(thisEnemy);
        }
    }
}

function stopIntervalB() {
    explosiveCountB = 0;
    bHit = false;
    clearInterval(explosiveTimerB);
}

function stopIntervalA() {
    explosiveCountA = 0;
    aHit = false;
    clearInterval(explosiveTimerA);
}
/*
var onresize = function(e) {
    var myBody = document.getElementById("body");

    width = e.target.outerWidth;
    height = e.target.outerHeight;

    myBody.style.width = width + "px";
}
window.addEventListener("resize", onresize);*/

function myMove() {
    //my original load therefore some stank code here. 
    /*
    var myBody = document.getElementById("body");
    var myScreenSize = window.screen.width;
    myBody.style.width = myScreenSize + "px";*/

    drawArrows();
    enemyAAttack();
    enemyBAttack();
    var moveTl = new TimelineMax();
    elem = document.getElementById("myAnimation");
    var pos = 0;
    var arrows = document.getElementById("arrows");
    arrows.style.left = 10 + 'px';
    arrows.style.top = 420 + 'px';
    var shoot = document.getElementById("shoot");
    shoot.style.left = 240 + 'px';
    shoot.style.top = 400 + 'px';;
    moveTl.fromTo(elem, 1, { left: "-30px", opacity: "0" }, { left: "150px", opacity: "1" });
}

function moveJetLeft() {

    goLeft = true;
    goRight = false;
    moveLeft = setInterval(shiftLeft, 10);

}

function shiftLeft() {
    if (goLeft === true && goRight === false) {
        if (myLeftPos > 2) {
            myLeftPos -= 3;
            elem.style.left = myLeftPos + 'px';
        }
    } else {
        stopLeftMove();
    }
}

function moveJetRight() {
    goRight = true;
    goLeft = false;

    moveRight = setInterval(shiftRight, 10);
}

function shiftRight() {
    if (goRight === true && goLeft === false) {
        if (myLeftPos < 300) {
            myLeftPos += 3;
            elem.style.left = myLeftPos + 'px';
        }
    } else {
        stopRightMove();
    }
}

function stopLeftMove() {
    goLeft = false;
    clearInterval(moveLeft);
}

function stopRightMove() {
    goRight = false;
    clearInterval(moveRight);
}

var checkMoves = setInterval(() => {
    if (!goLeft) {
        clearInterval(moveLeft);
    }
    if (!goRight) {
        clearInterval(moveRight);
    }
}, 50);

function checkEs() {
    var checkEnemies = setInterval(() => {
        var enemies = document.getElementsByClassName("enemies");
        if (enemies.length < 2) {
            createEnemy();
        }
    }, 100);
}
//will have to build array of shots
var allShots = [];
var shotID = "start";

function letemKnow() {
    alert("This is a touch game not mouse game");
}

function shoot() {
    if (totalShots <= 2) {

        if (cycleShots < 2) {
            cycleShots++;
        } else {
            cycleShots = 0;
        }
        var shotTl = new TimelineMax();
        totalShots++;
        //create shot
        var shotButton = document.getElementById("shootButton");
        var myContainer = document.getElementById("myContainer");
        var myShot = document.createElement("img");
        myShot.src = 'imgs/theShot.png';
        myShot.id = "myShot" + cycleShots;
        myShot.className = "myShots";
        myContainer.appendChild(myShot);
        //align center for shot
        //myShot.style.top = 340 + 'px';
        var myJet = document.getElementById("myAnimation").style.left;
        var myJetCenter = myJet.substr(0, 3);
        myJetCenter = parseInt(myJetCenter) + 20;
        myShot.style.left = myJetCenter + 'px';
        //begin flight
        /* This was removed and replaced with from to as it was more glittchy
        var thisShot = setInterval(function() {
                shotLeft = myShot.style.left;
                shotTop = myShot.style.top;
                if (posit >= -20) {
                    posit -= 2;
                    myShot.style.top = posit + 'px';

                    if (posit > 280) {
                        shotButton.src = "holdingShot.png";
                    } else {
                        shotButton.src = "shoot.svg";
                    }
                } else {
                    if (myShot != null) {
                        myContainer.removeChild(myShot);
                        totalShots--;
                    }
                    clearInterval(thisShot);
                }
            },
            2);
    } else {
        document.getElementById("weaponsOverload").style.display = "block";
    */
        var myShotTop, pPos;
        shotTl.fromTo(myShot, 2, { top: "340px" }, { top: "-100px" });
        var checkShot = setInterval(function() {
            myShotTop = myShot.style.top;
            pPos = myShotTop.indexOf("p");
            myShotTop = myShotTop.substr(0, pPos);
            if (myShotTop <= -20) {
                if (myShot != null) {
                    myContainer.removeChild(myShot);
                    totalShots--;
                    clearInterval(checkShot);
                }
            }
        }, 50);
    } else {
        var divTl = new TimelineMax();
        var oCount = 0;
        var overloadImage = document.getElementById("weaponsOverload");
        overloadImage.style.display = "block";
        overloadImage.style.opacity = "1";
        var myShootButton = document.getElementById("shootButton");
        myShootButton.style.display = "none";
        var overload = setInterval(function() {
            oCount++
            if (oCount === 1) {
                divTl.fromTo(overloadImage, 0.5, { opacity: "0" }, { opacity: "1" });

            }
            if (oCount === 2) {
                divTl.fromTo(overloadImage, 0.5, { opacity: "1" }, { opacity: "0" });


            }
            if (oCount === 3) {
                divTl.fromTo(overloadImage, 0.5, { opacity: "0" }, { opacity: "1" });



            }
            if (oCount === 4) {
                divTl.fromTo(overloadImage, 0.5, { opacity: "1" }, { opacity: "0" });

            }
            if (oCount >= 5) {
                myShootButton.style.display = "block";
                clearInterval(overload);
            }
        }, 600);


    }
}

function drawArrows() {
    document.getElementById("score").style.display = "block";
    var can = document.getElementById("myLeftArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(5, 35);
    cant.lineTo(50, 10);
    cant.stroke();
    cant.lineTo(50, 60);
    cant.stroke();
    cant.lineTo(5, 35);
    cant.stroke();

    var can = document.getElementById("myRightArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(60, 35);
    cant.lineTo(20, 10);
    cant.stroke();
    cant.lineTo(20, 60);
    cant.stroke();
    cant.lineTo(60, 35);
    cant.stroke();
}

function startCloud() {
    var allowIt = Math.floor(Math.random() * 10);
    if (allowIt <= 8) {
        moveClouds();
        if (allowIt <= 4) {
            moveClouds();
        }
    }
}

function moveClouds() {
    var myContainer = document.getElementById("myContainer");
    var cloud = document.createElement("img");
    var typeOfCloud = Math.random();
    if (typeOfCloud <= 0.5) {
        cloud.src = "imgs/cloud.png";
    } else {
        cloud.src = "imgs/mediumCloud.png";
    }
    myContainer.appendChild(cloud);
    cloud.id = "myCloud";
    var rando = Math.floor(Math.random() * 260);
    cloud.style.left = rando + 'px';
    var cloudOpac = 0;
    cloud.style.opacity = 1;

    var cloudTl = new TimelineMax();



    cloudTl.fromTo(cloud, 2, { top: "0px", opacity: "0.8" }, { top: "350px", opacity: "0.1" });
    var checkCloud = setInterval(() => {

            var enemyAtop = 0,
                pIndex = 0,
                enemyBtop = 0;
            var enemyA,
                enemyB;

            var cloudTop = cloud.style.top;
            var pIndex = cloudTop.indexOf("p");
            cloudTop = parseInt(cloudTop.substr(0, pIndex));

            if (cloudTop >= 350) {
                myContainer.removeChild(cloud);
                clearInterval(checkCloud);
            }

            //added code for enemy location since this timer runs the most. 
            if (document.getElementById("A") != null) {
                enemyA = document.getElementById("A");
                enemyAtop = enemyA.style.top;
                pIndex = enemyAtop.indexOf("p");
                enemyAtop = parseInt(enemyAtop.substr(0, pIndex));
                if (enemyAtop >= 300) {
                    myContainer.removeChild(enemyA);
                    numOfEnemies = 1;
                }
            }
            if (document.getElementById("B") != null) {
                enemyB = document.getElementById("B");
                enemyBtop = enemyB.style.top;
                pIndex = enemyBtop.indexOf("p");
                enemyBtop = parseInt(enemyBtop.substr(0, pIndex));
                if (enemyBtop >= 300) {
                    myContainer.removeChild(enemyB);
                    numOfEnemies = 1;
                }
            }


        },
        10);
}
var start = 0;
var enemyToggle = 0;
//creating enemies:
function createEnemy() {
    if (numOfEnemies === 1 || numOfEnemies === 0) {
        numOfEnemies++;
        var myContainer = document.getElementById("myContainer");
        var enemy = document.createElement("img");
        var typeOfEnemy = Math.random();
        if (typeOfEnemy <= 0.5) {
            enemy.src = "imgs/enemyPlane1.png";
        } else {
            enemy.src = "imgs/enemyPlane2.png";
        }
        enemy.className = "enemies";

        if (enemyToggle === 0) {
            enemy.id = "A";
            enemyToggle++;
        } else {
            enemy.id = "B";
            enemyToggle--;
        }
        myContainer.appendChild(enemy);
        enemy.style.top = 0 + 'px';
        var pos = 100;
        var topPos = 0;
        var switched = 0.5;
        var tl = new TimelineMax();
        var rightSideRandom = Math.random() * 150 + 150;
        rightSideRandom = rightSideRandom + 'px';
        var leftSideRandom = Math.random() * 150 + 20
        leftSideRandom = leftSideRandom + 'px';
        if (start == 0) {
            tl.fromTo(enemy, 1, { left: "0px", opacity: "0" }, { left: rightSideRandom, opacity: "1" });
            start++;
        } else {
            tl.fromTo(enemy, 1, { left: "0px", opacity: "0" }, { left: leftSideRandom, opacity: "1" });
            start = 0;
        }
        var checkTop, toTop, stringedtoTop, stringedCheck;

        var switchoronie = setInterval(function() {
            checkTop = parseInt(enemy.style.top.substr(0, 3));
            toTop = checkTop + 10;
            stringedtoTop = toTop + 'px';
            stringedCheck = checkTop + 'px';
            switched = Math.random();
            if (checkTop >= 200) {
                clearInterval(switchoronie);
            } else if (switched >= 0.01 && switched < 0.9) {
                tl.fromTo(enemy, 0.2, { top: stringedCheck }, { top: stringedtoTop });
            }

        }, 1000);
        startShifts(enemy);
        checkEs();

    }
}

function startShifts(enemy) {
    var tl = new TimelineMax();
    var switched, enemyTop;
    var rando = (Math.random() * 1000) + 500;
    var checkOnIt = setInterval(function() {
        switched = Math.random();
        var enemyShift = enemy.style.left;
        enemyTop = enemy.style.top.substr(0, 3);
        if (enemyTop.includes("p")) {
            enemyTop = enemyTop.substr(0, 2);
        }
        enemyShift = enemyShift.substr(0, 3);
        enemyShift = parseInt(enemyShift);
        var leftShift = enemyShift - 30;
        var rightShift = enemyShift + 30;
        leftShift = leftShift + 'px';
        rightShift = rightShift + 'px';
        enemyLoc = enemyShift;
        enemyShift = enemyShift + 'px';
        if (switched >= 0.1 && switched <= 0.9 && enemyTop <= 200) {

            if (switched <= 0.5 && enemyLoc >= 50) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: leftShift });
            }
            if (switched <= 0.5 && enemyLoc <= 50) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: rightShift });
            }
            if (switched >= 0.501 && enemyLoc <= 260) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: rightShift });

            }
            if (switched >= 0.501 && enemyLoc >= 261) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: leftShift });
            }
        }
        var checkTop = enemy.style.top;
        var numCheckTop = checkTop.substr(0, 3);
        if (numCheckTop >= 200) {
            clearInterval(checkOnIt);
            tl.fromTo(enemy, 0.4, { top: checkTop, opacity: "0.8", height: "60", width: "50" }, { top: "310px", opacity: "0", height: "20", width: "10" });
        }
    }, rando);
}
var explosiveCount = 0;

function hitDetection() {
    //user hit detection
    var userTop, userLeft, pIndex, user;
    if (document.getElementById("myAnimation") != null) {
        user = document.getElementById("myAnimation");
        userTop = user.style.top;
        pIndex = userTop.indexOf("p");
        userTop = parseInt(userTop.substr(0, pIndex));

        userLeft = document.getElementById("myAnimation").style.left;
        pIndex = userLeft.indexOf("p");
        userLeft = parseInt(userLeft.substr(0, pIndex));

    }
    if (numOfEnemyShots > 0) {
        var shots = document.getElementsByClassName("enemyShots");
        var top, curShot;

        for (var i = 0; i < shots.length; i++) {
            curShot = shots.item(i);
            curShotTop = curShot.style.top;
            curShotLeft = curShot.style.left;

            pIndex = curShotTop.indexOf("p");
            top = parseInt(curShotTop.substr(0, pIndex));

            pIndex = curShotLeft.indexOf("p");
            left = parseInt(curShotLeft.substr(0, pIndex));

            if (top > 450) {
                myContainer.removeChild(curShot);
            }
            if (left > userLeft && left < (userLeft + 40) && top >= 350 && top <= 375 && userShot == false) {
                userShot = true;
                shotsTaken++;
            }
        }
    }
    //enemy a hit detection
    if (document.getElementById("A") != null) {
        var enemyA = document.getElementById("A");
        var enemyAtop = enemyA.style.top;
        var pLoc = enemyAtop.indexOf("p");
        enemyAtop = parseInt(enemyAtop.substr(0, pLoc));
        var enemyAleft = enemyA.style.left;
        pLoc = enemyAleft.indexOf("p");
        enemyAleft = parseInt(enemyAleft.substr(0, pLoc));

        for (var i = 1; i < 4; i++) {
            if (document.getElementById("myShot" + i) != null) {
                var myShottop = document.getElementById("myShot" + i).style.top;
                pLoc = myShottop.indexOf("p");
                myShottop = parseInt(myShottop.substr(0, pLoc));

                var myShotleft = document.getElementById("myShot" + i).style.left;
                pLoc = myShotleft.indexOf("p");
                myShotleft = parseInt(myShotleft.substr(0, pLoc));

                if (myShottop <= enemyAtop + 45 && myShottop >= enemyAtop + 35) {
                    if (myShotleft >= enemyAleft && myShotleft <= enemyAleft + 40) {
                        aHit = true;
                    }
                }
            }
        }
    }

    //enemy b hit detection
    if (document.getElementById("B") != null) {
        var enemyB = document.getElementById("B");
        var enemyBtop = enemyB.style.top;
        var pLoc = enemyBtop.indexOf("p");
        enemyBtop = parseInt(enemyBtop.substr(0, pLoc));
        var enemyBleft = enemyB.style.left;
        pLoc = enemyBleft.indexOf("p");
        enemyBleft = parseInt(enemyBleft.substr(0, pLoc));

        for (var i = 0; i < 5; i++) {
            if (document.getElementById("myShot" + i) != null) {
                var myShottop = document.getElementById("myShot" + i).style.top;
                pLoc = myShottop.indexOf("p");
                myShottop = parseInt(myShottop.substr(0, pLoc));

                var myShotleft = document.getElementById("myShot" + i).style.left;
                pLoc = myShotleft.indexOf("p");
                myShotleft = parseInt(myShotleft.substr(0, pLoc));

                if (myShottop <= enemyBtop + 45 && myShottop >= enemyBtop + 35) {
                    if (myShotleft >= enemyBleft && myShotleft <= enemyBleft + 40) {
                        bHit = true;
                    }
                }
            }
        }
    }

}

var numOfEnemyShots = 0;

function enemyAAttack() {
    var randomInterval = Math.random() * 500 + 1000;
    var enemyAtop, enemyBtop, enemyAleft, enemyBleft, aShotLeft, bShotLeft, pIndex;
    var myContainer = document.getElementById("myContainer");
    var tl = new TimelineMax();


    var fireARandomly = setInterval(function() {

        if (document.getElementById("A") != null) {
            numOfEnemyShots++;
            var enemyA = document.getElementById("A");
            enemyAtop = enemyA.style.top;
            enemyAleft = enemyA.style.left;
            pIndex = enemyAleft.indexOf("p");
            enemyAleft = parseInt(enemyAleft.substr(0, pIndex));
            aShotLeft = enemyAleft + 25;
            var aShot = document.createElement("img");
            myContainer.appendChild(aShot);
            aShot.src = "imgs/theShot.png";
            aShot.style.left = aShotLeft + "px";
            aShot.className = "enemyShots";
            tl.fromTo(aShot, 1, { top: enemyAtop }, { top: "490px" });
        }
        if (endGame) {
            clearInterval(fireARandomly);
        }
    }, randomInterval);
}

function enemyBAttack() {

    randomInterval = Math.random() * 500 + 1000;

    var enemyBtop, enemyBleft, bShotLeft, pIndex;
    var myContainer = document.getElementById("myContainer");
    var tl = new TimelineMax();

    var fireBRandomly = setInterval(function() {

        if (document.getElementById("B") != null) {
            numOfEnemyShots++;
            var enemyB = document.getElementById("B");
            enemyBtop = enemyB.style.top;
            enemyBleft = enemyB.style.left;
            pIndex = enemyBleft.indexOf("p");
            enemyBleft = parseInt(enemyBleft.substr(0, pIndex));
            bShotLeft = enemyBleft + 25;
            var bShot = document.createElement("img");
            myContainer.appendChild(bShot);
            bShot.src = "imgs/theShot.png";
            bShot.style.left = bShotLeft + "px";
            bShot.className = "enemyShots";
            tl.fromTo(bShot, 1, { top: enemyBtop }, { top: "490px" });
        }
        if (endGame) {
            clearInterval(fireBRandomly);
        }

    }, randomInterval);
}


function flashDamage() {
    var damageDiv;
    var myContainer = document.getElementById("myContainer");
    damageDiv = document.getElementById("damaged");
    var divTl = new TimelineMax();
    //--------------
    if (userShot) {
        var damTimer = 0;
        var dam = setInterval(function() {
            damTimer++;
            if (damTimer === 1) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "0" }, { opacity: "1" });

            }
            if (damTimer === 2) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "1" }, { opacity: "0" });


            }
            if (damTimer === 3) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "0" }, { opacity: "1" });


            }
            if (damTimer === 4) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "1" }, { opacity: "0" });

            }
            if (damTimer >= 5) {
                userShot = false;
                clearInterval(dam);
            }
        }, 100);
    }
}

function lowerHealth() {
    var healthBar = document.getElementById("healthBarImage");
    var scoreDiv = document.getElementById("score");
    var myCover = document.getElementById("myCover");
    var restartDivTL = new TimelineMax();
    var restartDiv = document.getElementById("restartGame");

    if (shotsTaken >= 1) {
        if (cycleLife === 1) {
            healthBar.src = "imgs/threequartershealth.png";
            shotsTaken = 0;
            cycleLife = 2;
        } else if (cycleLife === 2) {
            healthBar.src = "imgs/halfhealth.png";
            shotsTaken = 0;
            cycleLife = 3;
        } else if (cycleLife === 3) {
            healthBar.src = "imgs/quarterhealth.png";
            shotsTaken = 0;
            cycleLife = 4;
        } else if (cycleLife === 4) {
            healthBar.src = "imgs/dead1.png";
            shotsTaken = 0;
            cycleLife = 5;

            clearInterval(cloudMaker);
            clearInterval(enemyMaker);
            clearInterval(justiceMaker);
            clearInterval(debuggee);
            endGame = true;
            removeItems();
            restartDivTL.fromTo(scoreDiv, .2, { opacity: "0.8" }, { opacity: "0" });

            var restart = document.getElementById("restartQuestion");
            var outRestart = document.getElementById("restartGame");
            restart.style.display = "block";

            outRestart.style.display = "block";
            outRestart.style.top = "100px";

            restartDivTL.fromTo(outRestart, .8, { width: "0px" }, { width: "200px" });
            restartDivTL.fromTo(outRestart, .8, { height: "20px" }, { height: "150px" });
            restartDivTL.fromTo(restart, 1, { opacity: "0" }, { opacity: "1" });

            scoreDiv.style.top = "50px";
            scoreDiv.style.left = "0";
            scoreDiv.style.width = "100%";
            scoreDiv.innerText = "Score: " + numOfDefeatedEnemies;
            restartDivTL.fromTo(scoreDiv, 1, { opacity: "0" }, { opacity: "1" });

        }

    }
}


function removeItems() {

    var clearItems = setInterval(() => {
        if (endGame) {
            var myContainer = document.getElementById('myContainer');
            var shots = document.getElementsByClassName("enemyShots");


            if (document.getElementById("A") != null) {
                var eA = document.getElementById("A");
                myContainer.removeChild(eA);
            }

            if (document.getElementById("B")) {
                var eB = document.getElementById("B");
                myContainer.removeChild(eB);
            }

            for (var z = 0; z < shots.length; z++) {
                //debugger;
                myContainer.removeChild(shots.item(z));
            }
        } else {
            clearInterval(clearItems);
        }

    }, 200)


}

function restartGame() {
    document.getElementById("restartGame").style.display = "none";
    commenceGame();
}

function finishGame() {
    window.location.href = "http://www.chazhurd.com"
}

function beforeGame() {
    drawLogo();
    document.getElementById("arrows").style.display = "none";
    document.getElementById("shoot").style.display = "none";
    var restartDivTL = new TimelineMax();
    var startContent = document.getElementById("startContent");
    var startGame = document.getElementById("startGame");
    restartDivTL.fromTo(startGame, .8, { width: "0px" }, { width: "250px" });
    restartDivTL.fromTo(startGame, .8, { height: "20px" }, { height: "260px" });
    restartDivTL.fromTo(startContent, 1, { opacity: "0" }, { opacity: "0.9" });
    startGame.style.alignItems = "center";
    /* var cdp = document.getElementById("countDown");
     cdp.style.display = "block";
     var countDown = setInterval(() => {
         x--;
         if (x <= 5) {
             cdp.innerText = x;
             restartDivTL.fromTo(cdp, 5, { opacity: "0" }, { opacity: "1" });

             if (x === 0) {

                 restartDivTL.fromTo(startGame, .6, { opacity: "1" }, { opacity: "0" });

                 clearInterval(countDown);
                 //cdp.style.display = "none";
                 commenceGame();
             }
         }
     }, 1000);*/
}

function commenceGame() {
    if (window.screen.width > 700) {
        document.getElementById("myCover").style.width = "100%";
        document.getElementById("healthBar").style.width = "100%";
    }
    var scoreDiv = document.getElementById("score");
    numOfDefeatedEnemies = 0;
    scoreDiv.innerText = "";
    scoreDiv.style.width = "30px";
    scoreDiv.style.top = "420px";
    scoreDiv.style.left = "65px";

    var startGameDiv = document.getElementById("startGame");
    var container = document.getElementById("myContainer");
    cycleLife = 1;
    endGame = false;
    numOfEnemies = 0;
    document.getElementById("healthBarImage").src = "imgs/fullHealth.png"
    document.getElementById("arrows").style.display = "block";
    document.getElementById("shoot").style.display = "block";
    cloudMaker = setInterval(startCloud, 2000);
    enemyMaker = setInterval(createEnemy, 3000);
    justiceMaker = setInterval(hitDetection, 5);
    debuggee = setInterval(hitDetectionHelper, 500);
    enemyExplosion = setInterval(explodeEnemy, 400);
    myMove();
    if (startGameDiv != null)
        container.removeChild(startGameDiv);
    //document.getElementById("startGame").style.display = "none";

}