export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

//classe que vai conter a logica dos dados 
//como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
        this.entries = filteredEntries
        this.update()
    }
}


//clase que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar esse linha?')

                if(isOk) {
                    this.delete(user)
                }
            }
            
            this.tbody.append(row)
        } )
    }

    createRow() {
        const tr = document.createElement('tr')
        const content = `
              <td class="user">
                <img src="https://github.com/artherp.png" alt="Imagem de artherp">
                <a href="https://github.com/artherp" target="_blank">
                  <p>Arthur Erpen</p>
                  <span>artherp</span>
                </a>
              </td>
              <td class="repositories">
                76
              </td>
              <td class="followers">
                9589
              </td>
              <td>
                <button class="remove">&times;</button>
              </td>
        `
        tr.innerHTML = content

        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}