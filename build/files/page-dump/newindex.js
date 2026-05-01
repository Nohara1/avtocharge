const textHide = document.querySelectorAll('.textHide');

let addPoint = (el) => {
    if (el.innerHTML.length > 120) {
        el.innerHTML = el.innerHTML.slice(0, 100)+'...'
    }
}



textHide.forEach(item=>{
    addPoint(item)
})