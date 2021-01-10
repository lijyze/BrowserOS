/**
 * Created by 30825 on 2017/11/17.
 */
onload = function () {
    (function () {
        function Sweeper() {
            this.width = 23;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            this.timer = undefined;
            this.timerState = false;
            this.openedArr = [];
            this.flagArr = [];
            this.boomArr = [];
            this.canvas = document.getElementById("canvas");
            this.canvas.width = 1200;
            this.canvas.height = 700;
            this.ctx = canvas.getContext("2d");
            this.colorSet = [undefined, "#00f", "#008000", "#f00", "#000080", "#800000", "#008080", "#000", "#808080"];
            this.easy = document.getElementsByTagName("button")[0];
            this.middle = document.getElementsByTagName("button")[1];
            this.hard = document.getElementsByTagName("button")[2];
            this.define = document.getElementsByTagName("button")[3];
            this.defineBox = document.getElementById("define");
            this.defineBoxSubmit = document.getElementsByTagName("button")[4];
            this.defineBoxCancel = document.getElementsByTagName("button")[5];
            this.defineX = document.getElementsByTagName("input")[3];
            this.defineY = document.getElementsByTagName("input")[4];
            this.defineBoom = document.getElementsByTagName("input")[5];
            this.boomCount = document.getElementsByTagName("input")[0];
            this.time = document.getElementsByTagName("input")[1];

            this.canvas.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            })
        }

        //用于初始游戏绘制
        Sweeper.prototype.draw = function () {
            this.moveX = (1200 - this.x * 25) / 2;
            this.moveY = (700 - this.y * 25) / 2;
            this.ctx.clearRect(0, 0, 1200, 700);
            this.ctx.beginPath();
            this.ctx.fillStyle = "#888";
            this.ctx.rect(this.moveX, this.moveY, this.x * 25, this.y * 25);
            this.ctx.fill();
            for (var i = 0; i < this.x; i++) {
                for (var j = 0; j < this.y; j++) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#ccc";
                    this.ctx.rect(i * 25 + 1 + this.moveX, j * 25 + 1 + this.moveY, this.width, this.width);
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#888";
                    this.ctx.rect(i * 25 + 3 + this.moveX, j * 25 + 3 + this.moveY, this.width - 4, this.width - 4);
                    this.ctx.fill();
                }
            }
        };

        //鼠标按下时的动画效果
        Sweeper.prototype.tap = function (i, j) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#555";
            this.ctx.rect(i * 25 + this.moveX, j * 25 + this.moveY, 25, 25);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.fillStyle = "#bbb";
            this.ctx.rect(i * 25 + this.moveX + 1, j * 25 + this.moveY + 1, this.width, this.width);
            this.ctx.fill();
        };

        //鼠标移动后抬起时的动画效果
        Sweeper.prototype.up = function () {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#888";
            this.ctx.rect(this.mouseDownX * 25 + this.moveX, this.mouseDownY * 25 + this.moveY, 25, 25);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.fillStyle = "#ccc";
            this.ctx.rect(this.mouseDownX * 25 + this.moveX + 1, this.mouseDownY * 25 + this.moveY + 1, this.width, this.width);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.fillStyle = "#888";
            this.ctx.rect(this.mouseDownX * 25 + this.moveX + 3, this.mouseDownY * 25 + this.moveY + 3, this.width - 4, this.width - 4);
            this.ctx.fill();
        };

        //用于测试array中是否包含[a, b]
        Sweeper.prototype.contains = function (array, a, b) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][0] === a && array[i][1] === b) {
                    return i;
                }
            }
            return false;
        };

        //用于深拷贝二维数组
        Sweeper.prototype.deepCopy = function (array) {
            var arr = [];
            for (var i = 0; i < array.length; i++) {
                arr[i] = [];
                for(var j = 0; j < array[i].length; j++) {
                    arr[i][j] = array[i][j];
                }
            }
            return arr;
        };

        //使用旗子标记的处理程序
        Sweeper.prototype.flagToggle = function (i, j) {
            var temp = this.contains(this.flagArr, i, j);
            if (temp !== false) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#888";
                this.ctx.rect(i * 25 + this.moveX + 3, j * 25 + this.moveY + 3, this.width - 4, this.width - 4);
                this.ctx.fill();
                this.count++;
                this.boomCount.value = this.count;
                this.flagArr.splice(temp, 1);
            } else {
                this.ctx.beginPath();
                this.ctx.fillStyle = "red";
                this.ctx.moveTo(i * 25 + this.moveX + 10, j * 25 + this.moveY + 5);
                this.ctx.lineTo(i * 25 + this.moveX + 10, j * 25 + this.moveY + 13);
                this.ctx.lineTo(i * 25 + this.moveX + 18, j * 25 + this.moveY + 13);
                this.ctx.lineTo(i * 25 + this.moveX + 10, j * 25 + this.moveY + 5);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.fillStyle = "black";
                this.ctx.rect(i * 25 + this.moveX + 10, j * 25 + this.moveY + 13, 2, 8);
                this.ctx.fill();
                this.count--;
                this.boomCount.value = this.count;
                this.flagArr.push([i, j]);
            }
        };

        //点开砖块的处理程序
        Sweeper.prototype.open = function () {
            //空白区域
            if (this.finalList[this.mouseDownX][this.mouseDownY] === 0) {
                this.case = true;
                var space = [[this.mouseDownX, this.mouseDownY]];
                var around;
                for (var i = 0; i < space.length; i++) {
                    around = this.getAround(space[i][0], space[i][1]);
                    for (var j = 0; j < around.length; j++) {
                        if (this.finalList[around[j][0]][around[j][1]] === 0 && typeof this.contains(space, around[j][0], around[j][1]) !== "number") {
                            space.push(around[j]);
                        }
                    }
                }
                var spaceAndFlag = this.deepCopy(space);
                for (var i = 0; i < space.length; i++) {
                    around = this.getAround(space[i][0], space[i][1]);
                    for (var j = 0; j < around.length; j++) {
                        if (this.contains(spaceAndFlag, around[j][0], around[j][1]) === false) {
                            spaceAndFlag.push(around[j]);
                        }
                    }
                }
                var openArr = this.deepCopy(spaceAndFlag);
                for (var i = 0; i < openArr.length; i++) {
                    if (this.contains(this.flagArr, openArr[i][0], openArr[i][1])) {
                        openArr.splice(i, 1);
                        i--;
                    }
                }
                for (var i = 0; i < openArr.length; i++) {
                    this.tap(openArr[i][0], openArr[i][1]);
                    if (this.finalList[openArr[i][0]][openArr[i][1]] !== 0) {
                        this.ctx.font = "700 20px Arial";
                        this.ctx.textAlign = "center";
                        this.ctx.textBaseline = "middle";
                        this.ctx.fillStyle = this.colorSet[this.finalList[openArr[i][0]][openArr[i][1]]];
                        this.ctx.fillText(this.finalList[openArr[i][0]][openArr[i][1]], openArr[i][0] * 25 + this.moveX + 12.5, openArr[i][1] * 25 + this.moveY + 12.5);
                    }
                    if (this.contains(this.openedArr, openArr[i][0], openArr[i][1]) === false) {
                        this.openedArr.push(openArr[i]);
                    }
                }
                if (this.timerState === false) {
                    this.timeKeeper();
                }
                //数字
            } else if(typeof this.finalList[this.mouseDownX][this.mouseDownY] === "number") {
                this.case = true;
                this.ctx.font = "700 20px Arial";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillStyle = this.colorSet[this.finalList[this.mouseDownX][this.mouseDownY]];
                this.ctx.fillText(this.finalList[this.mouseDownX][this.mouseDownY], this.mouseDownX * 25 + this.moveX + 12.5, this.mouseDownY * 25 + this.moveY + 12.5);
                if (this.timerState === false) {
                    this.timeKeeper();
                }
                this.openedArr.push([this.mouseDownX, this.mouseDownY]);
            } else {
                //炸弹
                this.case = false;
                this.ctx.beginPath();
                this.ctx.fillStyle = "red";
                this.ctx.rect(this.mouseDownX * 25 + this.moveX + 1, this.mouseDownY * 25 + this.moveY + 1, this.width, this.width);
                this.ctx.fill();
                for (var i = 0; i < this.boomArr.length; i++) {
                    if (this.contains(this.flagArr, this.boomArr[i][0], this.boomArr[i][1]) === false) {
                        if (this.boomArr[i][0] !== this.mouseDownX || this.boomArr[i][1] !== this.mouseDownY) {
                            this.tap(this.boomArr[i][0], this.boomArr[i][1]);
                        }
                        this.ctx.font = "700 20px Arial";
                        this.ctx.textAlign = "center";
                        this.ctx.textBaseline = "middle";
                        this.ctx.fillStyle = "black";
                        this.ctx.fillText("☀", this.boomArr[i][0] * 25 + this.moveX + 12.5, this.boomArr[i][1] * 25 + this.moveY + 12.5);
                    }
                }
                for (var i = 0; i < this.flagArr.length; i++) {
                    if (this.contains(this.boomArr, this.flagArr[i][0], this.flagArr[i][1]) === false) {
                        this.tap(this.flagArr[i][0], this.flagArr[i][1]);
                        this.ctx.font = "700 25px Arial";
                        this.ctx.textAlign = "center";
                        this.ctx.textBaseline = "middle";
                        this.ctx.fillStyle = "black";
                        this.ctx.fillText("×", this.flagArr[i][0] * 25 + this.moveX + 12.5, this.flagArr[i][1] * 25 + this.moveY + 12.5)
                    }
                }
                this.over();
                if (this.timerState === true) {
                    this.stopTimeKeeper();
                }
            }
            if (this.case && this.openedArr.length + this.boomArr.length === this.x * this.y) {
                for (var i = 0; i < this.boomArr.length; i++) {
                    if (this.contains(this.flagArr, this.boomArr[i][0], this.boomArr[i][1]) === false) {
                        this.flagToggle(this.boomArr[i][0], this.boomArr[i][1]);
                    }
                }
                this.over();
                if (this.timerState === true) {
                    this.stopTimeKeeper();
                }
                setTimeout(function () {
                    alert("Congratulations");
                }, 1)
            }
        };

        //创建只有炸弹信息的二维数组
        Sweeper.prototype.createBoomList = function () {
            var queue = [];
            var booms = [];
            this.boomList = [];
            for (var i = 0; i < this.x; i++) {
                this.boomList.push([]);
                for (var j = 0; j < this.y; j++) {
                    this.boomList[i].push(undefined);
                }
            }
            for (var i = 0; i < this.x * this.y; i++) {
                queue.push(i);
            }
            for (var i = 0; i < this.count && i < this.x * this.y; i++) {
                booms.push(queue.splice(Math.floor(Math.random() * queue.length), 1)[0]);
            }
            for (var i = 0; i < booms.length; i++) {
                this.boomArr.push([Math.floor(booms[i] / this.y), booms[i] % this.y]);
                this.boomList[Math.floor(booms[i] / this.y)][booms[i] % this.y] = "boom";
            }
        };

        //返回一个二维数组，数组的每一项是周围格
        Sweeper.prototype.getAround = function (i, j) {
            var around = [];
            var l = [i - 1, j],
                lt = [i - 1, j - 1],
                t = [i, j - 1],
                tr = [i + 1, j - 1],
                r = [i + 1, j],
                rb = [i + 1, j + 1],
                b = [i, j + 1],
                bl = [i - 1, j + 1];
            if (i === 0 && j === 0) {
                around.push(r, rb, b);
            } else if (i === 0 && j === this.y - 1) {
                around.push(t, tr, r);
            } else if (i === this.x - 1 && j === 0) {
                around.push(b, bl, l);
            } else if (i === this.x - 1 && j === this.y - 1) {
                around.push(l, lt, t);
            } else if (i === 0) {
                around.push(t, tr, r, rb, b);
            } else if (j === 0) {
                around.push(r, rb, b, bl, l);
            } else if (i === this.x - 1) {
                around.push(b, bl, l, lt, t);
            } else if (j === this.y - 1) {
                around.push(l, lt, t, tr, r);
            } else {
                around.push(l, lt, t, tr, r, rb, b, bl);
            }
            return around;
        };

        //返回一个二维数组，数组中的每一项是方块周围的炸弹。
        Sweeper.prototype.getAroundBooms = function (i, j) {
            var around = this.getAround(i, j);
            var aroundBooms = [];
            for (var k = 0; k < around.length; k++) {
                if (this.boomList[around[k][0]][around[k][1]] === "boom") {
                    aroundBooms.push(around[k]);
                }
            }
            return aroundBooms;
        };

        //创建含有含有表示周边炸弹数量的数字的最终游戏数组
        Sweeper.prototype.getFinalArr = function () {
            this.finalList = this.deepCopy(this.boomList);
            for (var i = 0; i < this.x; i++) {
                for (var j = 0; j < this.y; j++) {
                    if (this.finalList[i][j] === undefined) {
                        this.finalList[i][j] = this.getAroundBooms(i, j).length;
                    }
                }
            }
        };

        //可以创建不同布局的游戏
        Sweeper.prototype.reset = function (x, y, count) {
            this.x = x;
            this.y = y;
            this.count = count;
            this.openedArr = [];
            this.flagArr = [];
            this.boomArr = [];
            game.createBoomList();
            game.getFinalArr();
        };

        //计时器
        Sweeper.prototype.timeKeeper = function () {
            this.timer = setInterval(function () {
                game.second++;
                var hour = game.hour > 9 ? game.hour : "0" + game.hour;
                var minute = game.minute > 9 ? game.minute : "0" + game.minute;
                var second = game.second > 9 ? game.second : "0" + game.second;
                if (game.second === 60) {
                    game.second = 0;
                    game.minute++;
                    if (game.minute === 60) {
                        game.minute = 0;
                        game.hour++;
                    }
                }
                game.time.value = hour + ":" + minute + ":" + second;
            }, 1000);
            this.timerState = true;
        };

        //关闭计时器
        Sweeper.prototype.stopTimeKeeper = function () {
            clearInterval(this.timer);
            this.timerState = false;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
        };

        //游戏处理程序
        Sweeper.prototype.processingProgram = function (e) {
            var that = this;
            this.mouseDownX = Math.floor((e.pageX - this.moveX) / 25);
            this.mouseDownY = Math.floor((e.pageY - this.moveY) / 25);
            if (this.mouseDownX >= 0 && this.mouseDownX <this.x && this.mouseDownY >= 0 && this.mouseDownY < this.y && this.contains(this.openedArr, this.mouseDownX, this.mouseDownY) === false) {
                if (e.button === 2) {
                    function flagToggle(e) {
                        that.mouseUpX = Math.floor((e.pageX - that.moveX) / 25);
                        that.mouseUpY = Math.floor((e.pageY - that.moveY) / 25);
                        if (that.mouseDownX === that.mouseUpX && that.mouseDownY === that.mouseUpY) {
                            that.flagToggle(that.mouseDownX, that.mouseDownY);
                        }
                        that.canvas.removeEventListener("mouseup", flagToggle);
                    }
                    this.canvas.addEventListener("mouseup", flagToggle);
                } else if (this.contains(this.flagArr, this.mouseDownX, this.mouseDownY) === false){
                    this.tap(this.mouseDownX, this.mouseDownY);
                    function up(e) {
                        that.mouseUpX = Math.floor((e.pageX - that.moveX) / 25);
                        that.mouseUpY = Math.floor((e.pageY - that.moveY) / 25);
                        if (that.mouseDownX === that.mouseUpX && that.mouseDownY === that.mouseUpY) {
                            that.open();
                        } else {
                            that.up();
                        }
                        that.canvas.removeEventListener("mouseup", up);
                    }
                    this.canvas.addEventListener("mouseup", up)
                }
            }
        };

        // bridge
        function bridge(e) {
            game.processingProgram(e)
        };
        
        //游戏开始
        Sweeper.prototype.start = function () {
            var that = this;
            this.canvas.addEventListener("mousedown", bridge);
        };

        //游戏结束
        Sweeper.prototype.over = function () {
            this.canvas.removeEventListener("mousedown", bridge);
        };

        var game = new Sweeper();



        //注册简单，中等，困难的点击事件
        game.easy.addEventListener("click", function () {
            game.stopTimeKeeper();
            game.time.value = "00:00:00";
            game.reset(9, 9, 10);
            game.draw();
            game.boomCount.value = game.count;
            game.start();
        });
        game.middle.addEventListener("click", function () {
            game.stopTimeKeeper();
            game.time.value = "00:00:00";
            game.reset(16, 16, 40);
            game.draw();
            game.boomCount.value = game.count;
            game.start();
        });
        game.hard.addEventListener("click", function () {
            game.stopTimeKeeper();
            game.time.value = "00:00:00";
            game.reset(30, 16, 99);
            game.draw();
            game.boomCount.value = game.count;
            game.start();
        });

        //注册自定义按钮的点击事件
        game.define.addEventListener("click", function () {
            game.defineBox.style.display = "block";
            // game.defineBox.style.zIndex = 1;
            setTimeout(function () {
                game.defineBox.style.transition = "all 0.3s";
                game.defineBox.style.opacity = 1;
                game.defineBox.style.top = 150 + "px";
            }, 1);
        });
        game.defineBoxSubmit.addEventListener("click", function () {
            var x = game.defineX.value;
            var y = game.defineY.value;
            var bCount = game.defineBoom.value;
            if (x >= 10 && x <= 48 && y >= 10 && y <= 28 && bCount >= 0) {
                game.stopTimeKeeper();
                game.defineX.value = "";
                game.defineY.value = "";
                game.defineBoom.value = "";
                game.defineBox.style.display = "none";
                // game.defineBox.style.zIndex = 0;
                game.defineBox.style.transition = false;
                game.defineBox.style.opacity = 0;
                game.defineBox.style.top = 200 + "px";
                game.time.value = "00:00:00";
                game.reset(x, y, bCount);
                game.draw();
                game.boomCount.value = game.count;
                game.start();
            } else {
                alert("超出范围");
            }
        });
        game.defineBoxCancel.addEventListener("click", function () {
            game.defineX.value = "";
            game.defineY.value = "";
            game.defineBoom.value = "";
            game.defineBox.style.display = "none";
            // game.defineBox.style.zIndex = 0;
            game.defineBox.style.transition = false;
            game.defineBox.style.opacity = 0;
            game.defineBox.style.top = 200 + "px";
        });
    })();
};