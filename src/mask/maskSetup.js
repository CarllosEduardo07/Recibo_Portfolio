
export function setupMaskCpf() {

var options = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        $('#cpf').mask(cpf.length > 14 ? masks[1] : masks[0], op);
    },
};

$('#cpf').length > 11 ? $('#cpf').mask('00.000.000/0000-00', options) : $('#cpf').mask('000.000.000-00#', options);
};


export function setupMaskValue(){
    $(document).ready(function () {
        $('#valor').mask('000.000,00', { reverse: true });
    
        $('#valor').on('input', function () {
            var valorFormatado = $(this).val();
            $('#extendoInput').text(valorFormatado);
        });
    });
}


export function setupMaskDate(){
    $('#data').mask('00/00/0000');
    const InputData = document.querySelector('#data');
    
    // formata a data e coloca o Pikaday, caixa flutuante.
    var i18n = {
        previousMonth: 'Mês anterior',
        nextMonth: 'Próximo mês',
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    };
    // biblioteca Pikaday
    const picker = new Pikaday ({
        field: InputData,
        keyboardInput: true,
        format: 'DD/MM/YYYY',
        yearRange: [2000, 2030],
        i18n: i18n,
        toString(date){
            const day = date.getDate().toString().padStart(2,'0');
            const month = (date.getMonth() + 1).toString().padStart(2,'0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        // formata de mm/dd/yyyy para dd/mm/yyyy, em uma data compreencivel pelo pikaday
        parse(dateString) {
            const parts = dateString.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
          }
        
    });
};
