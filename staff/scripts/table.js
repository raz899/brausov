function myFunction() {
    const trs = document.querySelectorAll('.active tbody tr:not(.header-table)');
    const filter = document.querySelector('.table-search').value;
    const regex = new RegExp(filter, 'i');

    function isFoundInTds(td) {
        return regex.test(td.innerHTML);
    }

    function isFound(childrenArr) {
        return childrenArr.some(isFoundInTds);
    }

    function setTrStyleDisplay({ style, children }) {
        style.display = isFound([
            ...children // <-- All columns
        ]) ? '' : 'none';
    }

    trs.forEach(setTrStyleDisplay);
};
const triggerTabList = document.querySelectorAll('.nav-tabs button');
triggerTabList.forEach(triggerEl => {
    const tabTrigger = new bootstrap.Tab(triggerEl);
    triggerEl.addEventListener('shown.bs.tab', event => {
        event.preventDefault();
        myFunction();
        tabTrigger.show();
        const idTabs = document.querySelector('nav button.nav-link.active').getAttribute('data-id');
        // window.location.search = `?tabs=${idTabs}`;
        // window.location.search.has = 'tabs';
        // if (window.location.search.has == 'tabs');
    });
});

