var append = function (value) {
    var li = document.createElement("LI");
    li.textContent = value;
    document.getElementById("output").appendChild(li);
};
var lista = new List([
 { nome: "Orlando", idade: 23 },
 { nome: "Leo", idade: 26 },
 { nome: "Matheus", idade: 16 },
 { nome: "Maysa", idade: 13 },
 { nome: "Roger", idade: 99 },
 { nome: "wilker", idade: 55 },
]);
var nomes = lista.where(function (item) {
    return item.idade > 23;
}).select(function (item) {
    append(item.nome); //adiciona na lista
    return item.nome;
}).toArray();

//primeiro com condição
console.log(lista.first(function (item) {
    return item.idade == 13;
}).nome);

//verifica se tem algum na lista com a condição
if (lista.any(function (item) { return item.idade > 50 })) {
    document.getElementById("label").textContent = "Tem 3ª idade na lista";
}
//primeiro sem condição
document.getElementById("label2").textContent = "Primeiro é: ".concat(lista.first().nome);
//último
document.getElementById("label3").textContent = "Último é: ".concat(lista.last().nome);

//li
var items = new List($("#ex2 > li").toArray());
items.where(function (li) {
    //retorna os não selecionados
    return !li.classList.contains("selected");
}).each(function (li) {
    //remove os não selecionados
    li.parentNode.removeChild(li);
});

items.where(function (li) {
    //retorna os não selecionados
    return !li.classList.contains("selected");
}).each(function (li) {
    //adiciona os não selecionados
    $("#removidos").append(li);
});