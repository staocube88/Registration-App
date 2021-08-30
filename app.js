class Register{
    constructor(name,address,email,phoneno){
        this.name = name;
        this.address = address;
        this.email = email;
        this.phoneno = phoneno;
    }
}


class UI {


    static displayRegister(){
        let register = Store.getRegister();

        registers.forEach((register) => UI.addRegisterToList(register));

       
    }

    static addRegisterList(register){
        const list = document.querySelector('#register-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${register.name}</td>
            <td>${register.address}</td>
            <td>${register.email}</td>
            <td>${register.phoneno}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

  
    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phoneno').value = '';
    }

   
    static deleteRegister(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    
    static showAlerts(message,className){
      
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
       
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

       
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}


class Store {
    static getRegisters() {
        let registers;
        if(localStorage.getItem('registers') === null) {
          registers = [];
        } else {
          registers = JSON.parse(localStorage.getItem('registers'));
        }
    
        return registers;
      }

    static saveRegister(register){
        let registers;
        registers = Store.getBooks();
        registers.push(register);
        localStorage.setItem('registers',JSON.stringify(registers));
    }

    static removeRegister(phoneno){
        const regsiters = Store.getRegisters();

        regsiters.forEach((register, index) => {
          if(register.phoneno === phoneno) {
            regsiters.splice(index, 1);
          }
        });
    
        localStorage.setItem('registers', JSON.stringify(registers));
    }
}


document.addEventListener('DOMContentLoaded',UI.displayRegisters);


document.querySelector('#register-form').addEventListener('submit',(e) => {
    

    e.preventDefault();

   
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const phoneno = document.querySelector('#phoneno').value;

    if(name === '' || address === '' || email === ''|| phoneno === ''){
        UI.showAlerts('Please fill in all details...','Error');
    } else {
        
        const register = new Register(name,address,email,phoneno);

      
        UI.addRegisterToList(register);

       
        Store.saveRegister(register);

   
        UI.showAlerts('User Registered','success');

   
        UI.clearFields();
    }

});


document.querySelector('#register-list').addEventListener('click',(e) => {
    UI.deleteRegister(e.target);

    Store.removeRegister(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlerts('Register Removed','success');
});