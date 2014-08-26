//bind click-events til knappene på siden
//enable knappene etterhvert
$('#add_attr').click(function () {
    obj.foo = 'bar';
    $('#mod_attr').removeAttr("disabled");
});

$('#mod_attr').click(function () {
    obj.foo = 'blah';
    $('#del_attr').removeAttr("disabled");
});

$('#del_attr').click(function () {
    delete obj.foo;
});

//objektet som vi skal observer endringer på
var obj = {};
var e = $('<div>').html(JSON.stringify(obj));
$('#obj').append(e);

//bruk en try/catch for å sjekke om funksjonen er tilgjengelig
//og gi beskjed dersom den ikke er det
try {
    Object.observe(obj, changesCallback);
} catch (e) {
    $('#view').hide();
    $('#no-go').show();
}

//callback-funksjonen som trigges når objektet vi overvåker endres
// logg hva som er endret til en div under knappene
function changesCallback(changes) {
    changes.forEach(function (change) {
        var s = 'change.type: ' + change.type + '<br>';
        s = s + 'change.name: ' + change.name + '<br>';
//        unngå undefined på add-events, sjekk om verdien ikke er undefined
        if (change.oldValue) {
            s = s + 'change.oldValue: ' + change.oldValue;
        }
        s = s + '<br>' + '<hr>' + '<br>';
        var e = $('<div>').html(s);
        $('#console').append(e);

        var e2 = $('<div>').html(JSON.stringify(obj));
        $('#obj').html(e2);
    });
}


