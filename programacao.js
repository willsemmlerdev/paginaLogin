function abrirTelaCadastro () {
    $('#tela_cadastro_usuario').css("display", "flex");
}
function fecharJanela() {
    $('#tela_cadastro_usuario').css("display", "none");
}
function limpaCampoNome() {
    $('#statusUsuario').text('');
}
function limpaCampoSenha() {
    $('#statusSenha').text('');
}
function limpaCampoSenhaConfirm() {
    $('#statusSenhaIgual').text('');
}

$(document).ready(function () {
    if (localStorage.getItem("cadastroSucesso") === "true") {
        $('#resultadoCadastro').addClass("cadastroSucesso");
        $('#resultadoCadastro').text("Cadastro realizado com sucesso");

        localStorage.removeItem("cadastroSucesso");
    }
    $('#formulario').submit(e => {
        e.preventDefault();
        let usuario = $('#usuario').val();
        let senha = $('#senha').val();

        let loginRecuperado = Array();
        if (localStorage.hasOwnProperty("login")) {

            loginRecuperado = JSON.parse(localStorage.getItem("login"))

            while( true ) {
                for (let index = 0; index < loginRecuperado.length; index++) {
                    if (loginRecuperado[index]["nome"] !== usuario || loginRecuperado[index]["senha"] !== senha) {
                        $('#loginIncorreto').addClass( "erro" );
                        $('#loginIncorreto').text("Usuário ou senha incorretos");
                    } else {
                        $('#tela_sucesso').css("display", "flex");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }
                return
            }
        } else {
            $('#loginIncorreto').addClass( "erro" );
            $('#loginIncorreto').text("Usuário não cadastrado no banco de dados");
                setTimeout (() => {
                    window.location.reload();
                }, 3000)
        }
    });
    
    $('#formCadastro').submit(e => {
        e.preventDefault();
        let novoUsuario = $('#usuario_novo').val();
        let novoSenha = $('#senha_novo').val();
        let novoConfirmSenha = $('#senha_novo_confirmacao').val();

        while ( true ) {
            if (novoUsuario == '') {
                $('#statusUsuario').addClass( "erro" );
                $('#statusUsuario').text("É necessário preencher este campo");
            }
            if(novoSenha == '') {
                $('#statusSenha').addClass( "erro" );
                $('#statusSenha').text("É necessário preencher este campo");
            }
            if (novoConfirmSenha == '') {
                $('#statusSenhaIgual').addClass( "erro" );
                $('#statusSenhaIgual').text("Necessário preencher este campo");
            } else if (novoConfirmSenha !== novoSenha) {
                $('#statusSenhaIgual').text("");
                $('#statusSenhaIgual').addClass( "erro" );
                $('#statusSenhaIgual').text("As senhas não são iguais");
            }
            break
        }

        if (novoUsuario !== '' & novoSenha === novoConfirmSenha) {
            let logins = Array ();
            if (localStorage.hasOwnProperty("login")) {
                logins = JSON.parse(localStorage.getItem("login"))
            }
            logins.push({nome: novoUsuario, senha: novoSenha});
            $('#usuario_novo').val('');
            $('#senha_novo').val('');
            $('#senha_novo_confirmacao').val('');

            localStorage.setItem("login", JSON.stringify(logins))
            localStorage.setItem("cadastroSucesso", "true");

            window.location.reload();
            
        }
    })
});