/*
Autor: Orlando
List com metodologia lambda v 1.1.0
https://github.com/ohrlando/List_Lambda_js
*/
//pratique aqui:

//método para ajudar a adicionar novos elementos
var append = function (value) {
    var li = document.createElement("LI");
    li.textContent = value;
    document.getElementById("output").appendChild(li);
};

//pessoas
var lista = new List([{
    nome: "Orlando",
    idade: 23
}, {
    nome: "Leo",
    idade: 26
}, {
    nome: "Matheus",
    idade: 16
}, {
    nome: "Maysa",
    idade: 13
}, {
    nome: "Roger",
    idade: 89
}, {
    nome: "wilker",
    idade: 55
}, ]);

//idade > 23
var nomes = lista.where(function (item) {
    return item.idade > 23;
}).select(function (item) {
    append(item.nome); //adiciona na lista
    return item.nome;
}).toArray();

//primeiro com condição
console.log("\nPrimeiro com a idade igual a 13 é: ", lista.first(function (item) {
    return item.idade == 13;
}).nome);

//verifica se tem algum na lista com a condição
if (lista.any(function (item) {
    return item.idade > 90;
})) {
    document.getElementById("label").textContent = "Tem 3ª idade na lista";
} else {
    document.getElementById("label").textContent = "Não tem 3ª idade na lista";
}
//primeiro sem condição
document.getElementById("label2").textContent = "Primeiro é: ".concat(lista.first().nome);
//último
document.getElementById("label3").textContent = "Último é: ".concat(lista.last().nome);
//primeiro letra M
document.getElementById("label3").textContent = "Primeiro com letra M é:".concat(lista.first(function (item) { return item.nome[0] == "M"; }).nome);

//elementos em #ex2 > li
var items = new List($("#ex2 > li"));
items.where(function (li) {
    //retorna os não selecionados
    return !li.classList.contains("selected");
}).each(function (li) {
    //remove os não selecionados
    li.parentNode.removeChild(li);
});

//has class selected
items.where(function (li) {
    //retorna os não selecionados
    return !li.classList.contains("selected");
}).each(function (li) {
    //adiciona os não selecionados
    $("#removidos").append(li);
});

//Distincts
var myList = new List([{ letra: "a" }, { letra: "b" }, { letra: "b" }, { letra: "c" }, { letra: "d" }, { letra: "d" }, { letra: "e" }]);
console.log("\nDistintos de objetos baseado uma prop:");
console.log(myList.distinct(function (item) {
    return item.letra;
}).toList());

myList = new List(["a", "a", "a", "b", "b", "c", "c", "c", "c", "d", "d", "e", "e"]);
console.log("\nDistintos de letras: ");
console.log(myList.distinct().toList());
//último com predicato
console.log(myList.where(function (item) { return item == "a" || item == "c" }).last())

