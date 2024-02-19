let textInput = document.getElementById("text_input");
let textOutput = document.getElementById("text_output");


function isEmptySpace(text) {
    let isWhitespaceString = text.replace(/\s/g, '').length;

    if(isWhitespaceString == 0) {
        return true;
    } else {
        return false;
    }
}

function inputRepair (text) {
    let repairedInput = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return repairedInput;
}

function encrypt () {
    let inputValue = textInput.value;
    
    if(!isEmptySpace(inputValue)) {
        inputValue = inputRepair(inputValue);
        let result = inputValue.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
        showResult(result);
    } else {
        showMessage("Sem mensagem para criptografar")
    }
}

function decrypt () {
    let inputValue = textInput.value;

    if(!isEmptySpace(inputValue)) {
        inputValue = inputRepair(inputValue);
        let result = inputValue.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
        showResult(result);
    } else {
        showMessage("Sem mensagem para descriptografar")
    }
    
}

function copyToClipboard () {
    let textToCopy = textOutput.innerText;
    navigator.clipboard.writeText(textToCopy);
    showMessage("Mensagem copiada");
}

// Helpers
function showResult (text) {
    removePlaceholder();
    
    let result = textOutput.innerText = text;
    return result;
}

function removePlaceholder () {
    let emptyPlaceholder = document.getElementById("empty_placeholder");
    let copyButton = document.getElementById("copy_button");

    emptyPlaceholder.style.display = "none";
    textOutput.style.display = "block";
    copyButton.style.display = "block";
}

let visibleMessage;
function showMessage (text) {
    clearTimeout(visibleMessage);
    let message = document.getElementById("message");
    message.innerText = text;
    message.style.display = "block";

    setTimeout(() => {
      message.style.opacity = '1';
    }, 10)

        visibleMessage = setTimeout(() => {
            message.style.opacity = '0';
            
            setTimeout(() => {
                message.innerText = "";
                message.style.display = 'none';
            }, 500)
        }, 2500);
}


// Aditional functions
function paste () {
    let clipboardText = navigator.clipboard.readText();

    clipboardText.then((cliptext) => (textInput.value = cliptext));
    textInput.focus();
}

function erase () {
    let input = textInput.value;
    if(input == ""){
        showMessage("O campo já está vazio")
        textInput.focus();
    } else {
        textInput.value = "";
        textInput.focus();
    }
}