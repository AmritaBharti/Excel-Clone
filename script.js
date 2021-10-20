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

    for (let i = 1; i <= 100; i++) {
        let row = $(`<div class="cell-row"></div>`);
        for (let j = 1; j <= 100; j++) {
            let colCode = $(`.columnId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class="input-cell" contenteditable="true" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);
            row.append(column);

        }
        $(".input-cell-container").append(row);



    }
    $(".align-icon").click(function () {// click is a event listner when align-icon will be clicked then this function will work
        //1st work it should remove previously selected align-icon class
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");

    });

    $(".style-icon").click(function () {
        $(this).toggleClass("selected");
    });

    $(".input-cell").click(function (e) {
        if (e.ctrlKey) {
            let [rowId, columnId] = getRowColumn(this);
            if (rowId > 1) {
                let topCellSelected = $(`#row-${rowId - 1}-col-${columnId}`).hasClass("selected");
                if (topCellSelected) {
                    $(this).addClass("top-cell-selected");
                    $(`#row-${rowId - 1}-col-${columnId}`).addClass("bottom-cell-selected");
                }
                

            }
            if (rowId < 100) {  
                let bottomCellSelected = $(`#row-${rowId + 1}-col-${columnId}`).hasClass("selected");
                if (bottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId + 1}-col-${columnId}`).addClass("top-cell-selected");
                }
               

            }
            if (columnId > 1) {
                let leftCellSelected = $(`#row-${rowId}-col-${columnId-1}`).hasClass("selected");
                if (leftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId }-col-${columnId-1}`).addClass("right-cell-selected");
                }
                
            }
            if (columnId < 100) {
                let rightCellSelected = $(`#row-${rowId}-col-${columnId+1}`).hasClass("selected");
                if (rightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${columnId+1}`).addClass("left-cell-selected");
                }

            }
            $(this).addClass("selected");
        }
        else {
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
        }

    });

    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        $(this).focus();
    });

    $(".input-cell-container").scroll(function () {
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    });



});

function getRowColumn(ele) {
    //console.log($(ele).attr("id"));
    let idArray = $(ele).attr("id").split("-");
    let rowId = parseInt(idArray[1]);
    let columnId = parseInt(idArray[3]);
    return [rowId, columnId];
}

