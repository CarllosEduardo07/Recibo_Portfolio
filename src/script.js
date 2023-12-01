import { setupMaskCpf } from './mask/maskSetup.js';
import { setupMaskValue } from './mask/maskSetup.js';
import { setupMaskDate } from './mask/maskSetup.js';
import { sendRequest } from './services/apiService.js';

document.addEventListener('DOMContentLoaded', () => {
    sendRequest(); //conexção com a api-extenso e evento de button/validação
    setupMaskValue(); // mask value do Recibo
    setupMaskCpf(); //setup CPF and CNPJ
    setupMaskDate()//mask Date
});

// -----------Select Empresas----------
const selectEmpresas = document.getElementById('empresas');
const selectEndereco = document.getElementById('endereco');

selectEmpresas.addEventListener('change', () => {
    const empresaSelecionada = selectEmpresas.value;

    if (empresaSelecionada === 'empresa1') {
        selectEndereco.value = 'Rua da Inovação, 123, Bairro Tecnológico';
    } else if (empresaSelecionada === 'empresa2') {
        selectEndereco.value = 'Avenida Sustentabilidade, 456, Ecoville';
    } else if (empresaSelecionada === 'empresa3') {
        selectEndereco.value = 'R PARA – Nº: 1080 - CENTRO';
    } else {
        selectEndereco.value = '';
    }
});

// ----------Salver em PDF----------
const baixarPdf = document.querySelector('#baixar-pdf');
const imprimir = document.querySelector('#imprimir');
const rodape = document.querySelector('#rodape');
const limpar = document.querySelector('#limpar');
const form = document.querySelector('#form');

// ----------imprimir sem os buttons----------
function realizarImpressao() {
    baixarPdf.style.display = 'none';
    imprimir.style.display = 'none';
    limpar.style.display = 'none';
    rodape.style.display = 'none';

    window.print();

    baixarPdf.style.display = 'block';
    imprimir.style.display = 'block';
    limpar.style.display = 'block';
    rodape.style.display = 'block';
}

imprimir.addEventListener('click', event => {
    event.preventDefault();
    realizarImpressao();
});
document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'p' || event.key === 'P')) {
        event.preventDefault();
        realizarImpressao();
    }
});

// ----------Baixar em PDF----------
baixarPdf.addEventListener('click', event => {
    event.preventDefault();
    const content = document.querySelector('#container-recibo');

    const options = {
        margin: [15, 15, 15, 15],
        filename: 'Recibo.pdf',
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Removerndo Button
    baixarPdf.style.display = 'none';
    imprimir.style.display = 'none';
    limpar.style.display = 'none';

    // gerar e baixar o PDF
    html2pdf()
        .set(options)
        .from(content)
        .save()
        .then(() => {
            baixarPdf.style.display = 'block';
            imprimir.style.display = 'block';
            limpar.style.display = 'block';
        });
});

// limpar os campos
limpar.addEventListener('click', () => {
    form.reset();
});
