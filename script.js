const $ = document.querySelector.bind(document);

class ShoppingList {

    items     = [];

    constructor() {
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
                    <span class="text">${item.text}</span>
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
                   <span class="text del"><del>${item.text}</del></span>
                    <div class="item">
                        <span  class="delete" onclick="shoppingList.mark(${item.id})">&#10004;</span>
                        <span onclick="shoppingList.delete(${item.id})" class="delete">&#10060</span>
                    </div>
                </li>`;
            }
        });
    }


    /** Add item in list. */

    addItem() {
        const val = $('input').value;
        this.items.push({id: Date.now(), text: val, mark: false});
        localStorage.setItem('list', JSON.stringify(this.items));
        $('input').value = '';
        this.printData();
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
        localStorage.setItem('mark', JSON.stringify(this.marks));
        this.printData();
    }


    /** Clear List. */

    clearList() {
        this.lastItems = this.items;
        localStorage.clear('list');
        this.items = JSON.parse(localStorage.getItem('list')) || [];
        this.printData();
    }

}

const shoppingList = new ShoppingList();

$('input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shoppingList.addItem()
    }
});

$('#clear').addEventListener('click', ()=>  {
    shoppingList.clearList();
});