const foodData = {
    id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    cost: [450, 150, 400, 50, 350, 300, 200, 150, 400, 50, 250, 200, 150, 50, 300, 400, 250, 100, 50, 700],
    count: [24, 41, 42, 0, 10, 1, 32, 48, 15, 29, 20, 35, 11, 17, 48, 40, 25, 5, 9, 20]
}

const myFoodData = [];
foodData.allCost = foodData.cost.reduce((sum, elem, i) => (foodData.count[i] * elem) + sum)
let credit = 0;
let procesing = false;



class Food {
    constructor(id, count, cost, img) {
        this.id = id;
        this.count = count;
        this.cost = cost;
        this.imgUrl = img;
    }
    createBlock() {
        let div = document.createElement('div');
        let img = document.createElement('img');
        let pCost = document.createElement('p');
        let pId = document.createElement('p');
        img.src = this.imgUrl;
        img.style.width = '25px';
        img.style.height = '25px';
        if (this.count == 0) {
            img.style.opacity = '0.2';
        }
        pCost.innerHTML = this.cost + 'Դ';
        pId.innerHTML = this.id;
        pId.style.color = 'black';
        pId.style.background = 'white';
        pId.style.padding = '0 10px'
        div.id = this.id;
        div.className = 'food';

        div.appendChild(pCost);
        div.appendChild(img);
        div.appendChild(pId);

        return div;
    }
    getFood() {
        let img = document.createElement('img');
        img.src = this.imgUrl;
        img.style.width = '25px';
        img.style.height = '25px';
        img.style.position = 'absolute';
        img.style.zIndex = 10;
        img.style.left = document.getElementById(this.id).offsetLeft + 6 + 'px';
        img.style.top = document.getElementById(this.id).offsetTop + 12 + 'px';
        img.animate([{
                transform: 'rotate(0deg)',
                top: document.getElementById(this.id).offsetTop + 12 + 'px'
            },
            {
                transform: 'rotate(90deg)',
                top: document.getElementById('main').clientHeight - 100 - 25 + 'px'
            },

        ], {
            fill: "forwards",
            duration: 1000,
        }).onfinish = () => {
            img.animate([{
                    width: '25px'
                },
                {
                    width: '0px'
                },

            ], {
                fill: "forwards",

                duration: 10,
            }).onfinish = () => {
                img.animate([{
                        width: '0px'
                    },
                    {
                        width: '25px'
                    },

                ], {
                    fill: "forwards",

                    duration: 10,
                }).onfinish = () => {
                    img.style.position = 'initial';
                    if (document.getElementById('takeItem').clientHeight == 0) {
                        document.getElementById('takeItem').animate([{
                                height: '0px'
                            },
                            {
                                height: '40px'
                            },

                        ], {
                            fill: "forwards",
                            duration: 1000,
                            delay: 500
                        }).onfinish = () => {

                            document.getElementById('display2').firstChild.innerHTML = 'Take it!';
                            procesing = false;

                        };
                    } else {

                        img.animate([{
                                margin: '0 0 50px'
                            },
                            {
                                margin: '0 0 0px'
                            },

                        ], {
                            fill: "forwards",
                            duration: 500,
                        }).onfinish = () => {
                            document.getElementById('display2').firstChild.innerHTML = 'Take it!';
                            procesing = false;

                        };
                    }

                    img.style.cursor = 'pointer';

                    zdachi(this.cost);
                    
                    img.addEventListener('click', () => {
                        img.remove();
                        if (document.getElementById('takeItem').childNodes.length == 0) {
                            document.getElementById('takeItem').animate([{
                                    height: '40px'
                                },
                                {
                                    height: '0px'
                                },

                            ], {
                                fill: "forwards",
                                duration: 1000,
                                delay: 500
                            })
                        }
                    })
                    document.getElementById('takeItem').appendChild(img);
                }
            }
        }

        document.getElementById('food').appendChild(img);
    }

}

class Coin {
    constructor(cost) {
        this.cost = cost;
        this.imgUrl = `img/${cost}coin.png`
    }
    exampleCoins() {
        let img = document.createElement('img');
        img.alt = this.cost;
        img.src = this.imgUrl;
        img.style.width = "50px";
        img.style.height = '50px';
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {

            let posStart = +img.style.top.replace("px", "");

            let posEnd = -80;
            let wd = 50;
            let int = setInterval(frame, 5);

            function frame() {
                if (posStart == posEnd) {
                    clearInterval(int);
                    img.style.top = 0 + 'px';
                    img.style.left = 0 + 'px';
                    img.style.width = 50 + 'px';
                } else {
                    posStart--;
                    wd--;
                    img.style.top = posStart + 'px';
                    img.style.left = posStart + 'px';
                    img.style.width = wd + 'px';
                }
            }
            credit += this.cost;
            if (document.getElementById('display').firstChild == undefined) {
                let p = document.createElement('p');
                p.innerHTML = `Credit - ${credit}`;
                p.style.fontSize = '14px';
                p.style.fontWeight = '700';
                p.style.color = '#ccc'
                document.getElementById('display').appendChild(p);
                let p2 = document.createElement('p');
                p2.style.fontSize = '14px';
                p2.style.fontWeight = '700';
                p2.style.color = '#ccc';
                p2.innerHTML = 'Select item';
                p2.animate([{
                        opacity: 1
                    },
                    {
                        opacity: 0
                    },

                ], {
                    easing: "linear",
                    iterations: Infinity,
                    duration: 1000,
                })
                if (document.getElementById('display2').innerHTML == '')
                    document.getElementById('display2').appendChild(p2);
            } else {
                if (credit <= foodData.allCost)
                    document.getElementById('display').firstChild.innerHTML = `Credit - ${credit}`;
                else
                    document.getElementById('display').firstChild.innerHTML = `Maximum credit limit is ${foodData.allCost}`

            }



        })
        return img;
    }
    returnCoin() {
        let img = document.createElement('img');
        img.alt = this.cost;
        img.src = this.imgUrl;
        img.style.width = "10px";
        img.style.height = '10px';
        img.style.cursor = 'pointer';
        img.style.margin='0';
        img.animate([{
            transform: "rotate3d(0, 1, 1, 0deg)"
        }, {
            transform: "rotate3d(0, 1, 1, 130deg)"
        }], {
            fill:'forwards',
            duration:10
        })
        img.addEventListener('click',()=>{
            img.animate([ {
                transform: "rotate3d(0, 1, 1, 80deg)",
                width:'10px',
                height:'10px'
            },
            {
                transform: "rotate3d(0, 1, 1, 0deg)",
                width:'50px',
                height:'50px'
            }
        ], {
                fill:'forwards',
                duration:10
            }).onfinish=()=>{
                document.getElementById('coins').appendChild(img);
                setTimeout(()=>{img.remove()},2000)
            }

        })
        return img
    }

}


const zdachi = (cost) => {
    let section;
    if(document.getElementById('zdachi')==undefined)
    {
     section = document.createElement('section');
    section.id = 'zdachi';
    section.style.width = '50px';
    section.style.height = '40px';
    section.style.padding = '2px';
    section.style.background = '#161113';
    section.style.position = 'absolute';
    section.style.top = '350px';
    section.style.right = '0px';
    if(credit-cost!=0)
    document.getElementById('bord').appendChild(section);

    }
    else
    section=document.getElementById('zdachi');
    credit-=cost;
    while ((credit ) >= 500) {
        let temp = new Coin(500);
        section.appendChild(temp.returnCoin());
        credit -= 500;
    }
    while ((credit) >= 200) {
        let temp = new Coin(200);
        section.appendChild(temp.returnCoin());
        credit -= 200;
    }
    while ((credit ) >= 100) {
        let temp = new Coin(100);
        section.appendChild(temp.returnCoin());
        credit -= 100;
    }
    while ((credit ) >= 50) {
        let temp = new Coin(50);
        section.appendChild(temp.returnCoin());
        credit -= 50;
    }
    document.getElementById('display').firstChild.innerHTML = 'Credit - 0'
}

(() => {
    const sec = document.createElement('section');
    sec.id = 'food';
    sec.style.background = '#171113';
    foodData.id.forEach((element, i) => {

        const temp = new Food(foodData.id[i], foodData.count[i], foodData.cost[i], `img/${foodData.id[i]}.png`);
        sec.appendChild(temp.createBlock());
        myFoodData.push(temp);
    });
    document.getElementById('main').appendChild(sec);

})()

document.getElementById('coins').appendChild(new Coin(50).exampleCoins());
document.getElementById('coins').appendChild(new Coin(100).exampleCoins());
document.getElementById('coins').appendChild(new Coin(200).exampleCoins());
document.getElementById('coins').appendChild(new Coin(500).exampleCoins());

const inputId = () => {
    let i = '';

    return id => {
        if (id != 'del') {
            if (i.length < 2)
                i = `${i}${id}`;
        } else
            i = '';
        return i

    };
}

class NumKey {
    constructor(key) {
        this.keyName = key;
    }
    keyButton() {
        let div = document.createElement('div');
        div.className = 'numKey';
        div.style.display = 'inline-block';
        div.style.padding = '3px';
        div.style.border = '1px black solid';
        div.style.background = 'gray';
        div.style.borderRadius = '10px';
        div.style.cursor = 'pointer';
        let p = document.createElement('p');
        p.style.margin = '0';
        p.style.fontSize = '10px';
        p.style.padding = '0';
        p.style.textAlign = 'center';

        p.innerHTML = this.keyName;
        div.appendChild(p);

        return div;
    }

}




const numpad = () => {
    const section = document.createElement('section');
    section.id = 'numpad';
    section.style.position = 'absolute';
    section.style.top = '200px';
    section.style.right = '10px';
    section.style.width = '50px';
    section.style.padding = '2px';
    section.style.background = '#161113';
    section.style.display = 'flex';
    section.style.flexWrap = 'wrap';
    section.style.justifyContent = 'center';
    const func = inputId();
    for (let i = 1; i < 10; i++) {
        const keyObj = new NumKey(i);
        const key = keyObj.keyButton();
        key.addEventListener('click', () => {
            if (!procesing) {
                let p = document.createElement('p');
                p.style.color = '#ccc';
                p.style.margin = '0';
                p.innerHTML = func(keyObj.keyName);
                document.getElementById('display2').innerHTML = '';
                document.getElementById('display2').appendChild(p);
            }
        })
        section.appendChild(key);


    }
    const zeroObj = new NumKey(0);
    const zero = zeroObj.keyButton();
    zero.addEventListener('click', () => {
        if (!procesing) {
            let p = document.createElement('p');
            p.style.color = '#ccc';
            p.style.margin = '0';
            p.innerHTML = func(zeroObj.keyName);
            document.getElementById('display2').innerHTML = '';
            document.getElementById('display2').appendChild(p);
        }
    })
    section.appendChild(zero);

    const removeObj = new NumKey('del')
    const remove = removeObj.keyButton();
    remove.addEventListener('click', () => {
        let p = document.createElement('p');
        p.style.color = '#ccc';
        p.style.margin = '0';
        p.innerHTML = func(removeObj.keyName);
        document.getElementById('display2').innerHTML = '';
        document.getElementById('display2').appendChild(p);
    })
    section.appendChild(remove);


    const enterObj = new NumKey('enter');

    const enter = enterObj.keyButton();
    enter.style.borderRadius = '0px';
    enter.style.width = '100%';

    enter.addEventListener('click', () => {
        let id = foodData.id.indexOf(+document.getElementById('display2').firstChild.innerHTML)
        if (!procesing) {
            procesing = true;
            if (id != -1) {
                if (myFoodData[id].count > 0) {
                    if (credit >= myFoodData[id].cost) {
                        myFoodData[id].getFood();
                        func('del');
                        document.getElementById('display2').firstChild.innerHTML = 'Pleace weit';
                    } else {
                        document.getElementById('display2').firstChild.innerHTML = 'Not enough credit ';
                        func('del');
                        procesing = false;

                    }
                } else {
                    document.getElementById('display2').firstChild.innerHTML = 'Product has ended';
                    func('del');
                    procesing = false;

                }
            } else {
                document.getElementById('display2').firstChild.innerHTML = 'Enter valid id';
                func('del');
                procesing = false;

            }
            document.getElementById('display2').firstChild.animate([{
                    opacity: 1
                },
                {
                    opacity: 0
                },

            ], {
                easing: "linear",
                iterations: Infinity,
                duration: 1000,
            })
        }
    })

    section.appendChild(enter);


    return section;

}

document.getElementById('main').appendChild(numpad());