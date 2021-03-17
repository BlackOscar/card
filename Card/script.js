const div = document.querySelectorAll('.div');
console.log('div', div)
let draggedItem = null;
var dragDiv = null
var valueOldCard = 0;
var cardList = {
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}
var idCard = 0

function randomCard() {
    let random = Math.floor(Math.random() * 13);
    console.log('random', random)
    return cardList['cards'][random];
}

function addRandomCard(e) {
    let fix = 0;
    for (let i = 0; i < div.length; i++) {
        let lenDiv = div[i].querySelectorAll('img');
        let newDiv = document.createElement('div');
        newDiv.className = 'child';
        newDiv.draggable = 'true'
        let len = div[i].querySelectorAll('img');
        fix = len.length * 40;
        let random = randomCard();
        let img = document.createElement('img');
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
        }
        img.setAttribute('value', random);
        img.style.position = "absolute";
        img.style.top = `${fix}px`;
        img.style.left = "34px";
        img.style.border = "4px solid black";
        img.id = idCard
        idCard += 1


        if (lenDiv.length === 0) {
            div[i].appendChild(img);


        } else {
            let curr = random;
            let old = 0;
            oldImg = lenDiv[lenDiv.length - 1]
            old = oldImg.getAttribute('value')
                // console.log("curr", curr);
            console.log("old", old);

            let check = old - curr;
            if (check === 1) {
                newDiv.appendChild(oldImg)
                newDiv.appendChild(img)
                div[i].appendChild(newDiv)
                    // for (let a = 0; a < lenDiv.length; a++) {
                    //     console.log("len of div", a, " ", lenDiv[a])
                    //     lenDiv[a].appendChild(img);
                    // }

            } else {
                div[i].appendChild(img);

            }

        }
    }
    checkDraggable();
    cardEvent();
}




function cardEvent() {
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        const item = images[i];
        item.addEventListener('dragstart', function() {
            draggedItem = item;
            setTimeout(function() {
                    item.style.display = 'none';
                }, 0)
                // console.log('dragstart')
        });
        item.addEventListener('dragend', function() {

            draggedItem.style.display = 'block';
            draggedItem = null;
            //console.log('dragend')
        })
    }
}


function divChildEvent() {
    let divChilds = document.querySelectorAll('.child');

    for (let i = 0; i < divChilds.length; i++) {
        let item = divChilds[i];
        item.addEventListener('dragstart', function() {
            dragDiv = item;
            console.log('dragIem', dragDiv)
            setTimeout(function() {
                    item.style.display = 'none';
                }, 0)
                // console.log('dragstart')
        });
        item.addEventListener('dragend', function() {

            dragDiv.style.display = 'block';
            dragDiv = null;
            //console.log('dragend')
        })
    }
}

function checkDraggable() {
    for (let i = 0; i < div.length; i++) {
        let divLen = div[i].querySelectorAll('img');
        for (let j = 0; j < divLen.length; j++) {
            if (j == divLen.length - 1) {
                divLen[j].setAttribute('draggable', true);
            } else {
                divLen[j].setAttribute('draggable', false);
            }
        }
    }
}

function createNewDiv(oldCard, draggedItem, col) {
    let newDiv = document.createElement('div')
    newDiv.className = 'child'
    newDiv.draggable = 'true'
    newDiv.appendChild(oldCard)
    newDiv.appendChild(draggedItem)
    col.append(newDiv)
}

for (let j = 0; j < div.length; j++) {
    const list = div[j];
    list.addEventListener('dragover', function(e) {
        e.preventDefault();
        console.log("over");
    });
    list.addEventListener('dragenter', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        console.log("enter");
    });
    list.addEventListener('dragleave', function(e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        console.log("leave");
    });
    list.addEventListener('drop', function(e) {
        let divImg = this.querySelectorAll('img');
        let oldCard = divImg[divImg.length - 1]
        valueOldCard = oldCard.getAttribute('value');
        if (draggedItem != null) {
            console.log("is not null")
            let fixTop = 0;
            console.log('len', divImg);
            let valueOfCurrentCard = draggedItem.getAttribute('value');

            let check = valueOfCurrentCard - valueOldCard;
            if (check === -1) {
                let divChild = this.querySelectorAll('div')
                if (divChild.length > 0) {
                    let divChildImg = divChild[divChild.length - 1].querySelectorAll('img')
                    let child = divChildImg[divChildImg.length - 1]
                    if (child.id === oldCard.id) {
                        divChild[divChild.length - 1].appendChild(draggedItem)
                    } else {
                        createNewDiv(oldCard, draggedItem, this)
                    }
                    //console.log('old card ', oldCard.id)
                    //divChild[divChild.length - 1].appendChild(draggedItem)
                } else {
                    createNewDiv(oldCard, draggedItem, this)

                    // let fixTopDiv = divImg.length * 40;
                    // newDiv.style.top = `${fixTopDiv}px`;
                }
                //console.log("div child ", divChild)

                fixTop += divImg.length * 40;
                draggedItem.style.position = "absolute";
                draggedItem.style.top = `${fixTop}px`;
                draggedItem.style.left = "34px";
                draggedItem.style.border = "4px solid black";
                checkDraggable();
            }
            divChildEvent();

        }
        if (dragDiv != null) {
            let imgDragDiv = dragDiv.querySelectorAll('img')
            let valueOfDiv = imgDragDiv[0].getAttribute('value')
            console.log('drag div', valueOfDiv, valueOldCard)
            let check = valueOldCard - valueOfDiv
            if (check === 1) {
                let divChild = this.querySelectorAll('div')
                if (divChild.length > 0) {
                    let divChildImg = divChild[divChild.length - 1].querySelectorAll('img')
                    let child = divChildImg[divChildImg.length - 1]
                    if (child.id === oldCard.id) {
                        console.log("adsfadsfagfjagfhjadhsfga")
                        divChild[divChild.length - 1].appendChild(dragDiv)
                        let fixTop = 40
                        dragDiv.style.position = "absolute";
                        dragDiv.style.top = `${fixTop}px`;
                        dragDiv.style.left = "20px";
                        fixTop = divImg.length * 40;

                    } else {
                        //dragDiv.append(oldCard)
                    }
                } else {
                    let newDiv = document.createElement('div')
                    newDiv.draggable = 'true'
                    newDiv.appendChild(oldCard)
                    newDiv.append(dragDiv)
                    this.append(newDiv)
                        //dragDiv.append(oldCard)
                }
                //this.append(dragDiv)
                let fixTop = 40
                dragDiv.style.position = "absolute";
                dragDiv.style.top = `${fixTop}px`;
                dragDiv.style.left = "0px";
                fixTop = divImg.length * 40;
            }
            //checkDraggable();
        }

        valueOldCard = valueOfCurrentCard;


    });
}

cardEvent();