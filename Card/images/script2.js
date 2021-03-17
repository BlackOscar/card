const div = document.querySelectorAll('#div');

let draggedItem = null;
var valueOldCard = 0;

var cardList = {
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}

function randomCard() {
    let random = Math.floor(Math.random() * 13);
    return cardList['cards'][random];
}

function addRandomCard(e) {
    let fix = 0

    for (let i = 0; i < div.length; i++) {
        let len = div[i].querySelectorAll('img')
        fix = len.length * 40
        let random = randomCard()
        let img = document.createElement('img')
        img.src = `images/${random}.png`
        img.draggable = 'true'
        if (random === 'A') {
            random = '1'
        } else if (random === "J") {
            random = '11'
        } else if (random === "Q") {
            random = '12'
        } else if (random === "K") {
            random = '13'
        }
        img.setAttribute('value', random)
        img.style.position = "absolute";
        img.style.top = `${fix}px`;
        img.style.left = "34px"
        img.style.border = "4px solid black";
        div[i].appendChild(img)
    }
    checkDraggable()
    cardEvent()
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
        });

        item.addEventListener('dragend', function() {
            console.log("item", draggedItem)
            draggedItem.style.display = 'block';
            draggedItem = null;

        })
    }
}

function checkDraggable() {
    for (let i = 0; i < div.length; i++) {
        let divLen = div[i].querySelectorAll('img')
        for (let j = 0; j < divLen.length; j++) {
            if (j == divLen.length - 1) {
                divLen[j].setAttribute('draggable', true)
            } else {
                divLen[j].setAttribute('draggable', false)
            }

        }
    }
}

cardEvent()


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
        let fixTop = 0;
        let divImg = this.querySelectorAll('img');
        console.log('len', divImg)
        valueOfCurrentCard = draggedItem.getAttribute('value');
        valueOldCard = divImg[divImg.length - 1].getAttribute('value')
        let check = valueOfCurrentCard - valueOldCard
        if (check === -1) {
            this.append(draggedItem);
            valueOldCard = valueOfCurrentCard
            fixTop += divImg.length * 40
            draggedItem.style.position = "absolute";
            draggedItem.style.top = `${fixTop}px`;
            draggedItem.style.left = "34px"
            draggedItem.style.border = "4px solid black";
            checkDraggable()
        }
    });
}