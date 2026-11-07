import { menuArray } from '/data.js'

const yourOrder = []

function getMenu() {
    const fullMenu = menuArray.map((food) => {
        return `
        <div class="food-item" id="food-item">
        <div class="food-details" id="food-details">
            <span class="food-emoji" id="food-emoji">${food.emoji}</span>
            <div class="food-info" id="food-info">
                <h3>${food.name}</h3>
                <p class="ingredients" id="ingredients">${food.ingredients.join(', ')}</p>
                <p class="price" id="price">$${food.price}</p>
            </div>
        </div>
        <button class="additionBtn" id="${food.name}Btn">+</button>
        </div>
    `
    })
    return fullMenu
}

function renderOrder() {
    const orderList = document.getElementById('orderList')
    
    if(yourOrder.length === 0){
        orderList.style.display = 'none'
        return
    }
    
    orderList.style.display = 'block'

    let orderItemsHtml = ``
    let totalPrice = 0

    yourOrder.forEach((orderId, index) => {
        const targetFood = menuArray.find(food => `${food.name}Btn` === orderId)

        if (targetFood) {
            totalPrice += targetFood.price

            orderItemsHtml += `
                <div class="order-item">
                    <div class="order-item-details">
                        <span>${targetFood.name}</span>
                        <button class="remove-btn" data-id="${targetFood.name}" data-index="${index}">remove</button>
                    </div>
                    <span>$${targetFood.price}</span>
                </div>
            `
        }
    })
    orderList.innerHTML = `
        <h2>Your order</h2>
        ${orderItemsHtml}
        <div class="order-divider"></div>
        <div class="total-section">
            <span>Total price:</span>
            <span>$${totalPrice}</span>
        </div>
        <button class="complete-order-btn">Complete order</button>
    `
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('additionBtn')) {
        yourOrder.push(e.target.id)
        renderOrder()
    }
})

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('remove-btn')){
        const indexTarget = e.target.dataset.index
        yourOrder.splice(indexTarget, 1)
        renderOrder()
    }
})

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('complete-order-btn')){
        document.getElementById('paymentModal').style.display = 'flex'
    }
})

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('pay-btn')){
        e.preventDefault()
        const modal = document.getElementById('paymentModal')
        modal.style.display = 'none'
        const userName = document.getElementById('usersName')
        const orderList = document.getElementById('orderList')
        orderList.innerHTML = 
        `
        <div class="thank-you-message">
            <h2>Thanks, ${userName.value}! Your order is on the way!</h2>
        </div>
        `
    }
})

document.getElementById('display').innerHTML = getMenu().join('')