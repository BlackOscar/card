var allDiv = document.querySelectorAll('div')
var draggedItem = null;
var cardList = {
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}
var cardId = 0

function cardEvent() {
    let divChilds = document.querySelectorAll('.child');
    for (let i = 0; i < divChilds.length; i++) {
        const item = divChilds[i];
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

function randomCard() {
    let random = Math.floor(Math.random() * 13);
    console.log('random', random)
    return cardList['cards'][random];
}

function addRandomCard() {
    let fix = 0;
    for (let i = 0; i < allDiv.length; i++) {

        let currentDiv = allDiv[i]
        let lenImgDiv = currentDiv.querySelectorAll('img')
        fix = lenImgDiv.length * 40;
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
        }
        img.setAttribute('value', random);
        img.id = cardId
        img.style.position = "absolute";
        img.style.top = `${fix}px`;
        img.style.left = "34px";
        cardId += 1

        let divChild = currentDiv.querySelectorAll('.child')

        if (divChild.length === 0) {
            newDiv.appendChild(img)
            currentDiv.appendChild(newDiv)
        } else {
            let currentImgVl = random
            let oldDiv = divChild[divChild.length - 1]
            let divChildImg = oldDiv.querySelectorAll('img')
            let oldImgVl = divChildImg[divChildImg.length - 1].getAttribute('value')
            if ((oldImgVl - currentImgVl) === 1) {
                oldDiv.appendChild(img)
            } else {
                newDiv.appendChild(img)
                currentDiv.appendChild(newDiv)
            }
            console.log(currentImgVl, oldImgVl)
        }

    }
    cardEvent()
}

function cardEvent() {
    let divChilds = document.querySelectorAll('.child');
    if (divChilds.length > 0) {
        for (let i = 0; i < divChilds.length; i++) {
            let item = divChilds[i];
            item.addEventListener('dragstart', function() {
                console.log('start')
                draggedItem = item;
                setTimeout(function() {
                    item.style.display = 'none';
                }, 0)
            });
            item.addEventListener('dragend', function() {
                draggedItem.style.display = 'block';
                draggedItem = null;
                console.log('end')
            })
        }
    }

}

function checkDraggable() {
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i].querySelectorAll('.child');
        for (let j = 0; j < divChild.length - 1; j++) {
            divChild[j].setAttribute('draggable', false);
        }
    }
}

function check(old, curr) {
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



        let divChild = this.querySelectorAll('.child')
        let divImg = this.querySelectorAll('img')
        if (divChild.length === 0) {
            this.appendChild(draggedItem)
        } else {

            let oldChildImg = divChild[divChild.length - 1].querySelectorAll('img')
                //let oldChildId = oldChildImg[oldChildImg.length - 1].id
                //console.log("id old", oldChildId)
            let oldChildImgVl = oldChildImg[0].getAttribute('value')
            console.log(" old", oldChildImgVl)
            let currChildImg = draggedItem.querySelectorAll('img')
            let currChildImgVl = currChildImg[0].getAttribute('value')

            let checkVl = check(oldChildImgVl, currChildImgVl)
            if (checkVl) {
                let lastDivChild = divChild[divChild.length - 1]
                lastDivChild.appendChild(draggedItem)
                    // let lastDivChildImg = lastDivChild.querySelectorAll('img')
                    // let lastDivChildImgId = lastDivChildImg[lastDivChildImg.length - 1].id
                    //     //console.log('last div child', lastDivChildImgId)
                    // if (lastDivChildImgId === oldChildId) {

                // }

                //console.log(lastDivChildImg)

                //this.appendChild(draggedItem)
                fixTop = divChild.length * 40;
                draggedItem.style.position = "absolute";
                draggedItem.style.top = `${fixTop}px`;
                draggedItem.style.left = "0px";


            }

        }






        //draggedItem.style.border = "4px solid black";
    });
}