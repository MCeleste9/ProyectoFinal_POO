function selecionarMenu(menu) {
    let menuSelecionado = document.querySelector(".menu .elegido");
  
    if (!!menuSelecionado) {
      menuSelecionado.classList.remove("elegido");
    }
  
    menu.classList.add("elegido");
    verificarSele();
  }

  function selecionarPollo(pollo) {
    let polloSelecionado = document.querySelector(".pollo .elegido");
  
    if (!!polloSelecionado) {
      polloSelecionado.classList.remove("elegido");
    }
  
    pollo.classList.add("elegido");
    verificarSele();
  }
  
  function selecionarcombo(combo) {
    let comboSelecionado = document.querySelector(".combo .elegido");
  
    if (!!comboSelecionado) {
      comboSelecionado.classList.remove("elegido");
    }
  
    combo.classList.add("elegido");
    verificarSele();
  }

  function selecionarBebida(bebida) {
    let bebidaSelecionada = document.querySelector(".bebida .elegido");
  
    if (!!bebidaSelecionada) {
      bebidaSelecionada.classList.remove("elegido");
    }
  
    bebida.classList.add("elegido");
    verificarSele();
  }
  
  function verificarSele() {
    const verifica = document.querySelectorAll(".elegido").length;
    const footer = document.querySelector("footer");
  
    if (verifica === 4) {
      footer.firstElementChild.classList.add("oculto");
      footer.lastElementChild.classList.remove("oculto");
    }
  }
  
  function funcionPrecio(valor) {
    let precio = valor
      .querySelector(".valor")
      .innerHTML.replace("R$", "")
      .replace(",", ".");
  
    precio = (Number(precio) * 100) / 100;
  
    return precio;
  }
  
  function cierrePedido() {
    let pedido = {};
    let menuSelecionado = document.querySelector(".menu .elegido");
    let polloSelecionado = document.querySelector(".pollo .elegido");
    let comboSelecionado = document.querySelector(".combo .elegido");
    let bebidaSelecionada = document.querySelector(".bebida .elegido");
    
  
    const nameMenu = menuSelecionado.querySelector(".name").innerHTML;
    const namePollo = polloSelecionado.querySelector(".name").innerHTML;
    const nameCombo = comboSelecionado.querySelector(".name").innerHTML;
    const nameBebida = bebidaSelecionada.querySelector(".name").innerHTML;
    
    const precioMenu = funcionPrecio(menuSelecionado);
    const precioPollo = funcionPrecio(polloSelecionado);
    const precioCombo = funcionPrecio(comboSelecionado);
    const precioBebida = funcionPrecio(bebidaSelecionada);
    
  
    const precioTotal = (precioMenu + precioPollo + precioCombo + precioBebida).toFixed(2);
  
    pedido = {
      nameMenu,
      namePollo,
      nameCombo,
      nameBebida,
      precioMenu,
      precioPollo,
      precioCombo,
      precioBebida,
      precioTotal,
    };
  
    return pedido;
  }
  
  function confirmaPedido() {
    document
      .querySelector(".pantalla de confirmación")
      .classList.remove("Sin selección");
  
    monstraItemsDePedido();
  }
  
  function monstraItemsDePedido() {
    const {
        nameMenu,
        namePollo,
        nameCombo,
        nameBebida,
        precioMenu,
        precioPollo,
        precioCombo,
        precioBebida,
        precioTotal,
    } = cierrePedido();
  
    const itemsDePedido = document.querySelector(".confirmation-items");
    itemsDePedido.innerHTML = `
      <li class="item">
        <h6 class="name">${nameMenu}</h6>
        <h6 class="precio">${precioMenu.toFixed(2)}</h6>
      </li>
      <li class="item">
        <h6 class="name">${namePollo}</h6>
        <h6 class="precio">${precioPollo.toFixed(2)}</h6>
      </li>
      <li class="item">
        <h6 class="name">${nameCombo}</h6>
        <h6 class="precio">${precioCombo.toFixed(2)}</h6>
      </li>
      <li class="item">
        <h6 class="name">${nameBebida}</h6>
        <h6 class="precio">${precioBebida.toFixed(2)}</h6>
      </li>
      <li class="item total">
        <h5 class="total-texto">TOTAL</h5>
        <h5 class="total-valor">R$ ${precioTotal}</h5>
      </li>
    `;
  }
  
  function enviaPedido() {
    const { nameMenu, namePollo, nameCombo, nameBebida, precioTotal } = cierrePedido();
  
    const mensajeDePedido = `Hola: \n
      - Menu: ${nameMenu} \n
      - Pollo: ${namePollo} \n
      - Combo: ${nameCombo} \n
      - Bebida: ${nameBebida} \n
      
      Total: R$ ${precioTotal}`;
  
    const linkWhatsApp = `https://wa.me/?text=${encodeURIComponent(
      mensajeDePedido
    )}`;
  
    window.open(linkWhatsApp);
  }
  
  function cancelaPedido() {
    document
      .querySelector(".pantalla de confirmación")
      .classList.add("Sin selección");
  
    const finalizarPedido = document.querySelector("footer");
  
    finalizarPedido.firstElementChild.classList.remove("elegido");
    finalizarPedido.lastElementChild.classList.add("elegido");
  
    let itemsElegidos = document.querySelectorAll(".elegido");
  
    itemsElegidos.forEach((item) => {
      item.classList.remove("Elegidos");
    });
  }