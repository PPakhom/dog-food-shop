class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
//ПРО ПОЛЬЗОВАТЕЛЯ    
    signUp(body) { // регистрация
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    signIn(body) { // авторизация
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    getUser(userId) {
        return fetch(`${this.path}/v2/${this.group}/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    updateUser(body, img = false) {
        return fetch(`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
//ПРО ПРОДУКТЫ
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
    }
    getProduct(productId) {
        return fetch(`${this.path}/products/${productId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    editProduct(productId, body) {
        return fetch(`${this.path}/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    deleteProduct(productId) {
        return fetch(`${this.path}/products/${productId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    // ЛАЙКИ
    setLike(productId, isLike) {
        return fetch(`${this.path}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    // ОТЗЫВЫ
    addReview(productId, body) {
        return fetch(`${this.path}/products/review/${productId}`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    deleteReview(productId, reviewId) {
        return fetch(`${this.path}/products/review/${productId}/${reviewId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
}
export {Api};