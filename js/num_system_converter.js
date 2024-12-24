let btn_convert = document.getElementById("convert")
btn_convert.addEventListener("click", convert)

let timeout;

// clear to-input when from-input is erased
document.getElementById("from-input").addEventListener('input', () => {
    if (document.getElementById("from-input").value == "") {
        document.getElementById("to-input").value = "";
    }
});

function convert() {
    let from_input = document.getElementById("from-input").value
    let from_num_system = document.getElementById("from").value

    let to_input = document.getElementById("to-input")
    let to_num_system = document.getElementById("to").value

    if (from_input) {
        if (from_num_system == "Decimal") {
            if (to_num_system == "Decimal") {
                if (!(/^\d+$/.test(from_input))) {
                    display_input_warning("invalid", "Must be between 0-9.")
                    return;
                }
                to_input.value = from_input;
            }
            else if (to_num_system == "Binary") {
                to_input.value = dec_to_bin(from_input);
            }
            else if (to_num_system == "Octal") {
                to_input.value = bin_to_oct(dec_to_bin(from_input));
            }
            else if (to_num_system == "Hexadecimal") {
                to_input.value = bin_to_hex(dec_to_bin(from_input));
            }
        }

        else if (from_num_system == "Binary") {
            if (to_num_system == "Binary") {
                if (!(/^[01]+$/).test(from_input)) {
                    display_input_warning("invalid", "Must be between 0 and 1.")
                    return;
                }
                to_input.value = from_input;
            }
            else if (to_num_system == "Decimal") {
                to_input.value = bin_to_dec(from_input);
            }
            else if (to_num_system == "Octal") {
                to_input.value = bin_to_oct(from_input);
            }
            else if (to_num_system == "Hexadecimal") {
                to_input.value = bin_to_hex(from_input);
            }
        }

        else if (from_num_system == "Octal") {
            if (to_num_system == "Octal") {
                if (!(/^[01234567]+$/.test(from_input))) {
                    display_input_warning("invalid", "Must be between 0-7.")
                    return;
                }
                to_input.value = from_input;
            }
            else if (to_num_system == "Binary") {
                to_input.value = oct_to_bin(from_input);
            }
            else if (to_num_system == "Decimal") {
                to_input.value = bin_to_dec(oct_to_bin(from_input));
            }
            else if (to_num_system == "Hexadecimal") {
                to_input.value = bin_to_hex(oct_to_bin(from_input));
            }
        }

        else if (from_num_system == "Hexadecimal") {
            if (to_num_system == "Hexadecimal") {
                if (!(/^[0-9A-Fa-f]+$/.test(from_input))) {
                    display_input_warning("invalid", "Must consist of 0-9, A-F or a-f");
                    return;
                }
                to_input.value = from_input;
            }
            else if (to_num_system == "Binary") {
                to_input.value = hex_to_bin(from_input);
            }
            else if (to_num_system == "Decimal") {
                to_input.value = bin_to_dec(hex_to_bin(from_input))
            }
            else if (to_num_system == "Octal") {
                to_input.value = bin_to_oct(hex_to_bin(from_input));
            }
        }
    }
    else {
        display_input_warning("empty");
    }
}

function display_input_warning(type, message="") {
    let wrng_txt = document.querySelector(".warning-message-text");
    
    clearTimeout(timeout)

    if (type == "empty") {
        wrng_txt.textContent = "This field is required.";
        wrng_txt.classList.add("show");


        timeout = setTimeout(() => {
            wrng_txt.classList.remove("show");
            wrng_txt.textContent = "";
        }, 2000);
    }

    if (type == "invalid") {
        wrng_txt.textContent = message;
        wrng_txt.classList.add("show");


        timeout = setTimeout(() => {
            wrng_txt.classList.remove("show");
            wrng_txt.textContent = "";
        }, 2000);
    }
}

function bin_to_dec(bin_num) {
    if (bin_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^[01]+$/).test(bin_num)) {
        display_input_warning("invalid", "Must be between 0 and 1.")
        return "";
    }

    let result = 0;
    let num = Number(bin_num);
    let base = 1;

    while (num > 0) {
        let last_digit = num % 10;
        num = Math.floor(num / 10);

        result += last_digit * base;

        base *= 2;
    }

    return result; //int
}

function bin_to_oct(bin_num) {
    if (bin_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^[01]+$/).test(bin_num)) {
        display_input_warning("invalid", "Must be between 0 and 2.")
        return "";
    }

    let result = "";
    let num = bin_num;
    let oct_groups = num.split("").reverse().join("").match(/.{1,3}/g).map(str => str.split('').reverse().join("")).reverse()

    for (let i = 0; i < oct_groups.length; i++) {
        let dec_equiv = bin_to_dec(oct_groups[i]);
        result += String(dec_equiv);
    }

    return result; //str
}

function bin_to_hex(bin_num) {
    if (bin_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^[01]+$/).test(bin_num)) {
        display_input_warning("invalid", "Must be between 0 and 2.")
        return "";
    }

    let result = "";
    let num = bin_num;
    let hex_groups = num.split("").reverse().join("").match(/.{1,4}/g).map(str => str.split('').reverse().join("")).reverse()

    for (let i = 0; i < hex_groups.length; i++) {
        let dec_equiv = bin_to_dec(hex_groups[i]);
        if (dec_equiv > 9) {
            let num;
            if (dec_equiv == 10) {
                num = "A";
            } else if (dec_equiv == 11) {
                num = "B";
            } else if (dec_equiv == 12) {
                num = "C";
            } else if (dec_equiv == 13) {
                num = "D";
            } else if (dec_equiv == 14) {
                num = "E";
            } else if (dec_equiv == 15) {
                num = "F";
            }

            result += num;
        }
        else {
            result += String(dec_equiv);
        }
    }

    return result; //str
}

function dec_to_bin(dec_num) { // try to use numbers instead of strings
    if (dec_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^\d+$/.test(dec_num))) {
        display_input_warning("invalid", "Must be between 0-9.")
        return "";
    }

    let result = [];
    let num = Number(dec_num);

    while (num != 0) {
        result.push(num % 2 == 0 ? "0" : "1");
        num = Math.floor(num / 2);
    }

    if (dec_num == "0" && dec_num.length == 1) { // for "0" input
        result.push("0")
    }
    
    return result.reverse().join("") //str
}

function oct_to_bin(oct_num) {
    if (oct_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^[01234567]+$/.test(oct_num))) {
        display_input_warning("invalid", "Must be between 0-7.")
        return "";
    }
    let result = "";
    let num = oct_num;
    let digits = num.split("")
    
    for (let i = 0; i < digits.length; i++) {
        bin = dec_to_bin(digits[i]);
        if (bin.length != 3) {
            bin = "0".repeat(3 - bin.length) + bin;
        }
        result += bin;
    }

    while (result[0] == "0") {
        result = result.split("").splice(1).join("")
    }

    return result;
}

function hex_to_bin(hex_num) {
    if (hex_num == "") { // for cases where called by another function and error occurs
        return "";
    }

    if (!(/^[0-9A-Fa-f]+$/.test(hex_num))) {
        display_input_warning("invalid", "Must consist of 0-9, A-F or a-f");
        return "";
    }

    let result = "";
    let num = hex_num;
    let digits = num.split("")
    
    for (let i = 0; i < digits.length; i++) {
        if (!(/^\d+$/.test(digits[i]))) {
            if (digits[i].toUpperCase() == "A") {
                digits[i] = 10;
            } else if (digits[i].toUpperCase() == "B") {
                digits[i] = 11;
            } else if (digits[i].toUpperCase() == "C") {
                digits[i] = 12;
            } else if (digits[i].toUpperCase() == "D") {
                digits[i] = 13;
            } else if (digits[i].toUpperCase() == "E") {
                digits[i] = 14;
            } else if (digits[i].toUpperCase() == "F") {
                digits[i] = 15;
            }
        }

        bin = dec_to_bin(digits[i]);
        if (bin.length != 4) {
            bin = "0".repeat(4 - bin.length) + bin;
        }
        result += bin;
    }

    while (result[0] == "0") {
        result = result.split("").splice(1).join("")
    }

    return result;
}