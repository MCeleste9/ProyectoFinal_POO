async function  login(){

    const correo = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;

    let baseUrl = `http://localhost:3000/login`;
    let data = {
        usuario: correo,
        contrasena: contrasena
    }

    let res = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    let dataResponse = await res.json();

    if(dataResponse.exito){
        localStorage.setItem('usuario', JSON.stringify(dataResponse.usuario));
        window.location.href = 'loginCliente';
    }else {
        alert(dataResponse.mensaje);
    }


}