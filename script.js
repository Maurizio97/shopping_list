const $ = document.querySelector.bind(document);

class ShoppingList {

    items     = [];
    lastItems = [];

    constructor() {
        this.modal();
        this.items = JSON.parse(localStorage.getItem('list')) || [];
        this.printData();
    }


    /** Print data in page. */

    printData() {
        $('ul').innerHTML = '';
        this.items.forEach(item => {
            if (item.mark === false) {
                $('ul').innerHTML +=
                `<li>
                    <span class="text">${this.sanitize(item.text)}</span>
                    <div class="item">
                        <span  class="delete" onclick="shoppingList.mark(${item.id})">&#10004;</span>
                        <span onclick="shoppingList.delete(${item.id})" class="delete">&#10060</span>
                    </div>
                </li>`;
            }
        });

        this.items.forEach(item => {
            if (item.mark === true) {
                $('ul').innerHTML +=
                `<li>
                   <span class="text del"><del>${this.sanitize(item.text)}</del></span>
                    <div class="item">
                        <span  class="delete" onclick="shoppingList.mark(${item.id})">&#10004;</span>
                        <span onclick="shoppingList.delete(${item.id})" class="delete">&#10060</span>
                    </div>
                </li>`;
            }
        });

        !this.items.length ? $('.recover').classList.remove('none'): $('.recover').classList.add('none');
        this.items.length ? $('.clear').classList.remove('none'): $('.clear').classList.add('none');
    }


    /** Add item in list. */

    addItem(val) {
        val = val.replace(/\s+/g, ' ').trim();
        if(val.length){
            this.items.push({id: Date.now(), text: val, mark: false});
            localStorage.setItem('list', JSON.stringify(this.items));
            this.printData();
        }
        $('input').value = '';
    }


    /** Delete item in list. */

    delete(id) {
        this.items = this.items.filter(item => item.id !== id);
        localStorage.setItem('list', JSON.stringify(this.items));
        this.printData();
    }


    /** Mark item in list. */

    mark(id) {
        let index = this.items.findIndex((item => item.id === id));
        this.items[index].mark? this.items[index].mark = false : this.items[index].mark = true;
        this.printData();
    }


    /** Clear List and Save the last list */

    clearList() {
        if (this.items.length) {
            this.lastItems = this.items;
            localStorage.setItem('lastList', JSON.stringify(this.lastItems));
            localStorage.removeItem('list');
            this.items = JSON.parse(localStorage.getItem('list')) || [];
            this.printData();
        }
    }


    /** Recovers List. */

    recoverList() {
        this.items = this.lastItems;
        localStorage.setItem('list', JSON.stringify(this.items));
        this.items = JSON.parse(localStorage.getItem('list'));
        this.printData();
    }


    /** Sanitize. */

    sanitize(str) {
        return str.replace(/[^\w. ]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    };


    /** Modal. */

    modal() {
        $('#modal').innerHTML = '<object data="modal.html" >';
        console.log('ciao');
    };

}

const shoppingList = new ShoppingList();

$('input').addEventListener('keypress', function(e) {
    if (this.value.length && e.key === 'Enter') {
        shoppingList.addItem(this.value);
    }
});

$('#add').addEventListener('click', function() {
    let val = $('input').value;
    if (val.length) {
        shoppingList.addItem(val);
    }
});