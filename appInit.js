let htmlElement = function (identificador) {
    let elemento = document.getElementById(identificador)
    return (elemento)? elemento : document.querySelector(identificador)
}

let show = function (data) {
    htmlElement("pageConsole").innerHTML = String(data)
}

let $app = (localStorage.app)? JSON.parse(localStorage.app) : {}

let app = new Proxy($app, {
    set: function(obj, prop, value) {
        /* if (prop === 'chromas' && value === "Wow!") {
            throw new TypeError('This is not an Error, Chromas is Wow!')
            return false
        } */
        try {
            obj[prop] = value // Save the value in the object
            localStorage.app = JSON.stringify(app)
            show(AppString())
            return true  // Indicate success
        }
        catch (e) {
            throw e
            return false // Indicate not success
        }
    }
});

function AppString() {
    let json = JSON.stringify(app, null, 2) // spacing level = 2
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

show(AppString())