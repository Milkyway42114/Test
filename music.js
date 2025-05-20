let current_mode = 'none';
function change_url_main() {
    window.location.href = "projects.html";
}
function redraw_buttons(input) {
    current_mode = input;
    document.getElementById(input).style.backgroundColor = "green"
    const list = ["top", "none", "bottom"];
    for (let l = 0; l < list.length; l++) {
        if (list[l] !== input) {
            document.getElementById(list[l]).style.backgroundColor = "dimgray"
        }
    }
}

let current_dot_mode = "passive";
let overwrite_bool = false;
let dot_color_passive = [255, 0, 0];
let dot_color_active = [0, 255, 0];
let note_list = ["a", "b", "c", "d", "e", "f", "g"];

function rgbToHex(rgb) {
    return "#" + rgb.map(x => Number(x).toString(16).padStart(2, '0')).join('');
}

function spawn_dots() {
    let container = document.getElementById("cont")
    for (let x = 0; x < (4000 / 50); x++) {
        let dc = document.createElement("div");
        dc.classList.add("refrence_dot_container");
        container.appendChild(dc);

        let b = 5 + (50 * x) + "px";
        dc.style.left = b;

        for (let l = 0; l < 7; l++) {
            let again = document.createElement("button");
            again.classList.add("reference_dot");
            again.style.backgroundColor = rgbToHex(dot_color_passive);
            let a = ((100 / 7) * (l + 1)) - (100 / 14);
            again.style.top = `calc(${a}% - 25.5px)`;

            again.textContent = note_list[l];
            again.style.width = "35px"
            again.id = x + "/" + l;

            again.addEventListener("click", function () {
                click(x, l);
            });
            dc.appendChild(again);
        }
    }
}

function click(x, l) {
    if (overwrite_bool) {
        for (let e = 0; e < 7; e++) {
            let element = document.getElementById(x + "/" + e);
            if (current_mode === "none") {
                element.style.backgroundColor = (e === l) ? rgbToHex(dot_color_active) : rgbToHex(dot_color_passive);
            } else if (current_mode === "top") {
                element.style.backgroundColor = (e <= l) ? rgbToHex(dot_color_active) : rgbToHex(dot_color_passive);
            } else {
                element.style.backgroundColor = (e >= l) ? rgbToHex(dot_color_active) : rgbToHex(dot_color_passive);
            }
        }
    } else {
        if (current_mode === "none") {
            let element = document.getElementById(x + "/" + l);
            invert(element);
        } else if (current_mode === "top") {
            for (let e = 0; e <= l; e++) {
                let element = document.getElementById(x + "/" + e);
                invert(element);
            }
        } else {
            for (let e = 6; e >= l; e--) {
                let element = document.getElementById(x + "/" + e);
                invert(element);
            }
        }
    }
}

function invert(element) {
    if (element.style.backgroundColor === rgbToHex(dot_color_active)) {
        element.style.backgroundColor = rgbToHex(dot_color_passive);
    } else {
        element.style.backgroundColor = rgbToHex(dot_color_active);
    }
}

function open_settings_menu() {
    let background = document.createElement("div");
    background.classList.add("back_ground");
    background.id = "backgnd";
    document.body.appendChild(background);

    let menu = document.createElement("div");
    menu.classList.add("settings_background");
    background.appendChild(menu);

    let continue_button = document.createElement("button");
    continue_button.classList.add("settings_button", "settings_button_continue");
    continue_button.addEventListener("click", function () {
        close_settings_menu();
    });
    menu.appendChild(continue_button);

    let settings_button_text = document.createElement("div");
    settings_button_text.classList.add("button_text");
    settings_button_text.textContent = "continue";
    continue_button.appendChild(settings_button_text);

    let settings_button_img = document.createElement("img");
    settings_button_img.classList.add("gear");
    settings_button_img.src = "continue.png";
    continue_button.appendChild(settings_button_img);

    let top_text = document.createElement("div");
    top_text.classList.add("line_text", "top_text_new");
    top_text.textContent = "settings menu";
    menu.appendChild(top_text);

    let buttons_background = document.createElement("div");
    buttons_background.classList.add("buttons_background");
    menu.appendChild(buttons_background);

    let top_button = document.createElement("button");
    top_button.classList.add("mode_button");
    top_button.id = "top";
    top_button.textContent = "top to bottom";
    top_button.addEventListener("click", function () {
        redraw_buttons('top');
    });
    buttons_background.appendChild(top_button);

    let none_button = top_button.cloneNode(true);
    none_button.id = "none";
    none_button.classList.add("none");
    none_button.textContent = "one at a time";
    none_button.addEventListener("click", function () {
        redraw_buttons('none');
    });
    buttons_background.appendChild(none_button);

    let bottom_button = top_button.cloneNode(true);
    bottom_button.id = "bottom";
    bottom_button.classList.add("bottom");
    bottom_button.textContent = "bottom to top";
    bottom_button.addEventListener("click", function () {
        redraw_buttons('bottom');
    });
    buttons_background.appendChild(bottom_button);

    let top_text_selection = document.createElement("div");
    top_text_selection.classList.add("line_text", "top_text_new");
    top_text_selection.style.fontSize = "130%";
    top_text_selection.style.top = "-5px";
    top_text_selection.textContent = "selection mode";
    buttons_background.appendChild(top_text_selection);

    let overwrite_background = document.createElement("div");
    overwrite_background.classList.add("buttons_background");
    overwrite_background.style.top = "170px";
    menu.appendChild(overwrite_background);

    let top_text_over = document.createElement("div");
    top_text_over.classList.add("line_text", "top_text_new");
    top_text_over.style.fontSize = "130%";
    top_text_over.style.top = "-5px";
    top_text_over.textContent = "overwrite line";

    let overwrite = document.createElement("button");
    overwrite.classList.add("mode_button", "overwrite_button_mod");
    overwrite.id = "overwrite";
    if (overwrite_bool) {
        overwrite.textContent = "overwrite ON";
        overwrite.style.backgroundColor = "green";
    } else {
        overwrite.textContent = "overwrite OFF";
        overwrite.style.backgroundColor = "red";
    }
    overwrite.addEventListener("click", function () {
        redraw_overwrite(overwrite);
    });
    overwrite_background.appendChild(overwrite);
    overwrite_background.appendChild(top_text_over);

    let slider_background = document.createElement("div");
    slider_background.classList.add("buttons_background");
    slider_background.style.top = "280px";
    slider_background.style.height = "150px";
    menu.appendChild(slider_background);

    let slider_main_text = top_text_selection.cloneNode(true);
    slider_main_text.textContent = "note color";
    slider_background.appendChild(slider_main_text);

    let dot = document.createElement("button");
    dot.classList.add("reference_dot", "example_dot");
    dot.textContent = "a";
    dot.id = "example_dot";
    dot.style.backgroundColor = rgbToHex(dot_color_passive);
    dot.addEventListener("click", function () {
        current_dot_mode = (current_dot_mode === "passive") ? "active" : "passive";
        console.log(current_dot_mode);
        switch_sliders(current_dot_mode);
        document.getElementById("bas").textContent = current_dot_mode
    });
    slider_background.appendChild(dot);

    let example_dot_text = document.createElement("div");
    example_dot_text.classList.add("line_text", "note_preview");
    example_dot_text.textContent = "preview";
    slider_background.appendChild(example_dot_text);

    let explain = document.createElement("div");
    explain.classList.add("line_text", "explain");
    explain.textContent = "click note to color other mode";
    slider_background.appendChild(explain);

    let mode_dot_text = document.createElement("div");
    mode_dot_text.textContent = current_dot_mode;
    mode_dot_text.id = "bas";
    mode_dot_text.classList.add("line_text", "mode");
    slider_background.appendChild(mode_dot_text);

    let main_rgb_slider_box = document.createElement("div");
    main_rgb_slider_box.classList.add("rgb_slider_box");
    slider_background.appendChild(main_rgb_slider_box);

    let r_slider = document.createElement("input");
    r_slider.classList.add("rgb_slider");
    r_slider.type = "range";
    r_slider.min = "0";
    r_slider.max = "255";
    r_slider.step = "5";
    r_slider.id = "r_slider";
    r_slider.value = dot_color_passive[0];
    r_slider.addEventListener("input", function () {
        const v = Number(r_slider.value);
        if (current_dot_mode === "passive") {
            dot_color_passive[0] = v;
            update_dot(dot_color_passive);
        } else {
            dot_color_active[0] = v;
            update_dot(dot_color_active);
        }
    });
    main_rgb_slider_box.appendChild(r_slider);

    let r_text = document.createElement("div");
    r_text.classList.add("slider_text");
    r_text.textContent = "red";
    main_rgb_slider_box.appendChild(r_text);

    let g_slider = r_slider.cloneNode(true);
    g_slider.id = "g_slider";
    g_slider.value = dot_color_passive[1];
    g_slider.style.top = "30px";
    g_slider.style.accentColor = "green";
    g_slider.addEventListener("input", function () {
        const v = Number(g_slider.value);
        if (current_dot_mode === "passive") {
            dot_color_passive[1] = v;
            update_dot(dot_color_passive);
        } else {
            dot_color_active[1] = v;
            update_dot(dot_color_active);
        }
    });
    main_rgb_slider_box.appendChild(g_slider);

    let g_text = r_text.cloneNode(true);
    g_text.textContent = "green";
    g_text.style.top = "30px";
    g_text.style.left = "10px";
    g_text.style.color = "green";
    main_rgb_slider_box.appendChild(g_text);

    let b_slider = r_slider.cloneNode(true);
    b_slider.id = "b_slider";
    b_slider.value = dot_color_passive[2];
    b_slider.style.top = "55px";
    b_slider.style.accentColor = "blue";
    b_slider.addEventListener("input", function () {
        const v = Number(b_slider.value);
        if (current_dot_mode === "passive") {
            dot_color_passive[2] = v;
            update_dot(dot_color_passive);
        } else {
            dot_color_active[2] = v;
            update_dot(dot_color_active);
        }
    });
    main_rgb_slider_box.appendChild(b_slider);

    let b_text = r_text.cloneNode(true);
    b_text.textContent = "blue";
    b_text.style.top = "55px";
    b_text.style.left = "15px";
    b_text.style.color = "blue";
    main_rgb_slider_box.appendChild(b_text);

    redraw_buttons(current_mode); // apply initial state
}

function close_settings_menu() {
    document.getElementById("backgnd").remove();
}

function clear_all() {
    let container = document.getElementById("cont");
    container.innerHTML = "";
    spawn_dots();
}

function redraw_overwrite(c) {
    if (c.style.backgroundColor === "red") {
        c.style.backgroundColor = "green";
        c.textContent = "overwrite ON";
        overwrite_bool = true;
    } else {
        c.style.backgroundColor = "red";
        c.textContent = "overwrite OFF";
        overwrite_bool = false;
    }
}

function update_dot(color) {
    let dot = document.getElementById("example_dot");
    dot.style.backgroundColor = rgbToHex(color);
    console.log(rgbToHex(color));
}

function switch_sliders(mode) {
    let rgb_sliders = [
        document.getElementById("r_slider"),
        document.getElementById("g_slider"),
        document.getElementById("b_slider"),
    ];
    if (mode === "passive") {
        rgb_sliders[0].value = dot_color_passive[0];
        rgb_sliders[1].value = dot_color_passive[1];
        rgb_sliders[2].value = dot_color_passive[2];
        update_dot(dot_color_passive);
    } else {
        rgb_sliders[0].value = dot_color_active[0];
        rgb_sliders[1].value = dot_color_active[1];
        rgb_sliders[2].value = dot_color_active[2];
        update_dot(dot_color_active);
    }
}
