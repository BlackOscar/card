var allDiv = document.querySelectorAll('div');
var draggedItem = null;
var cardList = {
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}
var cardId = 0;
var styleTop = 40;

function randomCard() {
    let random = Math.floor(Math.random() * 13);
    return cardList['cards'][random];
}

async function addRandomCardBtn() {
    for (let i = 0; i < allDiv.length; i++) {
        let currentDiv = allDiv[i]
            //fix = 40;
        let random = randomCard();
        let img = document.createElement('img');
        let newDiv = document.createElement('div')
        newDiv.className = 'child'
        img.src = `images/${random}.png`;
        img.draggable = 'true';
        if (random === 'A') {
            random = '1';
        } else if (random === "J") {
            random = '11';
        } else if (random === "Q") {
            random = '12';
        } else if (random === "K") {
            random = '13';
            newDiv.setAttribute('cardName', 'K');
        } else {
            newDiv.setAttribute('cardName', 'card');
        }
        img.setAttribute('value', random);
        img.id = cardId;
        img.style.position = "absolute";
        newDiv.style.top = `${styleTop}px`;
        img.style.left = "34px";
        cardId += 1;
        newDiv.appendChild(img);
        let divChild = currentDiv.querySelectorAll('.child')
        if (divChild.length === 0) {
            currentDiv.appendChild(newDiv);
        } else {
            let oldDiv = divChild[divChild.length - 1];
            oldDiv.appendChild(newDiv);
        }
        await sleep(200)
    }
    setDivChild();
}

function addRandomCardAuto() {
    for (let i = 0; i < allDiv.length; i++) {
        let currentDiv = allDiv[i];
        //fix = 40;
        let random = randomCard();
        let img = document.createElement('img');
        let newDiv = document.createElement('div');
        newDiv.className = 'child';
        img.src = `images/${random}.png`;
        img.draggable = 'true';
        if (random === 'A') {
            random = '1';
        } else if (random === "J") {
            random = '11';
        } else if (random === "Q") {
            random = '12';
        } else if (random === "K") {
            random = '13';
            newDiv.setAttribute('cardName', 'K');
        } else {
            newDiv.setAttribute('cardName', 'card');
        }
        img.setAttribute('value', random);
        img.id = cardId;
        img.style.position = "absolute";
        newDiv.style.top = "0px";
        img.style.left = "34px";
        cardId += 1;
        newDiv.appendChild(img);
        let divChild = currentDiv.querySelectorAll('.child');
        if (divChild.length === 0) {
            currentDiv.appendChild(newDiv);
        } else {
            let oldDiv = divChild[divChild.length - 1];
            oldDiv.appendChild(newDiv);
        }
    }
    setDivChild();
}

for (let i = 0; i < 10; i++) {
    addRandomCardAuto();
}

function setDivChild() {
    let divChilds = document.querySelectorAll('.child');
    if (divChilds.length > 0) {
        for (let i = 0; i < divChilds.length; i++) {
            let item = divChilds[i];
            item.addEventListener('dragstart', function(event) {
                //k day event len div cha
                event.stopPropagation();
                let checkDivIsValid = this.querySelectorAll('img');
                console.log(checkDivIsValid)
                for (let i = 0; i < checkDivIsValid.length - 1; i++) {
                    count = 0
                    if (checkDivIsValid[i].getAttribute("value") - checkDivIsValid[i + 1].getAttribute("value") != 1) {
                        return
                    }
                }
                draggedItem = item;
                setTimeout(function() {
                    item.style.display = 'none';
                }, 0)
            });
            item.addEventListener('dragend', function() {
                if (draggedItem != null) {
                    draggedItem.style.display = 'block';
                }
                draggedItem = null;
                console.log('end');
            })
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => {
        console.log(resolve);
        setTimeout(resolve, ms);
    });
}

function drop() {
    let divChild = this.querySelectorAll('.child')

    let score = 0;
    let divChildImg = this.querySelectorAll('img')
    if (divChild.length === 0) {
        this.appendChild(draggedItem);
    } else {
        let oldChildImg = divChild[divChild.length - 1].querySelectorAll('img')
        let oldChildImgVl = oldChildImg[oldChildImg.length - 1].getAttribute('value')
            //console.log(" old", oldChildImgVl)
        let currChildImg = draggedItem.querySelectorAll('img');
        let currChildImgVl = currChildImg[0].getAttribute('value');
        let isValid = checkValid(oldChildImgVl, currChildImgVl);
        if (isValid) {
            if (draggedItem.style.top === '0px') {
                draggedItem.style.top = '40px';
            }
            let lastDivChild = divChild[divChild.length - 1]
            lastDivChild.appendChild(draggedItem)
            draggedItem.style.position = "absolute";
            draggedItem.style.left = "0px";
            let lastDivChildImg = lastDivChild.querySelectorAll('img');
            checkWin(divChild);
        }
    }
}

function checkWin(divChild) {
    let divK;
    for (let i = 0; i < divChild.length; i++) {
        if (divChild[i].getAttribute('cardName') === "K") {
            divK = divChild[i]
        }
    }

    if (divK) {
        let Kimg = divK.querySelectorAll('img')
        let curr
        for (let j = 0; j < Kimg.length - 1; j++) {
            let oldImgValue = Kimg[j].getAttribute('value')
            let currImgValue = Kimg[j + 1].getAttribute('value')
            let isValidValue = oldImgValue - currImgValue
            if (isValidValue != 1) {
                return
            }
        }
        if (Kimg.length === 3) {
            alert('ĐÚNG LÀ CON TRAI CỦA TA!')
            let score = parseInt(document.getElementById('score').innerHTML)
            document.getElementById('score').innerHTML = score + 1
            divK.remove()
        }

    }

    console.log('k', divK)
        // if (lastDivChildImg.length === 4) {
        //     console.log("adfgashfjgadhjsfghjasdfhj")
        //     alert('GIỎI LẮM! ĐÚNG LÀ CON TRAI CỦA TAAAAAAA!')
        //     lastDivChild.remove()
        //     let score = parseInt(document.getElementById('score').innerHTML)
        //     document.getElementById('score').innerHTML = score + 1
        // }
}

function checkValid(old, curr) {
    if ((old - curr) === 1) {
        return true
    } else {
        return false
    }
}

for (let j = 0; j < allDiv.length; j++) {
    let list = allDiv[j];
    var fixTop = 0

    list.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    // list.addEventListener('dragenter', function(e) {
    //     e.preventDefault();
    //     this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    // });
    // list.addEventListener('dragleave', function(e) {
    //     //this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    // });
    list.addEventListener('drop', drop);
}