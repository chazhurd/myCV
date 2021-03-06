/**
 * Created By Chaz Hurd
 * Classic jet fighting game
 * Hours: 55
 * First game made using JS/HTML/CSS 
 * In hind-sight I could've encapsulated some of this code into different classes to help understand how things work,
 * since the planes functions are the same I kept it in one page. 
 * 
 * 1/23/2020
 * 
Side Notes:
Might Add SQL/PHP
 */

var cloudMaker;
var enemyMaker;
var justiceMaker;
var debuggee;
var enemyExplosion;
var stayingAliveSong;
var paused = false;
var playing = false;
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
var hitCenter, hitLeft, hitRight = false;
var ecounter = 0;
var aPassed = true;
var bPassed = true;
var debugPasses = 0;
var explosiveCountA = 0;
var explosiveTimerA;
var explosiveCountB = 0;
var explosiveTimerB;
var allShots = [];
var shotID = "start";
var start = 0;
var enemyToggle = true;
var keyLeft = false;
var keyRight = false;
var keys = "";
var numOfEnemyShots = 0;

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

function myMove() {
    var moveTl = new TimelineMax();
    elem = document.getElementById("myAnimation");
    var arrows = document.getElementById("arrows");
    arrows.style.left = 10 + 'px';
    arrows.style.top = 420 + 'px';
    var shoot = document.getElementById("shoot");
    shoot.style.left = 230 + 'px';
    shoot.style.top = 400 + 'px';;
    moveTl.fromTo(elem, 0.5, { left: "-30px", opacity: "0" }, { left: "150px", opacity: "1" });
}

function moveJetLeft() {

    goLeft = true;
    goRight = false;
    moveLeft = setInterval(shiftLeft, 10);

}

function shiftLeft() {
    if (goLeft === true && goRight === false) {
        document.getElementById("myLeftArrow").style.backgroundColor = "blue";

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
        document.getElementById("myRightArrow").style.backgroundColor = "blue";
        if (myLeftPos < 300) {
            myLeftPos += 3;
            elem.style.left = myLeftPos + 'px';
        }
    } else {
        stopRightMove();
    }
}

function stopLeftMove() {
    document.getElementById("myLeftArrow").style.backgroundColor = "";
    goLeft = false;
    clearInterval(moveLeft);
}

function stopRightMove() {
    document.getElementById("myRightArrow").style.backgroundColor = "";
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

//creating enemies:
function createEnemy() {
    if (numOfEnemies === 1 || numOfEnemies === 0) {
        numOfEnemies++;
        var myContainer = document.getElementById("myContainer");
        var enemy = document.createElement("img");
        var typeOfEnemy = Math.random();
        enemy.className = "enemies";
        var i = 0;

        if (typeOfEnemy <= 0.5) {
            enemy.src = "imgs/enemyPlane1.png";
        } else {
            enemy.src = "imgs/enemyPlane2.png";
        }
        //going to have to search and find what is out there not just bounce back and forth. 

        myContainer.appendChild(enemy);
        if (numOfEnemies > 0) {
            var enemyIds = document.getElementsByClassName("enemies");
            if (enemyIds.item(i).id === "A") {
                enemy.id = "B";
            } else {
                enemy.id = "A";
            }
        }
        //document.getElementById("debugger").innerText = "enemy ID  = " + enemy.id;


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
            if (left > (userLeft - 3) && left < (userLeft + 35) && top >= 350 && top <= 375 && userShot == false) {
                userShot = true;
                shotsTaken++;
                if (left < userLeft + 10) {
                    hitLeft = true;
                } else if (left >= userLeft + 10 && left <= userLeft + 25) {
                    hitCenter = true;
                } else {
                    hitRight = true;
                }
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
                    if (myShotleft >= enemyAleft && myShotleft <= enemyAleft + 45) {
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
                    if (myShotleft >= enemyBleft && myShotleft <= enemyBleft + 45) {
                        bHit = true;
                    }
                }
            }
        }
    }

}


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
            aShotLeft = enemyAleft + 20;
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
            bShotLeft = enemyBleft + 20;
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
    var jetImage = document.getElementById("jetImage");
    var dmgBorder = document.getElementById("damageBorder");
    damageDiv = document.getElementById("damaged");
    dmgBorder.style.display = "block";


    var divTl = new TimelineMax();
    if (userShot) {
        var damTimer = 0;
        var dam = setInterval(function() {
            damTimer++;
            if (damTimer === 1) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "0" }, { opacity: "1" });
                divTl.fromTo(dmgBorder, .5, { opacity: "0" }, { opacity: "0.5" })
                    .fromTo(dmgBorder, .5, { opacity: "0.5" }, { opacity: "0" });
                dmgBorder.style.zIndex = 1;
                if (hitLeft) {
                    jetImage.src = "imgs/hitLeft.png";
                    hitLeft = false;
                } else if (hitCenter) {
                    jetImage.src = "imgs/hitCenter.png";
                    hitCenter = false;
                } else {
                    jetImage.src = "imgs/hitRight.png";
                    hitRight = false;
                }
            }
            if (damTimer === 2) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "1" }, { opacity: "0" });
            }
            if (damTimer === 3) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "0" }, { opacity: "1" });

            }
            if (damTimer === 4) {
                divTl.fromTo(damageDiv, 0.1, { opacity: "1" }, { opacity: "0" });
                jetImage.src = "imgs/newHost.png";
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
    var db = document.getElementById("damageBorder");
    var restartDivTL = new TimelineMax();

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
            db.style.display = "none";
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
            db.style.display = "none";
            restart.style.display = "block";
            restart.zIndex = 0;

            outRestart.style.display = "block";
            outRestart.style.top = "20%";




            restartDivTL.fromTo(outRestart, .8, { width: "0px" }, { width: "200px" });
            restartDivTL.fromTo(outRestart, .8, { height: "20px" }, { height: "150px" });
            restartDivTL.fromTo(restart, 1, { opacity: "0" }, { opacity: "1" });
            scoreDiv.style.opacity = 0;
            scoreDiv.style.width = "100px";
            scoreDiv.style.left = "128px";
            scoreDiv.style.top = "230px";
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
    window.location.href = "http://www.chazhurd.com";
}

function beforeGame() {
    drawLogo();

    let curLeft = document.getElementById("myContainer").style.left;
    let pI = curLeft.indexOf("p");
    curLeft = parseInt(curLeft.substr(0, pI));



    var wp = document.getElementById("weaponsOverload");
    var cd = document.getElementById("damaged");
    var sb = document.getElementById("startGameButton");
    wp.style.zIndex = 0;
    cd.style.zIndex = 0;
    sb.style.zIndex = 1;
    document.getElementById("arrows").style.display = "none";
    document.getElementById("shoot").style.display = "none";
    var restartDivTL = new TimelineMax();
    var startContent = document.getElementById("startContent");
    var startGame = document.getElementById("startGame");
    restartDivTL.fromTo(startGame, .8, { width: "0px" }, { width: "250px" });
    restartDivTL.fromTo(startGame, .8, { height: "0px" }, { height: "320px" });
    restartDivTL.fromTo(startContent, 1, { opacity: "0" }, { opacity: "0.9" });
    startGame.style.alignItems = "center";

}

function commenceGame() {
    /* if (!playing) {
         document.getElementById("sound").style.display = "block";
         stayingAliveSong = new Audio('stayingalive.mp3');
         stayingAliveSong.play();
         playing = true;
     }*/

    var wp = document.getElementById("weaponsOverload");
    var cd = document.getElementById("damaged");

    wp.style.zIndex = 1;
    cd.style.zIndex = 1;


    var scoreDiv = document.getElementById("score");
    numOfDefeatedEnemies = 0;
    scoreDiv.innerText = "0";
    scoreDiv.style.width = "30px";
    scoreDiv.style.top = "440px"
    scoreDiv.style.left = "220px";
    scoreDiv.style.display = "block";


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
    enemyExplosion = setInterval(explodeEnemy, 200);
    drawArrows();
    myMove();
    enemyAAttack();
    enemyBAttack();
    checkNumOfEnemies();
    if (startGameDiv != null)
        container.removeChild(startGameDiv);
    //document.getElementById("startGame").style.display = "none";

}


function keyPressed(e) {
    try {
        var desktop = window.screen.width;
        if (parseInt(desktop) > 600) {
            var keynum;

            if (window.event) { // IE                  
                keynum = e.keyCode;
            } else if (e.which) { // Netscape/Firefox/Opera                 
                keynum = e.which;
            }

            if (parseInt(keynum) === 65 && keyLeft === false) {
                keys += "l";
            }
            if (parseInt(keynum) === 68 && keyRight === false) {
                keys += "r";
            }
            if (parseInt(keynum) === 32) {
                keys += "s";
            }
            //a = 65
            //d = 68
            //space = 32
            //for (var i = 0; i < keys.length; i++) {
            if (keys.includes("l") && keyLeft === false) {
                moveJetLeft();
                keyLeft = true;
            } else if (keys.includes("s")) {
                shoot();
            } else if (keys.includes("r") && keyRight === false) {
                moveJetRight();
                keyRight = true;
            } else if (keys.includes("r") && keys.includes("s") && keyRight === false) {
                moveJetRight();
                shoot();
            } else if (keys.includes("l") && keys.includes("s") && keyLeft === false) {
                moveJetLeft();
                shoot();
            }
            //}
        }
    } catch {

    }

}



function keyupFunction(e) {


    var keynum;
    try {
        var desktop = window.screen.width;
        if (parseInt(desktop) > 600) {

            if (window.event) { // IE                  
                keynum = e.keyCode;
            } else if (e.which) { // Netscape/Firefox/Opera                 
                keynum = e.which;
            }

            if (parseInt(keynum) === 65) {
                keys = keys.replace("l", "");
                keyLeft = false;
                stopLeftMove();
            }
            if (parseInt(keynum) === 68) {
                keys = keys.replace("r", "");
                keyRight = false;
                stopRightMove();
            }
            if (parseInt(keynum) === 32) {
                keys = keys.replace("s", "");
            }
        }
    } catch {

    }

}

function checkNumOfEnemies() {
    var checknums = setInterval(() => {
        var actualNumofEnemies = document.getElementsByClassName("enemies");
        if (actualNumofEnemies.length < 2 && endGame === false) {
            numOfEnemies = 1;
            createEnemy();
        }

    }, 10);
}



function soundOnOff() {
    if (!paused) {
        stayingAliveSong.pause();
        stayingAliveSong.currentTime = 0;
        document.getElementById("soundImage").src = "imgs/soundOff.png";
        paused = true;
    } else {
        stayingAliveSong.play();
        document.getElementById("soundImage").src = "imgs/soundOn.png";
        paused = false;
    }
}