// for making the main frame the right width
function adjust_main_frame_size(list){
    let amount = list.length + 1;
    const frame = document.getElementById("main_frame");
    let new_width = (amount * 140) + 5;
    frame.style.width = new_width + "px";
    frame.style.left = "calc(50% - " + (new_width / 2) + "px)";
}

function spawn_login_options(list){
    let amount = list.length + 1;
    const parent = document.getElementById("main_frame")
    for (let a = 0; a < amount; a++){
        // create the element
        let new_element = document.createElement("button");
        new_element.classList = "login_option_frame";
        new_element.style.left = (a * 140) + 10 + "px"
        parent.appendChild(new_element)
        // adding the icon
        let img = document.createElement("img");
        img.src = "https://www.svgrepo.com/show/506667/person.svg";
        img.classList = "icon";
        new_element.appendChild(img)

        // for the +
        if (amount - 1 === a){
            new_element.style.border = "2px dashed white";
            img.src = "https://www.svgrepo.com/show/510136/plus.svg";
            // for adding an account
            new_element.addEventListener("click", function() {
                // when + was clicked
                // make every element disappear
                let children = parent.children;
                for (let i = 0; i < children.length; i++){
                    let child = children[i];
                    child.classList.add("disappear");
                    setTimeout(function (){
                        spawn_login_type("add")
                    }, 200)
                }
            });
            // for the sound
            new_element.addEventListener("mouseenter", function (){
                play_hover_sound()
            })
        } else{
            // when we have a notmal button
            new_element.addEventListener("click", function() {
                alert(a + " was selected");
            });
            // for the sound
            new_element.addEventListener("mouseenter", function (){
                play_hover_sound()
            })
            // adding the profile
            let name = document.createElement("div");
            name.textContent = list[a][0]; // 0 is the name
            name.classList = "account_name";
            new_element.appendChild(name);
        }
    }
}

function spawn_login_type(mode){
    let list = [
        document.getElementById("login_select"),
        document.getElementById("go_back_select"),
        document.getElementById("register_select")
    ]
    for (let i = 0; i < list.length; i++){
        let child = list[i];
        // for every option
        if (mode === "add"){
            // makes it big
            child.classList.add("type_selection_active");
            // enables the hover
            child.classList.remove("type_selection_no_hover")

            // remove unnecessary
            child.classList.remove("type_selection_login_1")
            child.classList.remove("type_selection_go_back_1")
            child.classList.remove("type_selection_register_1")

            child.classList.remove("type_selection_login_2")
            child.classList.remove("type_selection_go_back_2")
            child.classList.remove("type_selection_register_2")

            child.style.pointerEvents = "auto"

        } else if (mode === "remove"){
            // makes is small
            child.classList.remove("type_selection_active");
            // disables the hover
            child.classList.add("type_selection_no_hover")


        } else if (mode === "login"){
            if (child.id === "login_select"){
                // when its the login
                child.classList.add("type_selection_login_1")
                // make the cube small
                child.style.pointerEvents = "none"

            } else if (child.id === "go_back_select"){
                // when its the go_back
                child.classList.add("type_selection_go_back_1")
            } else {
                // when its the register
                child.classList.add("type_selection_register_1")
            }


        } else if (mode === 'register'){
            if (child.id === "login_select"){
                child.classList.add("type_selection_login_2")
            } else if (child.id === "go_back_select"){
                // when its the go_back
                child.classList.add("type_selection_go_back_2")
            } else {
                // when its the register
                child.classList.add("type_selection_register_2")
                // make the cube small
                child.style.pointerEvents = "none"
            }
        }
    }
}

// respawns the login and the + icon
function respawn_login_options(){
    let children = document.getElementById("main_frame").children;
    for (let i = 0; i < children.length; i++){
        let child = children[i];
        child.classList.remove("disappear");
    }
}

function respawn_register_screen(mode){
    // spawning the register page
    if (mode === 'add'){
        let r_page = document.getElementById("register");
        r_page.classList.add("choose_block_spawn")
        r_page.classList.remove("choose_block_remove");
    } else {
        let r_page = document.getElementById("register");
        r_page.classList.add("choose_block_remove");
        setTimeout(() => {
            r_page.classList.remove("choose_block_spawn")
        }, 200);
    }
}
function respawn_login_screen(mode){
    // spawning the login page
    if (mode === 'add'){
        let l_page = document.getElementById("login");
        l_page.classList.add("choose_block_spawn")
        l_page.classList.remove("choose_block_remove");
    } else{
        let l_page = document.getElementById("login");
        l_page.classList.add("choose_block_remove");
        setTimeout(() => {
            l_page.classList.remove("choose_block_spawn")
        }, 200);
    }
}

let go_back_mode = 'main';
function a(a){
    if (a === 'go_back'){
        if (go_back_mode === 'main'){
            spawn_login_type("remove");
            setTimeout(function (){
                respawn_login_options()
            }, 200)
        } else {
            go_back_mode = 'main'
            // make it go back to normal
            setTimeout(function (){
                spawn_login_type("add");
            }, 200)
            // remove the login / register screen
            respawn_login_screen('remove');
            respawn_register_screen('remove')
            title_top("calc(25% - 30px)");
        }
    } else if (a === 'login'){
        go_back_mode = 'login';
        spawn_login_type("login");
        setTimeout(function (){
            respawn_login_screen('add')
        }, 200)
        // change the main text
        title_top("calc(25% - 100px)");
    } else {
        go_back_mode = 'register';
        spawn_login_type("register");
        setTimeout(function (){
            respawn_register_screen('add')
        }, 200)
        title_top("calc(25% - 100px)");
    }
}

function title_top(pixels){
    let text = document.getElementById("title");
    text.style.top = pixels
}
const hover_audio = document.getElementById("hover_audio");
