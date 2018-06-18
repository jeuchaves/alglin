var LA = 3, LB = 3;
var CA = 3, CB = 3;

var MA, MB, MC;

var LINHADESTACADA = 1;
var COLUNADESTACADA = 1;

function gerarMatriz(linhas, colunas, prefixo) {
    var html = "";

    for (var l = 1; l <= linhas; ++l) {
        html += "<tr>";
        for (var c = 1; c <= colunas; ++c) {
            html += `<td><input class="form-control input-matriz" id="${prefixo}${l}${c}" placeholder="${prefixo}${l}${c}" type="number"></td>`;
        }
        html += "</tr>";
    }

    return html;
}

function tamanhoValido (valor) {
    if (valor > 0 && valor <= 4) return true;
    return false;
}

function valido(colunaA, linhaB) {
    if (colunaA == "" || linhaB == "") {
        return true;
    } else {
        if (colunaA == linhaB) return true;
    }

    return false;
}

function redimensionarMatrizes() {
    var linhaA = $('#numLinhasA').val();
    var colunaA = $("#numColunasA").val();

    var linhaB = $('#numLinhasB').val();
    var colunaB = $("#numColunasB").val();

    if(!tamanhoValido(linhaA)) linhaA = 3;
    if(!tamanhoValido(colunaB)) colunaB = 3;

    if(!valido(colunaA, linhaB)) {
        $("#numColunasA").addClass("alert-danger");
        $("#numLinhasB").addClass("alert-danger");

        $("#erro-dimensao").addClass("alert-danger");

        $("#erro-continuacao").html(`<p class="lead text-center alert alert-warning conteudo">Ops! Não será possivel continuar a operação enquanto a <strong>coluna</strong> da <strong>Matriz A</strong> for diferente da <strong>Linha</strong> da <strong>Matriz B</strong></h1>`)
        $("#continuacao").hide();
        return;
    } else {
        $("#numColunasA").removeClass("alert-danger");
        $("#numLinhasB").removeClass("alert-danger");

        $("#erro-dimensao").removeClass("alert-danger");

        $("#erro-continuacao").html("");
        $("#continuacao").show();
    }

    if(!tamanhoValido(colunaA)) {
        if(tamanhoValido(linhaB)) colunaA = linhaB;
        else {
            colunaA = 3;
            linhaB = 3;
        }
    } else {
        if(!tamanhoValido(linhaB)) linhaB = colunaA;
    }

    LB = linhaB;
    LA = linhaA;

    CA = colunaA;
    CB = colunaB;
    
    var matA = $('#MatrizA');
    matA.html(gerarMatriz(linhaA, colunaA, 'a'));

    var matB = $('#MatrizB');
    matB.html(gerarMatriz(linhaB, colunaB, 'b'));
}

function criarMatriz(linhas, colunas, prefixo) {
    var matriz = Array(linhas);
    for (var l = 1; l <= linhas; ++l) {
        matriz[l] = Array(colunas);
        for (var c = 1; c <= colunas; ++c) {
            matriz[l][c] = $(`#${prefixo}${l}${c}`).val();
        }
    }
    return matriz;
} 

function operarMatriz(matrizA, matrizB) {
    var matriz = Array(LA);
    for (var l = 1; l <= LA; ++l) {
        matriz[l] = Array(CB);
        for (var c = 1; c <= CB; ++c) {
            var resultado = 0;
            for (var i = 1; i <= CA; ++i) {
                resultado += matrizA[l][i] * matrizB[i][c];
            }
            matriz[l][c] = resultado;
        }
    }
    return matriz;
}

function gerarResultado() {
    $("#resultado").addClass("row");
    var html = "";  
    
    // Matriz A
    html += `<div class="col-md-3">`;
    html += `<h5 class="card-title text-center conteudo">Matriz A</h5>`;
    html += `<table class="table table-bordered">`;
    for (var l = 1; l <= LA; ++l) {
        html += "<tr>";
        for (var c = 1; c <= CA; ++c) {
            if(l == LINHADESTACADA) html += `<td class="alert-dark">${MA[l][c]}</td>`;
            else html += `<td>${MA[l][c]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    html += "</div>";

    // Matriz B
    html += `<div class="col-md-3">`;
    html += `<h5 class="card-title text-center conteudo">Matriz B</h5>`;
    html += `<table class="table table-bordered">`;
    for (var l = 1; l <= LB; ++l) {
        html += "<tr>";
        for (var c = 1; c <= CB; ++c) {
            if(c == COLUNADESTACADA) html += `<td class="alert-dark">${MB[l][c]}</td>`;
            else html += `<td>${MB[l][c]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    html += "</div>";

    // Matriz Resultante
    html += `<div class="col-md-6">`;
    html += `<h5 class="card-title text-center conteudo">Matriz Resultante</h5>`;
    html += `<table class="table table-bordered">`;
    for (var l = 1; l <= LA; ++l) {
        html += "<tr>";
        for (var c = 1; c <= CB; ++c) {
            var texto = "";
            for (var i = 1; i <= CA; ++i) {
                texto += `(${MA[l][i]} * ${MB[i][c]})`;
                if (i != CA) texto += " + ";
            }
            if(l == LINHADESTACADA && c == COLUNADESTACADA) {
                html += `<td class="alert-dark">${texto} = ${MC[l][c]}</td>`;
            } else html += `<td>${MC[l][c]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    html += "</div>";
    
    return html;
}

function gerarBotoes() {

    $("#bts-resultado").addClass("row conteudo");
    var html = "";

    html += `<div class="col-md-6">`;
    if(LINHADESTACADA == 1 && COLUNADESTACADA == 1) html += "";
    else {
        html += `<div class="align-self-center text-right animation">`;
        html += `<img id="voltar" class="rounded-circle" src="img/template.jpg" widht="130" height="130">`;
        html += "</div>";
    }
    html += "</div>"

    html += `<div class="col-md-6">`;
    if(LINHADESTACADA == LA && COLUNADESTACADA == CB) html += "";
    else {
        html += `<div class="align-self-center text-left animation">`;
        html += `<img id="avancar" class="rounded-circle" src="img/template.jpg" widht="130" height="130">`;
        html += "</div>";
    }
    html += "</div>"

    return html;
}

function voltar() {
    if(COLUNADESTACADA <= 1) {
        COLUNADESTACADA = CB;
        --LINHADESTACADA; 
    } else {
        --COLUNADESTACADA;
    }

    var result = $('#resultado');
    result.html(gerarResultado());
    var botao = $('#bts-resultado');
    botao.html(gerarBotoes());
}

function avancar() {
    if(COLUNADESTACADA >= CB) {
        ++LINHADESTACADA;
        COLUNADESTACADA = 1;
    } else {
        ++COLUNADESTACADA;
    }

    var result = $('#resultado');
    result.html(gerarResultado());
    var botao = $('#bts-resultado');
    botao.html(gerarBotoes());
}

function realizarOperacao() {
     
    if(!validarDados()) {
        $('#erro').text("Por favor, insira os dados em <strong>todos</strong> os campos das matrizes");
        var erro = $("#erro");
        erro.html(`<p class="mb-0 lead text-center conteudo alert alert-danger" id="erro">Por favor, insira os dados em <strong>todos</strong> os campos das matrizes</p>`);
        var resultado = $("#resultado");
        resultado.html(`<p class="lead">Após <strong>inserir os dados</strong> nas matrizes e <strong>clicar</strong> sobre o circulo. Seu resultado aparecerá aqui.</p>`);
        return;
     } else {
         $("#erro").text("");
     }

    var matrizA = criarMatriz(LA, CA, 'a');
    var matrizB = criarMatriz(LB, CB, 'b');

    var matrizC = operarMatriz(matrizA, matrizB);

    MA = matrizA;
    MB = matrizB;
    MC = matrizC;

    var result = $('#resultado');
    result.html(gerarResultado());

    var botao = $('#bts-resultado');
    botao.html(gerarBotoes());
}

function validarDados() {
    var temErro = false;
    for (var l = 1; l <= LA; ++l) {
        for (var c = 1; c <= CA; ++c) {
            if($(`#a${l}${c}`).val() == "") {
                $(`#a${l}${c}`).addClass("alert-danger");
                temErro = true;
            } else {
                $(`#a${l}${c}`).removeClass("alert-danger");
            }
            
        }
    }

    for (var l = 1; l <= LB; ++l) {
        for (var c = 1; c <= CB; ++c) {
            if($(`#b${l}${c}`).val() == "") {
                $(`#b${l}${c}`).addClass("alert-danger");
                temErro = true;
            } else {
                $(`#b${l}${c}`).removeClass("alert-danger");
            }
            
        }
    }

    if(temErro) return false;
    return true;
}

$(function () {        
    
    $('#numLinhasA').change(function () {
        redimensionarMatrizes();
    });

    $('#numColunasA').change(function () {
        redimensionarMatrizes();
    });

    $('#numLinhasB').change(function () {
        redimensionarMatrizes();
    });

    $('#numColunasB').change(function () {
        redimensionarMatrizes();
    });

    $('#calcular').click(function () {
        realizarOperacao();
    });

    $(document).on('click', '#voltar', function() {
        voltar();
    });

    $(document).on('click', '#avancar', function() {
        avancar();
    });
});

