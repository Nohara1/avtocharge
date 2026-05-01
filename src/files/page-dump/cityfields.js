cityFields.action = {
    open: (target) => {
        cityFields.action.toggle(target, 'open');
    },
    close: (target) => {
        cityFields.action.toggle(target, 'close');
    },
    toggle: (target, action = '', class_show = 'cf-show', class_hide = 'cf-hide', timeout = 150) => {
        var modal = document.querySelector(target);
        if (!modal) return false;
        if (action == 'open') {
            modal.classList.remove(class_hide);
            modal.classList.add(class_show);
        } else if (action == 'close') {
            modal.classList.add(class_hide);
            window.setTimeout(() => {
                modal.classList.remove(class_show);
            }, timeout);
        } else return false;
    },
    select: (city) => {
        if (city < 1) return false;
        var formData = new FormData();
        formData.append('action', 'city/select');
        formData.append('city', city);
        fetch(cityFields.actionUrl, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((response) => {
            if ( response.success ) location.reload();
            return response.success;
        });
    },
    search: (query) => {
        if (query.length < 2) return false;
        var formData = new FormData();
        formData.append('action', 'city/search');
        formData.append('query', query);
        fetch(cityFields.actionUrl, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then((response) => response.json())
        .then((response) => {
            document.querySelector('#cfError').classList.remove('cf-show');
            if ( response.length > 0 ) {
                var item = document.querySelector('#cfCities a').parentNode.cloneNode(true);
                document.querySelectorAll('#cfCities a').forEach((link) => link.parentNode.remove());
                response.forEach((val) => {
                    var tmp  = item.cloneNode(true);
                    var tmpa = tmp.querySelector('a');
                    tmpa.setAttribute('href', val.link);
                    tmpa.setAttribute('cf-city', val.id);
                    tmpa.innerText = val.name;
                    document.querySelector('#cfCities').appendChild(tmp);
                });
                document.querySelector('#cfCities').classList.add('cf-show');
            } else {
                document.querySelector('#cfCities').classList.remove('cf-show');
                document.querySelector('#cfError').classList.add('cf-show');
            }
        });
        return true;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.search('cfFirst=') < 0) {
        cityFields.action.open('#cfConfirm');
    } else {
        var item = document.querySelector('#cfConfirm');
        if (item) item.remove();
    }
    var items = document.querySelectorAll('#cfCities a');
    if (items) items.forEach((item) => item.addEventListener('click', (e) => {
        cityFields.action.select(item.getAttribute('cf-city'));
        e.preventDefault();
        return false;
    }));
    var items = document.querySelectorAll('#cfCity [cf-action], #cfModal [cf-action]');
    if (items) items.forEach((item) => item.addEventListener('click', function(e) {
        cityFields.action.close('#cfConfirm');
        var date = new Date(new Date().getTime()+94608000*1000);
        var host = cityFields.cityInDomain ? cityFields.mainHost : location.hostname.replace(/^www\./, '');
        document.cookie = 'cfFirst=1; path=/; domain=.'+host+'; expires='+date.toUTCString();
        cityFields.action.toggle(this.getAttribute('cf-target'), this.getAttribute('cf-action'));
        e.preventDefault();
        return false;
    }));
    var item = document.querySelector('#cfSearch');
    if (item) item.addEventListener('keyup', function() {
        cityFields.action.search(this.value);
    });
});
