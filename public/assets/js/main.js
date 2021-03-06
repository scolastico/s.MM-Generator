let currentId = 1;
const fields = document.getElementById('fields');

function generateCard(id) {
    let element = document.createElement("div");
    element.setAttribute("id", id);
    element.setAttribute("class", "card-body")
    element.innerHTML = '                    <div class="text-right"><button class="btn btn-danger" type="button" onclick="remove(' + id + ');">Delete</button></div>\n' +
        '                    <div class="form-row" style="margin-top: 10px;">\n' +
        '                        <div class="col col-md-2"><label class="col-form-label">Name:&nbsp;<i class="fa fa-question-circle" data-toggle="tooltip" data-bss-tooltip="" title="The name of the value. Please write the name in camel case."></i></label></div>\n' +
        '                        <div class="col"><input class="form-control" type="text" id="' + id + '-name" placeholder="myGreatValue"></div>\n' +
        '                    </div>\n' +
        '                    <div style="margin-top: 10px;">\n' +
        '                        <div class="form-row">\n' +
        '                            <div class="col col-md-2"><label class="col-form-label">Type:</label></div>\n' +
        '                            <div class="col"><select onchange="update(' + id + ');" class="form-control" id="' + id + '-type">\n' +
        '                                    <option value="1" selected="">String</option>\n' +
        '                                    <option value="2">Integer</option>\n' +
        '                                    <option value="3">Long</option>\n' +
        '                                    <option value="4">Double</option>\n' +
        '                                    <option value="5">Custom Object</option>\n' +
        '                                </select></div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div id="' + id + '-field-normal" style="margin-top: 10px;">\n' +
        '                        <div class="form-row">\n' +
        '                            <div class="col col-md-2"><label class="col-form-label">Default Value:</label></div>\n' +
        '                            <div class="col">\n' +
        '                                <input class="form-control" type="text" id="' + id + '-string" placeholder="Some String">\n' +
        '                                <input class="form-control d-none" type="number" id="' + id + '-number" placeholder="1234">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div id="' + id + '-field-custom" class="d-none" style="margin-top: 10px;">\n' +
        '                        <div class="form-row">\n' +
        '                            <div class="col col-md-2"><label class="col-form-label">Package Name:</label></div>\n' +
        '                            <div class="col"><input class="form-control" type="text" id="' + id + '-package" placeholder="me.developer.dataholders"></div>\n' +
        '                        </div>\n' +
        '                        <div class="form-row" style="margin-top: 10px;">\n' +
        '                            <div class="col col-md-2"><label class="col-form-label">Class Name:</label></div>\n' +
        '                            <div class="col"><input class="form-control" type="text" id="' + id + '-class" placeholder="MyExternalDataHolder"></div>\n' +
        '                        </div>\n' +
        '                    </div>';
    return element;
}

function create() {
    fields.appendChild(generateCard(currentId));
    currentId++;
}

function remove(id) {
    fields.removeChild(document.getElementById(id))
}

function update(id) {
    const fieldNormal = document.getElementById(id + '-field-normal');
    const fieldCustom = document.getElementById(id + '-field-custom');
    const fieldNumber = document.getElementById(id + '-number');
    const fieldString = document.getElementById(id + '-string');
    const type = document.getElementById(id + '-type').value;
    if (type === '1') {
        if (fieldNormal.classList.contains('d-none')) fieldNormal.classList.remove('d-none');
        if (fieldString.classList.contains('d-none')) fieldString.classList.remove('d-none');
        if (!fieldNumber.classList.contains('d-none')) fieldNumber.classList.add('d-none');
        if (!fieldCustom.classList.contains('d-none')) fieldCustom.classList.add('d-none');
    } else if (type === '5') {
        if (fieldCustom.classList.contains('d-none')) fieldCustom.classList.remove('d-none');
        if (!fieldNormal.classList.contains('d-none')) fieldNormal.classList.add('d-none');
        if (!fieldNumber.classList.contains('d-none')) fieldNumber.classList.add('d-none');
        if (!fieldString.classList.contains('d-none')) fieldString.classList.add('d-none');
    } else {
        if (fieldNormal.classList.contains('d-none')) fieldNormal.classList.remove('d-none');
        if (fieldNumber.classList.contains('d-none')) fieldNumber.classList.remove('d-none');
        if (!fieldString.classList.contains('d-none')) fieldString.classList.add('d-none');
        if (!fieldCustom.classList.contains('d-none')) fieldCustom.classList.add('d-none');
    }
}

function generate() {
    const fieldArray = [];
    fields.childNodes.forEach(function (node) {
        if (node.nodeName === 'DIV') {
            const id = node.id;
            const name = document.getElementById(id + '-name').value;
            const type = document.getElementById(id + '-type').value;
            if (type === '1') {
                fieldArray.push({
                    'name': name,
                    'type': type,
                    'value': document.getElementById(id + '-string').value
                });
            } else if (type === '5') {
                fieldArray.push({
                    'name': name,
                    'type': type,
                    'package': document.getElementById(id + '-package').value,
                    'class': document.getElementById(id + '-class').value
                });
            } else {
                fieldArray.push({
                    'name': name,
                    'type': type,
                    'value': document.getElementById(id + '-number').value
                });
            }
        }
    });
    const data = {
        'packageName': document.getElementById('package-name').value,
        'className': document.getElementById('table-name').value,
        'fields': fieldArray
    };
    console.log(JSON.stringify(data));
    $.post( "api/generate", {'obj': JSON.stringify(data)}, function(data) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', document.getElementById('table-name').value + '.java');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
}
