$(document).ready(function () {

    let cellContainer = $(".input-cell-container");

    for (let i = 1; i <= 100; i++) {
        let ans = "";
        let n = i;

        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                ans = "Z" + ans;
                n = Math.floor(n / 26) - 1;
            }
            else {
                ans = String.fromCharCode(rem - 1 + 65) + ans;
                n = Math.floor(n / 26);
            }
        }

       // let column = $(`<div class="column-name" id="columnCode-${ans} columnId-${i}">${ans}</div>`);
        // column is made
        let column = $(`<div class="column-name columnId-${i}" id="columnCode-${ans} ">${ans}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row);

    }

    for(let i = 1 ; i <= 100 ; i++){
        let row = $(`<div class="cell-row"></div>`);
        for(let j = 1 ; j <= 100 ; j++){
            let colCode =$(`.columnId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class="input-cell" contenteditable="true" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);
            row.append(column);

        } 
        $(".input-cell-container").append(row);
    }



});

