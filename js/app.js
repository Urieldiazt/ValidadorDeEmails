document.addEventListener('DOMContentLoaded', function(){
    formulario();
});

function formulario(){
    const datos = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const email = document.querySelector('#email2');
    const email2 = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const enviar = document.querySelector('#enviar');
    const resetBtn = document.querySelector('#resetBtn');
    const spinner = document.querySelector('#spinner');
    const formulario = document.querySelector('form');

    email.addEventListener('blur', validarCampo);
    email2.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    resetBtn.addEventListener('click', resetearFormulario);
    enviar.addEventListener('click', enviarFormulario);


    function enviarFormulario(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            envioExitoso();
            setTimeout(()=>{
               const envio = document.querySelector('.envioExitoso');
               limpiarDatos();
               comprobarCampos();
               envio.remove();
               formulario.reset();
            },4000)
        },4000);

    }

    function envioExitoso(){
        const envioExitoso = document.createElement('P');
        envioExitoso.textContent = 'Los campos se enviaron correctamente';
        envioExitoso.classList.add('bg-green-400', 'text-center', 'mt-5', 'p-2', 'envioExitoso');
        formulario.appendChild(envioExitoso);
    }


    function resetearFormulario(e){
        e.preventDefault();
        const limpiarAlerta = document.querySelectorAll('.error');
        if(limpiarAlerta){
            limpiarAlerta.forEach(alerta =>{
                alerta.remove();
            })
        }
        limpiarDatos();
        comprobarCampos();
        formulario.reset();
    }

    function limpiarDatos(){
        datos.email = '';
        datos.asunto = '';
        datos.mensaje = '';
    }


    function validarCampo(e){
        if(e.target.value.trim() !== '' && e.target.id === 'email2' && !verificarEmail(e.target.value)){
            alerta('El campo email Cc: no es valido', e.target.parentElement);
            return;
        }

       if(e.target.value.trim() === ''){
        //template String
            if(e.target.id === 'email2'){
                limpiarAlerta(e.target.parentElement);
                return;
            }
            alerta(`El campo ${e.target.id} se encuentra vacio`, e.target.parentElement);
            datos[e.target.id] = '';
            comprobarCampos();
            return;
       }
       if(e.target.id === 'email' && !verificarEmail(e.target.value)){
            alerta('El campo email no es valido', e.target.parentElement);
            datos[e.target.id] = '';
            comprobarCampos();
            return;
       }

       limpiarAlerta(e.target.parentElement);
       
       datos[e.target.id] = e.target.value.trim().toLowerCase();

       comprobarCampos();

    }

    
    function alerta(mensaje, referencia){
        //verififcamos si existe ya una alerta dentro de alerta
        limpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-400', 'text-center', 'p-2', 'mt-2', 'error');
        
        referencia.appendChild(error);
    }
    
    function limpiarAlerta(referencia){
        const limpiarAlerta = referencia.querySelector('.error');
        //preguntamos si la alerta ya existe
        if(limpiarAlerta){
            limpiarAlerta.remove();
        }
    }

    function verificarEmail(email){
        //exprecion regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarCampos(){
        if(Object.values(datos).includes('')){
            enviar.classList.add('cursor-not-allowed', 'opacity-50');
            return;
        }
        enviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}