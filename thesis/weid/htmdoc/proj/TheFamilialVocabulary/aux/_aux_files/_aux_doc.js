$(function () {
    escap_uti.init();
    removeAttr_All();
    ol_type_set();
    edit_event_control();

});
function load_link() {
    $("a[title]").each(function () {
        var hrf = $(this).attr("title");
        console.log("load:", hrf);
        $(this).load(hrf);
        $(this).removeAttr("href")
    });
}


function edit_event_control() {
    $("section h3").click(function(){
        removeDirt();
        if (escap_uti.isEventOnly()) {
            var tag = $(this).prop("tagName");
            console.log("1",tag);
            if("H3"===tag){
                $(this).next().slideToggle();
            };
        }
    })
    $("*").not("html,body,section").click(function () {
        event.stopPropagation();
        removeDirt();
        
        if (escap_uti.isEditOnly()) {
            $(this).attr("contenteditable", "true");
        }
        if (escap_uti.isEventOnly()) {

        }
        if (escap_uti.isLocked()) {
            return;
        }
    }).keydown(function (e) {
        removeDirt();
        event.stopPropagation();
        var edi = $(this).attr("contenteditable");
        if (edi) {
            $(this).addClass("hili");
        }
    });
    $("*").keyup(function (e) {
        var iLock = event.getModifierState("CapsLock");
        if (iLock) {
            console.log("CapsLock is on.....");
        } else {
            //$("body").css("background-color", "");
        }
    });
    $("*").keydown(function (e) {
        removeDirt();
        event.stopPropagation();
        var iLock = event.getModifierState("CapsLock");
        console.log("keyCode", e.keyCode, iLock);
        if (iLock) {
            console.log("CapsLock is on.....");
        } else {
            console.log("CapsLock is off.....");
        }
        if (17 === event.keyCode) {//=ALT
            if(confirm("clean page?")){
                removeAttr_All();
            }
        }
        if (80 === event.keyCode) {//=P
            if (escap_uti.isEventOnly()) {
                load_link();
            }
        }
        if (91 === event.keyCode || 83=== event.keyCode) { //=cmd+S == printkey
            removeDirt();
            if (escap_uti.isEventOnly() || escap_uti.isEditOnly()) {
                //return alert("cannot save.");
            }
        }
        if (27 === e.keyCode) { //=ESC
            escap_uti.esc_keydown();
            if (escap_uti.isLocked()) {
                //removeAttr_All();
            }
            if (undefined === this._idx) this._idx = -1;
            this._idx = (++this._idx) % 2;
            var colr = ["#667788", "#9911ff"];
            //$("body").css("background-color", colr[this._idx]);
        }
    });
}
var escap_uti = {
    State: ["fulllock", "editonly", "loadonly"],
    init: function () {
        document.g_escap_locked = 0;
    },
    esc_keydown: function () {
        document.g_escap_locked = (++document.g_escap_locked) % (this.State.length);
        this.checkstate();
        console.log("document.g_escap_locked=", document.g_escap_locked)
    },
    checkstate: function () {
        if (0 === document.g_escap_locked) {
            $("body").removeAttr("style");
        } else if (1 === document.g_escap_locked) {
            $("body").css("background-color", "blue");
        } else if (2 === document.g_escap_locked) {
            $("body").css("background-color", "red");
        } else {
            alert();
        }
        return document.g_escap_locked;
    },
    isLocked: function () {
        this.checkstate();
        if (0 === document.g_escap_locked) {
            return true;
        }
        return false;
    },
    isEditOnly: function () {
        this.checkstate();
        if (2 === document.g_escap_locked) {
            return true;
        }
        return false;
    },
    isEventOnly: function () {
        this.checkstate();
        if (1 === document.g_escap_locked) {
            return true;
        }
        return false;
    }
}
function remove_all_attributes(){
    $(this).each(function() {
        $.each(this.attributes, function() {
          // this.attributes is not a plain object, but an array
          // of attribute nodes, which contain both the name and value
          if(this.specified) {
            console.log(this.name, this.value);
          }
        });
      });
}
function removeAttr_All() {
    removeAddon();
    removeDirt();
}
function removeAddon(){
    $("*").removeAttr("contenteditable").removeAttr("style");
    $("a[title]").empty();
    $("body").removeAttr("style");
    $("*").removeAttr("class");
}
function removeDirt(){
    $("*").removeAttr("spellcheck").removeAttr("data-gr-c-s-loaded");
    $("grammarly-extension").remove();
    $("grammarly-card").remove();
    $("iframe").remove();
}

function ol_type_set() {

    var olayer = {
        g_types: ["1", "A", "a", "i"],
        recursive_type_set: function (eol, ideep) {
            if (ideep >= this.g_types.length) {
                console.log("ideep overflow:", ideep);
                return;
            }
            $(eol).attr("type", this.g_types[ideep]);
            ideep++;
            $(eol).children("li,div,p").each(function () {
                $(this).children("ol").each(function () {
                    olayer.recursive_type_set(this, ideep);
                });
            });

            $(eol).children("ol").each(function () {
                olayer.recursive_type_set(this, ideep);
            });

        }
    }


    $(function () {
        $("section div").children("ol").each(function () {
            olayer.recursive_type_set(this, 0);
        })
    });
}