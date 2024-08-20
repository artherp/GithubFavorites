//classe que vai conter a logica dos dados 
//como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
    }
}


//clase que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()
    }

    removeAllTr() {
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}